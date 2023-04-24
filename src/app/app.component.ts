import { Component } from '@angular/core';
import { ThemeService } from './components/parametre/theme.service';

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

  constructor(public themeService: ThemeService) {}

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
