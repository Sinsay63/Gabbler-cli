import { Component } from '@angular/core';
import { AuthService, UserAuth, UserToken } from 'app/api';
import { AuthClientService } from 'app/auth.client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor( private authService: AuthService, private userAuth: UserAuth, private authClientService: AuthClientService) {
   }
  
  token: UserToken | undefined;
  email: string = '';
  password: string = '';

  async onSubmit() {
    try {
      // Récupérez les valeurs de l'email et du mot de passe
      this.userAuth = new UserAuth();
      this.userAuth.email = this.email;
      this.userAuth.password = this.password;
  
      const data = await this.authService.authenticateAndGetToken(this.userAuth).toPromise();
      console.log(data);
      this.token = data;
      this.authClientService.isConnected = true;
  
      console.log(this.token);
      console.log(this.authClientService.isConnected);
    } catch (error) {
      this.authClientService.isConnected = false;
      console.log(error);
      console.log(this.authClientService.isConnected);
    }
  }
}
