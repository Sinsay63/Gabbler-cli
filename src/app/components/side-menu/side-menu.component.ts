import { transition, trigger, style, animate, keyframes} from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { faMagnifyingGlass, faCirclePlus, faRightFromBracket, faPersonRunning, faLightbulb, faMoon, faUmbrellaBeach, faSun} from '@fortawesome/free-solid-svg-icons'
import { navbarData } from './nav-data';
import { User, UserService } from 'app/api';
import { ThemeService } from '../parametre/theme.service';
import { GlobalDataService } from 'app/global.data.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('200ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('600ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(1turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SideMenuComponent implements OnInit{
  userLoggedIn: boolean = false;
  isConnected: boolean | undefined;
  faRightFromBracket = faPersonRunning;
  lightOn = true;
  sunBright = faSun;
  faMoon = faMoon;
  user ?= new User;

  constructor(public themeService: ThemeService, private globalDataService: GlobalDataService, private userService: UserService, private router: Router) {}

  uuid = this.globalDataService.uuid;
  setDefaultTheme() {
    this.themeService.setTheme('default');
    this.lightOn = true;
  }

  setDarkTheme() {
    this.themeService.setTheme('dark');
    this.lightOn = false;
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize',['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.isConnected=this.globalDataService.isConnected;
    if(this.isConnected){
      this.userService.getUserByUuid(this.uuid).subscribe(data => {
        console.log(data);
        this.user=data;
      }, (error => {
        console.log(error);
      }));
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  
  logOut(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['home']);
    })
    this.globalDataService.isConnected=false;
    this.isConnected=false;
  }
}
