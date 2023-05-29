import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificationComponent } from './components/identification/identification.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ViewGabComponent } from './components/view-gab/view-gab.component';
import { RegisterComponent } from './components/identification/register/register.component';
import { PrestigeComponent } from './components/prestige/prestige.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'connexion', component: IdentificationComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'explore', component: ExploreComponent},
  { path: 'profil/:uuid', component: ProfilComponent},
  { path: 'gab/:id', component: ViewGabComponent},
  { path: 'prestige', component: PrestigeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
