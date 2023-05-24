import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GabService, User, UserService, Gab, InteractionUser, GabCreation} from 'app/api';
import { GlobalDataService } from 'app/global.data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InteractionService } from 'app/api';
import { faComment, faHeart, faHeartCrack, faImage, faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  template: `
  <div class="like" (click)="toggleLike()" #likeButton></div>
`
})
export class HomeComponent implements OnInit{

  constructor(private gabService: GabService, public globalDataService: GlobalDataService, private route: ActivatedRoute, private router: Router, private interactionService: InteractionService) {
   }
  
  contentField: string = ''
  feed ?= new Array<Gab>();
  showLoader = true;
  heart = faHeart;
  sort = faSort;
  image = faImage;
  heartCrack = faHeartCrack;
  lastClickedLikeButton: HTMLElement | null = null;
  countLike = 0;
  isConnected: boolean | undefined;
  idGab = new Gab;
  faComment = faComment;
  formatDate=this.globalDataService.formatDate;


  createPost(){
    if(this.isConnected){
      const token = sessionStorage.getItem('token');
      if(token){
        const uuid = this.globalDataService.getUuidFromToken(token);
        const date = new Date();
        var gab = new GabCreation();

        gab.content = this.contentField;
        gab.user_uuid = uuid;
        
        console.log(gab);
        
        this.gabService.createGab(uuid, gab).subscribe(
          (response) => {
            console.log('Réponse de l\'API :', response);
            // Traitez ici la réponse de l'API si nécessaire
          },
          (error) => {
            console.error('Erreur de l\'API :', error);
            // Gérez ici les erreurs de l'API si nécessaire
          }
        );
        
      }
    }
  }

  async ngOnInit(): Promise<void> {
    const token = sessionStorage.getItem('token');
    if(token){
      this.isConnected=true;
    }
    else{
      this.isConnected=false;
    }
    if(this.isConnected){
      if(token){
        const uuid = this.globalDataService.getUuidFromToken(token);
        await this.gabService.getFeedUserConnected(uuid).subscribe(data => {
          console.log(data);
          this.feed= data;
          this.showLoader = false;
        }, (error => {
          console.log(error);
        }));
        
        this.interactionService.getInteractionsByUserUuid(uuid).subscribe(data => {
          this.globalDataService.interactions=data;
        },(error => {
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
}
