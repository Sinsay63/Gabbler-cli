import { Component } from '@angular/core';
import { AuthService, UserAuth, UserToken } from 'app/api';
import { GlobalDataService } from 'app/global.data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor( private authService: AuthService, private userAuth: UserAuth, private globalDataService: GlobalDataService, private router: Router) {
   }
  email: string = '';
  password: string = '';

  async onSubmit() {
    try {
      // Récupérez les valeurs de l'email et du mot de passe
      this.userAuth = new UserAuth();
      this.userAuth.email = this.email;
      this.userAuth.password = this.password;
  
      const data = await this.authService.authenticateAndGetToken(this.userAuth).toPromise();
      this.globalDataService.token = data?.token;
      this.globalDataService.isConnected = true;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['home']);
      })
      this.getUuidFromToken();
    } catch (error) {
      this.globalDataService.isConnected = false;
    }
  }

  getUuidFromToken(){
    const decodedToken = this.globalDataService.getDecodedToken();
    this.globalDataService.uuid = decodedToken.uuid;
  }
}
