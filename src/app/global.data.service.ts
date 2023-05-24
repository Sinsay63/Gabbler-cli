import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User, Gab, UserToken, InteractionUser, InteractionService, RelationshipService, RelationUser} from 'app/api';
import jwt_decode from 'jwt-decode';
import { RelationshipsCUDRequest } from './api/model/relationshipsCUDRequest';


@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  search: string = '';
  gabs ?= new Array<Gab>();
  users ?= new Array<User>();
  interactions ?= Array<InteractionUser>();

  constructor(private router: Router, private interactionService: InteractionService, private relationService : RelationshipService){}

  getDecodedToken(token: string): any {
    if (token) {
      return jwt_decode(token);
    } else {
      return null;
    }
  }

  formatDate(date?: string): string {
    let dateObj = new Date();
    if(date){
      dateObj = new Date(date);
      return dateObj.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  return "";
  }

  getUuidFromToken(token: string): string{
    const decodedToken = this.getDecodedToken(token);
    return decodedToken.uuid;
  }

  /* Fonction de tri */
  sortByNbInteractionsDesc(tab: Array<Gab>){
    if (tab){
      tab.sort((a,b)=>{
        const nbInteractionsA = (a.nbDislikes ?? 0) + (a.nbLikes ?? 0);
        const nbInteractionsB = (b.nbDislikes ?? 0) + (b.nbLikes ?? 0);
        return nbInteractionsB - nbInteractionsA;
      })
    }
  }
  sortByLikesDESC(tab: Array<Gab>) {
    if (tab) {
        tab.sort((a, b) => {
            if (a.nbLikes !== undefined && b.nbLikes !== undefined) {
                return b.nbLikes - a.nbLikes;
            }
            return 0; // Valeur de retour par défaut
        });
    }
  }

  sortByDislikeDESC(tab: Array<Gab>){
      if (tab) {
          tab.sort((a, b) => {
              if (a.nbDislikes !== undefined && b.nbDislikes !== undefined) {
                  return b.nbDislikes - a.nbDislikes;
              }
              return 0; // Valeur de retour par défaut
          });
      }
  }

  sortByDateDESC(tab: Array<Gab>){
    if (tab) {
      tab.sort((a, b) => {
          if (a.post_date != undefined && b.post_date != undefined) {
              if (a.post_date < b.post_date) {
                  return 1;
              } else if (a.post_date > b.post_date) {
                  return -1;
              }
          }
          return 0; // Valeur de retour par défaut
      });
    }
  }
  sortByDateASC(tab: Array<Gab>) {
    if (tab) {
      tab.sort((a, b) => {
          if (a.post_date != undefined && b.post_date != undefined) {
              if (a.post_date < b.post_date) {
                  return -1;
              } else if (a.post_date > b.post_date) {
                  return 1;
              }
          }
          return 0; // Valeur de retour par défaut
      });
    }
  }
  /* Fin des Fonctions de tri */

/* Fonction pour follow */ 
follow(uuidToFollow: any, relation : RelationUser){
  var uuidOwner = ''
  const token = sessionStorage.getItem('token');
  if(token){
    uuidOwner = this.getUuidFromToken(token);
  }
  console.log(uuidOwner, uuidToFollow);
 

  if(uuidOwner != ''){
    this.relationService.relationshipsCUD(uuidOwner, uuidToFollow,'followed' ).subscribe(data => {
      console.log(data);
    },
      (error =>{
        console.log(error)
    }));
    if(relation.type === 'followed'){
      relation.type=''
    }else{
      relation.type = 'followed';
    }
  }else{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['login/']);
    });
  }
}
/* Fonction Pour Bloquer un utilisateur */
block(uuidToFollow: any, relation : RelationUser){
  var uuidOwner = ''
  const token = sessionStorage.getItem('token');
  if(token){
    uuidOwner = this.getUuidFromToken(token);
  }
  if(uuidOwner != ''){
    this.relationService.relationshipsCUD(uuidOwner, uuidToFollow,'blocked' ).subscribe(data => {
      console.log(data);
    },
      (error =>{
        console.log(error)
    }));
    if(relation.type === 'blocked'){
      relation.type=''
    }else{
      relation.type = 'blocked';
    }
  }else{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['login/']);
    });
  }
}
/* Fonction qui renvoie la relation de 2 users */

  /* Fonctions des gabs */ 
  toGab(id : number): void{
    const element = document.querySelector(`#btnh1-${id}`) as HTMLElement;
    this.Toggle1(id);
    this.Toggle2(id);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['gab/' + id]);
    });
  }

  Toggle1(id: number): void {
    const btnvar1 = document.getElementById(`btnh1-${id}`) as HTMLElement;
    btnvar1.classList.toggle('red');
    btnvar1.classList.toggle('btn');
    
    const btnvar2 = document.getElementById(`btnh2-${id}`) as HTMLElement;
    const token = sessionStorage.getItem('token');
    var isConnected = false;
    if(token){
      isConnected = true;
    }
    if(isConnected){
      if (btnvar1.classList.contains('red')) {
        btnvar2.classList.remove('red');
        btnvar2.classList.add('btn');
      }
    }
    else{
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['connexion']);
      });
    }
  }
  
  Toggle2(id: number): void {
    const btnvar2 = document.getElementById(`btnh2-${id}`) as HTMLElement;
    btnvar2.classList.toggle('red');
    btnvar2.classList.toggle('btn');
    const btnvar1 = document.getElementById(`btnh1-${id}`) as HTMLElement;
    const token = sessionStorage.getItem('token');
    var isConnected = false;
    if(token){
      isConnected = true;
    }
    if(isConnected){
      if (btnvar2.classList.contains('red')) {
        btnvar1.classList.remove('red');
        btnvar1.classList.add('btn');
      }
    }
    else{
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['connexion']);
      });
    }
  }

  onClickInteractiveBox(event: MouseEvent): void {
    event.stopPropagation();
  }

  getInteractionByGabId(gabId : number , interaction : string): Boolean{
    let exist = false;
    if(gabId > 0){
      if(this.interactions){
        for (let index = 0; index < this.interactions.length; index++) {
          if(gabId == this.interactions[index].gab_id && this.interactions[index].interaction == interaction){
            exist = true;
          }
        }
      }
    }
    return exist;
  }

  Interraction(idGab : number, uuid : string, interaction : string){
    this.interactionService.interactionCUD(idGab, uuid, interaction).subscribe(data => {
    });
  }






}