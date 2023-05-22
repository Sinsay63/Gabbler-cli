import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserRegister, UserToken } from 'app/api';
import { GlobalDataService } from 'app/global.data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private globalDataService : GlobalDataService, private authService: AuthService, private router: Router) {
  }

  username: string = ''
  lastname: string = ''
  firstname: string = ''
  email: string = ''
  password: string = ''
  birthday: string= ''

  async register(){
    try{
      var user = new UserRegister()
      if(this.username != '' && this.email != '' && this.birthday != '' && this.password != '' ){

        user.username = this.username
        user.firstname = this.firstname
        user.lastname = this.lastname
        user.email = this.email
        user.birthday = this.birthday
        user.password = this.password

        const data = await this.authService.registerUser(user).toPromise();

        if(data?.token != null){
          sessionStorage.setItem('token', data?.token);
        }
        this.router.navigateByUrl('/', {skipLocationChange: false}).then(() => {
          this.router.navigate(['home']);
        });
      } 
    }catch (error) {
      console.log("erreur lors de l'inscription")
    }
  }
}
