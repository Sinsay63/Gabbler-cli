import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  UserInfosProfile, User, UserService} from 'app/api';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { faPencil } from '@fortawesome/free-solid-svg-icons'
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

  constructor( private route: ActivatedRoute,private globalDataService: GlobalDataService, private userService: UserService) { }

  user = new UserInfosProfile()
  owner: boolean = false;
  faPencil = faPencil;
  
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
  
  ngOnInit() {
    
    const uuid = this.route.snapshot.paramMap.get('uuid') ?? ""
    console.log(uuid + ' est l uuid de la personne');
    
    if(this.globalDataService.isConnected){
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
      console.log(this.user);
      console.log(uuid);
      
      
    });
  }
}
  
