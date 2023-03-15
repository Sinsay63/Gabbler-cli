import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { SideMenuComponent } from './components/accueil/side-menu/side-menu.component';
import { MainContentComponent } from './components/accueil/main-content/main-content.component';
import { SuggestionComponent } from './components/accueil/suggestion/suggestion.component';
import { IdentificationComponent } from './components/identification/identification.component';
import { LoginComponent } from './components/identification/login/login.component';
import { RegisterComponent } from './components/identification/register/register.component';
import { SliderComponent } from './components/identification/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    SideMenuComponent,
    MainContentComponent,
    SuggestionComponent,
    IdentificationComponent,
    LoginComponent,
    RegisterComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
