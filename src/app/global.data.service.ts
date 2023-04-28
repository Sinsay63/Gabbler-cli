import { Injectable } from '@angular/core';

import { User, Gab, UserToken } from 'app/api';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  isConnected: boolean = false;
  gabs ?= new Array<Gab>();
  users ?= new Array<User>();
  token ?: string;
  uuid: string = '';

  getDecodedToken(): any {
    const token = this.token;
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
}