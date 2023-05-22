import { Injectable } from '@angular/core';

import { User, Gab, UserToken } from 'app/api';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  search: string = '';
  gabs ?= new Array<Gab>();
  users ?= new Array<User>();


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
}