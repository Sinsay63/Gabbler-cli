import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gabbler-cli';
    
  isSideNavCollapsed = true;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  // constructor(private usersService: UsersService) {
  //   this.users = [];
  // }
  // ngOnInit(): void {
  //     console.log("On init......");
  //     this.usersService.getUsers().subscribe((data) => {
  //       this.users = data;
  //     })
  // }
}
