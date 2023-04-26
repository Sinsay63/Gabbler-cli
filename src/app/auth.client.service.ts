import { Injectable } from '@angular/core';

import { Gab } from 'app/api';


@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
  isConnected: boolean = false;
  gabs ?= new Array<Gab>();

}