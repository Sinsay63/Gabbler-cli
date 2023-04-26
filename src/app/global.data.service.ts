import { Injectable } from '@angular/core';

import { Gab, UserToken } from 'app/api';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  isConnected: boolean = false;
  gabs ?= new Array<Gab>();
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
}