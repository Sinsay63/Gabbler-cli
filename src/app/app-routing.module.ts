import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificationComponent } from './components/identification/identification.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HomeComponent } from './components/home/home.component';
import { ParametreComponent } from './components/parametre/parametre.component';
import { ProfilComponent } from './profil/profil.component';
import { ViewGabComponent } from './view-gab/view-gab.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'connexion', component: IdentificationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'explore', component: ExploreComponent},
  { path: 'parametre', component: ParametreComponent},
  { path: 'profil/:uuid', component: ProfilComponent},
  { path: 'gab/:id', component: ViewGabComponent},
  { path: 'home/:uuid', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
