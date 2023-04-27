import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService} from 'app/api';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  template: `
  <div class="like" (click)="toggleLike()" #likeButton></div>
`
})
export class ProfilComponent {

  constructor( private route: ActivatedRoute, private userService: UserService) { }

  user = new User()

  lastClickedLikeButton: HTMLElement | null = null;
   countLike = 0;

   toggleLike(event: MouseEvent) {
    const likeButton = event.target as HTMLElement;
  
    if (likeButton.classList.contains('like')) {
      // if (this.lastClickedLikeButton && this.lastClickedLikeButton !== likeButton) {
      //   // Si l'utilisateur a cliqué sur un autre élément "like" depuis la dernière fois,
      //   // on remet l'état du dernier élément cliqué à zéro
      //   this.lastClickedLikeButton.classList.remove('anim-like');
      //   this.lastClickedLikeButton.style.backgroundPosition = 'left';
      //   this.countLike = 0;
      // }
  
      if (this.countLike === 0) {
        likeButton.classList.add('anim-like');
        this.countLike = 1;
        likeButton.style.backgroundPosition = 'right';
      } else {
        this.countLike = 0;
        likeButton.style.backgroundPosition = 'left';
      }
  
      // this.lastClickedLikeButton = likeButton;
    }
  }
  
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
  
