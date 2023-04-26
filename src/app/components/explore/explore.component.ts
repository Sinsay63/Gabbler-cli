import { Component, OnInit } from '@angular/core';
import { GabService, User, UserService, Gab} from 'app/api';
import { firstValueFrom } from 'rxjs';
import { GlobalDataService } from 'app/global.data.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  template: `
  <div class="like" (click)="toggleLike()" #likeButton></div>
`
})
export class ExploreComponent implements OnInit{


  

  constructor(private gabService: GabService, private authService: GlobalDataService) {
   }

     //attributs
    gabs ?= new Array<Gab>();
    searchedGabs = this.authService.gabs;
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

  ngOnInit(): void {
    this.gabService.getGabs().subscribe(data => {
      console.log(data);
      this.gabs= data;
    }, (error => {
      console.log(error);
    }));
  }

  // async truc() {
  //   this.serService.getUsers().subscribe(data => {
  //     console.log(data);
  //   }, (error => {
  //     console.log(error);
  //   }));

  //  await firstValueFrom(this.serService.getUsers()).then(data => {
  //     this.users = data;
  //   }, (error => {
  //     console.log(error);
  //   }));
  // }
}
