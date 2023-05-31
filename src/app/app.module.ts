import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { IdentificationComponent } from './components/identification/identification.component';
import { LoginComponent } from './components/identification/login/login.component';
import { RegisterComponent } from './components/identification/register/register.component';
import { ExploreComponent } from './components/explore/explore.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponent } from './components/home/home.component';
import { SuggestionComponent } from './components/suggestion/suggestion.component';
import { UserAuth } from './api';
import { NgImageSliderModule } from 'ng-image-slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfilComponent } from './components/profil/profil.component';
import { ViewGabComponent } from './components/view-gab/view-gab.component';
import { PrestigeComponent } from './components/prestige/prestige.component';
import { NgxPayPalModule} from 'ngx-paypal';
import { AuthInterceptor } from './authInterceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    IdentificationComponent,
    LoginComponent,
    RegisterComponent,
    ExploreComponent,
    BodyComponent,
    HomeComponent,
    SuggestionComponent,
    ProfilComponent,
    ViewGabComponent,
    PrestigeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgImageSliderModule,
    FormsModule,
    FontAwesomeModule,
    NgxPayPalModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    UserAuth,
    {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
