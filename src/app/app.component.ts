import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UsersService ]
})
export class AppComponent implements OnInit{
  title = 'gabbler-cli';
  users: any;

  constructor(private usersService: UsersService) {
    this.users = [];
  }
  ngOnInit(): void {
      console.log("On init......");
      this.usersService.getUsers().subscribe((data) => {
        this.users = data;
      })
  }
}
