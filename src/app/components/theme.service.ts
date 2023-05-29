import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<string>('default');

  get theme$() {
    return this.currentTheme.asObservable();
  }

  setTheme(theme: string) {
    this.currentTheme.next(theme);
  }
}