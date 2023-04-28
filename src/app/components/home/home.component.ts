import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GabService, User, UserService, Gab} from 'app/api';
import { GlobalDataService } from 'app/global.data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  template: `
  <div class="like" (click)="toggleLike()" #likeButton></div>
`
})
export class HomeComponent implements OnInit{
  feed ?= new Array<Gab>();
  showLoader = true;


  constructor(private gabService: GabService, private globalDataService: GlobalDataService, private route: ActivatedRoute, private router: Router) {
   }
   
   lastClickedLikeButton: HTMLElement | null = null;
   countLike = 0;
   isConnected: boolean | undefined;
   formatDate=this.globalDataService.formatDate;

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

  async ngOnInit(): Promise<void> {
    this.isConnected=this.globalDataService.isConnected;
    if(this.isConnected){
      const token = sessionStorage.getItem('token');
      if(token){
        const uuid = this.globalDataService.getUuidFromToken(token);
        await this.gabService.getFeedUserConnected(uuid).subscribe(data => {
          console.log(data);
          this.feed= data;
          this.showLoader = false;
        }, (error => {
          console.log(error);
        }));
      }
    }
    else{
      await this.gabService.getFeedUserNotConnected().subscribe(data => {
        console.log(data);
        this.feed= data;
        this.showLoader = false;
      }, (error => {
        console.log(error);
      }));
    }
  }

  toGab(id : any){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['gab/' + id]);
    });
  }

  onClickInteractiveBox(event: MouseEvent): void {
    event.stopPropagation();
  }
}
