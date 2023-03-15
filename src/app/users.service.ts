import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) {

   }

   getUsers() {
    return this.httpClient.get(this.API_URL + '/users');
   }
}
