import { Component, OnInit } from '@angular/core';
import { GabService, User, UserService, Gab} from 'app/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit{

  //attributs
  gabs ?= new Array<Gab>();


  constructor(private gabService: GabService) {
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
