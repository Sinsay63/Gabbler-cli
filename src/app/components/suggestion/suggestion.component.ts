import { Component } from '@angular/core';
import { SearchService, User, UserService} from 'app/api';
import { faMagnifyingGlass, faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { Router, NavigationEnd } from '@angular/router';
import {GlobalDataService } from 'app/global.data.service'
@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {

  constructor(private userService: UserService, private searchService: SearchService, private router: Router, private globalDataService: GlobalDataService) {
   // Recuperation de l'url pour supprimer la barre de recherche si on est sur la page 'explore'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPage = this.extractPageName(this.router.url);
      }
    });
  }

  private extractPageName(url: any): string {
    // Extrait le nom de la page à partir de l'URL
    const pageName = url.split('/').pop();
    return pageName;
  }

  //attributs
  users ?= new Array<User>();
  usersSearch ?= this.globalDataService.users
  faMagnifingGlass = faMagnifyingGlass;
  faCirclePlus = faCirclePlus;
  search: string = '';
  currentPage: string = ''

  onSubmit() {
    this.globalDataService.search = this.search
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['explore']);
    });
  }

  toProfil(userUuid : any ){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['profil/' + userUuid]);
    });
  }

   ngOnInit(): void {


    if(this.globalDataService.isConnected){
      const token = sessionStorage.getItem('token');
      if(token){
        const uuid = this.globalDataService.getUuidFromToken(token);
        this.userService.getSuggestionUserConnected(uuid).subscribe(data => {
          console.log(data);
          this.users= data;
        }, (error => {
          console.log(error);
        }));
    }
    }else{
      this.userService.getSuggestionUserNotConnected().subscribe(data => {
        this.users = data
      }, (error => {
        console.log(error);
      }))
    }
  }
}
