import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  UserInfosProfile, User, UserService, RelationshipService, RelationUser, InteractionService, UserEditProfile} from 'app/api';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { faPencil, faComment, faHeart, faHeartCrack, faClose, faCrown, faSort, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { GlobalDataService } from 'app/global.data.service';
import { Token } from '@angular/compiler';
import { LoginComponent } from 'app/components/identification/login/login.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  template: `
  <div class="like" (click)="toggleLike()" ></div>
`
})
export class ProfilComponent {

  constructor( private route: ActivatedRoute,public globalDataService: GlobalDataService, private userService: UserService, private relationService : RelationshipService, private interactionService: InteractionService) { }

  user = new UserInfosProfile()
  isConnected: boolean | undefined;
  owner: boolean = false;

  /* Icons */
  heart = faHeart;
  heartCrack  = faHeartCrack;
  faComment = faComment;
  faPencil = faPencil;
  faCross = faClose;
  crown = faCrown;
  faCheckCircle = faCheckCircle;
  sort = faSort;
  /*FIN ICONS */

  uuidConnected: string = '';
  relation = new RelationUser();
 
  beBlock =false;

  /* variable des Edit */
  usernameEditMod = false;
  bioEditMod = false;
  /* Champs Modifiable */
  bio: string = '';
  username: string = '';

  erreur: string = '';
  
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
      this.relationService.getRelationByUserAndUserRelated(uuid, this.globalDataService.getUuidFromToken(token)).subscribe(data => {
        if(data.type == 'blocked'){
          this.beBlock = true;
        }
      },
        (error => {
          console.log(error);
        }));
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
      console.log(user);
      
    });
  }

  toggleEditMod(type: string){
    if(type === 'username'){
      if(this.usernameEditMod == false){
        this.usernameEditMod = true;
      }else{
        this.usernameEditMod = false;
      }
    }
    else if(type === 'biography'){
      if(this.bioEditMod == false){
        this.bioEditMod = true;
      }else{
        this.bioEditMod = false;
      }
    }
  }

  validEdit(type: string){
    console.log("vamos");
    
      if(type == 'username' && this.username != this.user.username){
        console.log("username : " + this.username.length + " - " + type);
        if(this.username.length >= 4){
          this.editProfil(type, this.username)
          this.toggleEditMod(type)
        }
      }
      if(type == 'biography'){
        console.log("bio : " + this.bio);
        if(this.bio.length > 4){
          this.editProfil(type, this.bio)
          this.toggleEditMod(type)
        }else{
          this.erreur = "Le champs remplie est trop cours"
        }
      }
  }

  editProfil(type: string, value : string ){
    const token = sessionStorage.getItem('token');
    if(token){

      const uuid = this.globalDataService.getUuidFromToken(token);
      
      let profil = new UserEditProfile();
      profil.type = type;
      profil.value = value;

      console.log(profil);
      console.log("uuid : " + uuid);
      
      this.userService.editUserProfile(uuid, profil ).subscribe(
        (error: any) => {
          console.log(error);
        });
        this.user.biography = value;
    }
  }

  checkRelation(uuidToCompare: any): string {
    let uuidOwner = '';
    const token = sessionStorage.getItem('token');
    if (token) {
      uuidOwner = this.globalDataService.getUuidFromToken(token);
    }
    console.log("les uuid sont :" + uuidOwner, uuidToCompare);
    if (uuidOwner !== '') {
      this.relationService.getRelationByUserAndUserRelated(uuidOwner, uuidToCompare).subscribe(data => {
        this.relation = data;
        return data.type;
      },
        (error => {
          console.log(error);
        }));
    }
    return '';
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
    const followersElement = document.getElementById('follows');
    if(relation.type  == 'blocked' && this.user.follows != undefined){
      if (followersElement) {
        followersElement.innerText = (this.user.follows.length).toString();
      }
    }
  }
  
  closePopUp(){
    const pop1 = document.getElementById('popFollower');
    const pop2 = document.getElementById('popFollow');

    pop1?.classList.add('hidden');
    pop2?.classList.add('hidden')
  }
  callPopUp(popName: string){
    if(popName == 'follows'){
      const popFollow = document.getElementById('popFollow');
      popFollow?.classList.remove('hidden')
    }
    else if(popName == 'followers'){
      const popFollower = document.getElementById('popFollower');
      popFollower?.classList.remove('hidden')
    }
  }
}
  
function subscribe(arg0: (error: any) => void) {
  throw new Error('Function not implemented.');
}

