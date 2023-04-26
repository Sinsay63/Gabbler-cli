import { Component } from '@angular/core';
import { AuthService, UserAuth, UserToken } from 'app/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor( private authService: AuthService, private userAuth: UserAuth) {
   }
  
  isConnected: boolean = false;
  token: UserToken | undefined;
  email: string = '';
  password: string = '';

  onSubmit() {
    // Récupérez les valeurs de l'email et du mot de passe
    this.userAuth =  new UserAuth();
    this.userAuth.email = this.email;
    this.userAuth.password = this.password;
    this.authService.authenticateAndGetToken(this.userAuth).subscribe(data => {
      console.log(data);
      this.token = data;
      this.isConnected=true;
    }, (error => {
      this.isConnected=false;
      console.log(error);
    }));
    
    console.log(this.token);
    console.log(this.isConnected)
  }
}
