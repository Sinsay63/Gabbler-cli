import { Component, OnInit } from '@angular/core';
import { GabService, User, UserService, Gab} from 'app/api';
import { firstValueFrom } from 'rxjs';
import { AuthClientService } from 'app/auth.client.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit{


  

  constructor(private gabService: GabService, private authService: AuthClientService) {
   }

     //attributs
    gabs ?= new Array<Gab>();
    searchedGabs = this.authService.gabs;

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
