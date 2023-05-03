import { Component, OnInit } from '@angular/core';
import { GabService, User, UserService, Gab, SearchService} from 'app/api';
import { faMagnifyingGlass, faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { firstValueFrom } from 'rxjs';
import { GlobalDataService } from 'app/global.data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  template: `
  <div class="like" (click)="toggleLike()" #likeButton></div>
`
})
export class ExploreComponent implements OnInit{


  

  constructor(private gabService: GabService,private router: Router,  private globalDataService: GlobalDataService,private  searchService: SearchService, private userService: UserService) {
   }
  gabsSearch ?= new Array<Gab>();
  faMagnifingGlass = faMagnifyingGlass;
  faCirclePlus = faCirclePlus;
  search = this.globalDataService.search
  exploreSearch = '';
  searchUsers ?= new Array<User>
  searchGabs ?= new Array<Gab>

  gabs ?= new Array<Gab>();
  lastClickedLikeButton: HTMLElement | null = null;
  countLike = 0;


displaytab1(){
  
    const gabcontent = document.getElementById('gabs-content')
    const usercontent = document.getElementById('user-content')

    gabcontent?.classList.remove('disable')
    usercontent?.classList.add('disable')
}
  displaytab2(){
    const gabcontent = document.getElementById('gabs-content')
    const usercontent = document.getElementById('user-content')

    usercontent?.classList.remove('disable')
    gabcontent?.classList.add('disable')
  }

   //Recuperation des infos de la barre de recherche
   onSubmit() {
    this.searchService.searchUser(this.exploreSearch).subscribe(data => {
      this.searchGabs = data.gabs;
      this.searchUsers = data.users;
      console.log(this.exploreSearch);
      
      console.log(data);
      
    },
      (error =>{
        console.log(error)
    }));
  }

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
    if(this.search != ''){
      this.searchService.searchUser(this.globalDataService.search).subscribe(data => {
        this.searchGabs = data.gabs;
        this.searchUsers = data.users;
        console.log("barre");
        console.log(data);
      },
        (error =>{
          console.log(error)
      }));
    }

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
