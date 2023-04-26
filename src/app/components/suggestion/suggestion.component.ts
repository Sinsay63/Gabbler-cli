import { Component } from '@angular/core';
import { User, UserService} from 'app/api';
import { faMagnifyingGlass, faCirclePlus} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {

  //attributs
  users ?= new Array<User>();

  faMagnifingGlass = faMagnifyingGlass;
  faCirclePlus = faCirclePlus;

  constructor(private userService: UserService) {
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
