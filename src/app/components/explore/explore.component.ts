import { Component, OnInit } from '@angular/core';
import { User, UserService, Users } from 'app/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit{

  //attributs
  users ?= new Array<User>();


  constructor(private userService: UserService) {
   }


  ngOnInit(): void {
      
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data.users;
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
