import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GabService, User, UserService, Users , Gab} from 'app/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  template: `
  <div class="like" (click)="toggleLike()" #likeButton></div>
`
})
export class HomeComponent implements OnInit{
  users ?= new Array<User>();
  gabs ?= new Array<Gab>();

  @ViewChild('likeButton', { static: true }) likeButton: ElementRef | undefined;;


  constructor(private userService: UserService,
    private gabService: GabService) {
   }
   countLike = 0;

   toggleLike() {
    if (this.likeButton) {
      const like = this.likeButton.nativeElement;
      console.log("test");

      if (this.countLike === 0) {
        console.log("test1");
        like.classList.toggle('anim-like');
        this.countLike = 1;
        like.style.backgroundPosition = 'right';
      } else {
        console.log("test2");
        this.countLike = 0;
        like.style.backgroundPosition = 'left';
      }
    }
  }
   
  ngOnInit(): void {
    this.gabService.getGabs().subscribe(data => {
      console.log(data);
      this.gabs= data.gabs;
    }, (error => {
      console.log(error);
    }));
  }
}
