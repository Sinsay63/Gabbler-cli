import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService} from 'app/api';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {

  constructor( private route: ActivatedRoute, private userService: UserService) { }
  user = new User()
  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('uuid') ?? ""
    this.userService.getUserByUuid( uuid ).pipe(
      catchError(() => {
        console.log('Erreur lors de la récupération de l\'utilisateur');
        return EMPTY;
      })
    )
    .subscribe((user: User) => {
      this.user = user;
    });
  }
}
  
