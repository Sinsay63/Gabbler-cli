import { Component, HostBinding } from '@angular/core';
import { AuthService, UserAuth, UserToken } from 'app/api';
import { GlobalDataService } from 'app/global.data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  @HostBinding('class') className = 'loginComp';

  constructor( private authService: AuthService,private toastr: ToastrService, private userAuth: UserAuth, private globalDataService: GlobalDataService, private router: Router) {
   }

  email: string = '';
  password: string = '';

  toRegister(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['signUp/']);
    });
  }

  async onSubmit() {
    try {
      // Récupérez les valeurs de l'email et du mot de passe
      this.userAuth = new UserAuth();
      this.userAuth.email = this.email;
      this.userAuth.password = this.password;
  
      const data = await this.authService.authenticateAndGetToken(this.userAuth).toPromise();
      if(data?.token != null){
        this.toastr.success("Vous êtes connecté","Bravo!");
        sessionStorage.setItem('token', data?.token);
      }
      this.router.navigateByUrl('/', {skipLocationChange: false}).then(() => {
        this.router.navigate(['home']);
      });
    } catch (error) {
      this.toastr.error("Erreur lors de la connexion, veuillez réessayer", "Erreur");
      console.log("erreur lors de la connexion")
    }
  }
}
