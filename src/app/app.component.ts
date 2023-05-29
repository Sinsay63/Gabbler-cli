import { Component } from '@angular/core';
import { ThemeService } from './components/theme.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(public themeService: ThemeService, private route: ActivatedRoute, public router: Router) {}

  setDefaultTheme() {
    this.themeService.setTheme('default');
  }

  setDarkTheme() {
    this.themeService.setTheme('dark');
  }
    
  isSideNavCollapsed = true;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
