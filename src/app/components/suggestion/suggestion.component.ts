import { Component } from '@angular/core';
import { SearchService, User, UserService} from 'app/api';
import { faMagnifyingGlass, faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import {GlobalDataService } from 'app/global.data.service'
@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {

  constructor(private userService: UserService, private searchService: SearchService, private router: Router, private authService: GlobalDataService) {
  }

  //attributs
  users ?= new Array<User>();
  usersSearch ?= new Array<User>();
  faMagnifingGlass = faMagnifyingGlass;
  faCirclePlus = faCirclePlus;
  search: string = '';
  isSearch = false;

  onSubmit() {
    this.searchService.searchUser(this.search).subscribe(data => {
      this.usersSearch = data.users
      this.isSearch = data.users?.length != undefined && data?.users?.length > 0 ? true : false;
      this.authService.gabs = data.gabs;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['explore']);
      });
      
    },
      (error =>{
        console.log(error)
    }));
  }

   ngOnInit(): void {
      
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.users= data;
    }, (error => {
      console.log(error);
    }));
  }
}
