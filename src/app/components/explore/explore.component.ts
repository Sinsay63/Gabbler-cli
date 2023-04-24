import { Component, OnInit } from '@angular/core';
import { GabService, User, UserService, Users , Gab} from 'app/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit{

  //attributs
  users ?= new Array<User>();
  gabs ?= new Array<Gab>();


  constructor(private userService: UserService,
    private gabService: GabService) {
   }


  ngOnInit(): void {
      
    this.gabService.getGabs().subscribe(data => {
      console.log(data);
      this.gabs= data.gabs;
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
