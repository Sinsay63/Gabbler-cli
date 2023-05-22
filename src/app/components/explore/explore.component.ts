import { Component, OnInit } from '@angular/core';
import { GabService, User, UserService, Gab, SearchService, RelationshipService, RelationshipsCUDRequest} from 'app/api';
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


  

  constructor(private gabService: GabService,private relation: RelationshipService, private router: Router,  private globalDataService: GlobalDataService,private  searchService: SearchService, private userService: UserService) {
   }
  gabsSearch ?= new Array<Gab>();
  faMagnifingGlass = faMagnifyingGlass;
  faCirclePlus = faCirclePlus;
  search = this.globalDataService.search
  exploreSearch = this.globalDataService.search;
  searchUsers ?= new Array<User>
  searchGabs ?= new Array<Gab>
  gabs ?= new Array<Gab>();
  lastClickedLikeButton: HTMLElement | null = null;
  countLike = 0;
  uuidConnected: string = '';
  isConnected: boolean = false;
  formatDate=this.globalDataService.formatDate;

  follow(uuidOwner: any, uuidToFollow: any){

    var rel = new RelationshipsCUDRequest();

    rel.user_uuid = uuidOwner;
    rel.user_related_uuid = uuidToFollow
    rel.type= 'FOLLOWED'
    console.log(rel);
    

    this.relation.relationshipsCUD(rel).subscribe(data => {
      console.log(data);
    },
      (error =>{
        console.log(error)
    }));
  }

  sortByNbInteractionsDesc(tab: Array<Gab>){
    if (tab){
      tab.sort((a,b)=>{
        const nbInteractionsA = (a.nbDislikes ?? 0) + (a.nbLikes ?? 0);
        const nbInteractionsB = (b.nbDislikes ?? 0) + (b.nbLikes ?? 0);
        return nbInteractionsB - nbInteractionsA;
      })
    }
  }
  sortByDateDESC(tab: Array<Gab>) {
    if (tab) {
        tab.sort((a, b) => {
            if (a.post_date != undefined && b.post_date != undefined) {
                if (a.post_date > b.post_date) {
                    return -1;
                } else if (a.post_date < b.post_date) {
                    return 1;
                }
            }
            return 0; // Valeur de retour par défaut
        });
    }
}

  sortByDateASC(tab: Array<Gab>) {
    if (tab) {
      tab.sort((a, b) => {
          if (a.post_date != undefined && b.post_date != undefined) {
              if (a.post_date < b.post_date) {
                  return -1;
              } else if (a.post_date > b.post_date) {
                  return 1;
              }
          }
          return 0; // Valeur de retour par défaut
      });
    }
  }


displaytab1(){
  
    const gabcontent = document.getElementById('gabs-content')
    const usercontent = document.getElementById('user-content')
    
    gabcontent?.classList.remove('disable')
    usercontent?.classList.add('disable')

    const tab1 = document.getElementById('tab1')
    const tab2 = document.getElementById('tab2')

    tab2?.classList.add('not-current')
    tab1?.classList.remove('not-current')
    

}
  displaytab2(){
    const gabcontent = document.getElementById('gabs-content')
    const usercontent = document.getElementById('user-content')

    usercontent?.classList.remove('disable')
    gabcontent?.classList.add('disable')

    const tab1 = document.getElementById('tab1')
    const tab2 = document.getElementById('tab2')

    
    tab2?.classList.remove('not-current')
    tab1?.classList.add('not-current')
  }

  toProfil(userUuid : any ){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['profil/' + userUuid]);
    });
  }

   //Recuperation des infos de la barre de recherche
   onSubmit() {

    this.searchService.searchUser(this.exploreSearch).subscribe(data => {
      this.searchGabs = data.gabs;
      if(this.searchGabs != undefined){
        this.sortByNbInteractionsDesc(this.searchGabs)
      }
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

    const token = sessionStorage.getItem('token');
    if(token){
      this.isConnected=true;
    }
    else{
      this.isConnected=false;
    }
    if(this.isConnected){
      const token = sessionStorage.getItem('token');
      if(token){
        this.uuidConnected = this.globalDataService.getUuidFromToken(token);
      }
    }

    if(this.search != ''){
      this.searchService.searchUser(this.globalDataService.search).subscribe(data => {
        this.searchGabs = data.gabs;
        this.searchUsers = data.users;
      },
        (error =>{
          console.log(error)
      }));
    }
    this.gabService.getGabs().subscribe(data => {
      console.log(data);
      this.gabs= data;
      if(this.gabs != undefined){
        this.sortByNbInteractionsDesc(this.gabs)
      }
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
