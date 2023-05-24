import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  UserInfosProfile, User, UserService, RelationshipService, RelationUser} from 'app/api';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { faPencil, faComment, faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons'
import { GlobalDataService } from 'app/global.data.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  template: `
  <div class="like" (click)="toggleLike()" ></div>
`
})
export class ProfilComponent {

  constructor( private route: ActivatedRoute,public globalDataService: GlobalDataService, private userService: UserService, private relationService : RelationshipService) { }

  user = new UserInfosProfile()
  isConnected: boolean | undefined;
  owner: boolean = false;

  /* Icons */
  heart = faHeart;
  heartCrack  = faHeartCrack;
  faComment = faComment;
  faPencil = faPencil;
  uuidConnected: string = '';
  relation = new RelationUser();
  beBlock =false;
  
  formatDate=this.globalDataService.formatDate;

  lastClickedLikeButton: HTMLElement | null = null;
   countLike = 0;

   toggleLike(event: MouseEvent) {
    const likeButton = event.target as HTMLElement;
  
    if (likeButton.classList.contains('like')) {
      // if (this.lastClickedLikeButton && this.lastClickedLikeButton !== likeButton) {
      //   // Si l'utilisateur a cliqué sur un autre élément "like" depuis la dernière fois,
      //   // on remet l'état du dernier élément cliqué à zéro
      //   this.lastClickedLikeButton.classList.remove('anim-like');
      //   this.lastClickedLikeButton.style.backgroundPosition = 'left';
      //   this.countLike = 0;
      // }
  
      if (this.countLike === 0) {
        likeButton.classList.add('anim-like');
        this.countLike = 1;
        likeButton.style.backgroundPosition = 'right';
      } else {
        this.countLike = 0;
        likeButton.style.backgroundPosition = 'left';
      }
  
      // this.lastClickedLikeButton = likeButton;
    }
  }
  test(){
    console.log(this.relation);
    
  }
  ngOnInit() {
    
    const uuid = this.route.snapshot.paramMap.get('uuid') ?? ""
    if(!this.owner){
    this.checkRelation(uuid);
    }
    
    const token = sessionStorage.getItem('token');
    if(token){
      this.isConnected=true;
    }

    if(this.isConnected){
      const token = sessionStorage.getItem('token');
      if(token){
        const uuid2 = this.globalDataService.getUuidFromToken(token);
        if(uuid === uuid2){
          this.owner = true;
        }
      }
    }

    this.userService.getUserProfile( uuid ).pipe(
      catchError(() => {
        console.log('Erreur lors de la récupération de l\'utilisateur');
        return EMPTY;
      })
    )
    .subscribe((user: UserInfosProfile) => {
      this.user = user;
    });
  }


  checkRelation(uuidToCompare: any) {
    let uuidOwner = '';
    const token = sessionStorage.getItem('token');
    if (token) {
      uuidOwner = this.globalDataService.getUuidFromToken(token);
    }
    console.log("les uuid sont :" + uuidOwner, uuidToCompare);
    if (uuidOwner !== '') {
      this.relationService.getRelationByUserAndUserRelated(uuidOwner, uuidToCompare).subscribe(data => {
        this.relation = data;
      },
        (error => {
          console.log(error);
        }));
    }
    this.relationService.getRelationByUserAndUserRelated(uuidToCompare, uuidOwner).subscribe(data => {
      if(data.type == 'blocked'){
        this.beBlock = true;
      }
    },
      (error => {
        console.log(error);
      }));
  }
  
  callfollow(uuid : any, relation : RelationUser){
    this.globalDataService.follow(uuid, this.relation);
    const followersElement = document.getElementById('follows');
    if(relation.type  == 'followed' && this.user.follows != undefined){
      if (followersElement) {
        followersElement.innerText = (this.user.follows.length + 1).toString();
      }
      }else{
        if (followersElement && this.user.follows) {
          followersElement.innerText = (this.user.follows.length).toString();
        }
    }
  }

  callblock(uuid : any, relation : RelationUser){
    this.globalDataService.block(uuid, this.relation);
  }
}
  
