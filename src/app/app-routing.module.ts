import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificationComponent } from './components/identification/identification.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HomeComponent } from './components/home/home.component';
import { ParametreComponent } from './components/parametre/parametre.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: IdentificationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'explore', component: ExploreComponent},
  { path: 'parametre', component: ParametreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
