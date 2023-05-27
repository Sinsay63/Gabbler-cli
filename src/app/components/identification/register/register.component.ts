import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, DocService, EmailDetails, UserRegister } from 'app/api';
import { GlobalDataService } from 'app/global.data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @HostBinding('class') className = 'sliderComp';

  username: string = '';
  lastname: string = '';
  firstname: string = '';
  email: string = '';
  password: string = '';
  birthday: string= '';

  constructor(private globalDataService : GlobalDataService, private authService: AuthService, private router: Router, private mailService: DocService) {
  }

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

          let emailDetails = new EmailDetails();
          emailDetails.recipient = this.email;
          emailDetails.subject = "[GABBLER] Confirmation de la création de votre compte";
          emailDetails.msgBody = "Bonjour,\n Vous venez de vous inscrire sur Gabbler, pour des questions de sécurité merci de confirmer votre compte au lien suivant:  \n  http://localhost:8081/api/confirmEmail/" + this.globalDataService.getUuidFromToken(data.token) +
          "\n \nUne fois votre compte confirmé vous pourrez fermer la page de confirmation et vous connecter à l'application. \n Cordialement, \n L'équipe Gabbler"
          ;

          this.mailService.sendMail(emailDetails).subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.log(error);
            }
          );
          this.router.navigateByUrl('/', {skipLocationChange: false}).then(() => {
            this.router.navigate(['home']);
          });
        }
      } 
    }catch (error) {
      console.log("erreur lors de l'inscription")
    }
  }
}