import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GabService, User, UserService, Gab, InteractionUser, GabCreation, InteractionCUDRequest} from 'app/api';
import { GlobalDataService } from 'app/global.data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InteractionService } from 'app/api';
import { faComment, faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  template: `
  <div class="like" (click)="toggleLike()" #likeButton></div>
`
})
export class HomeComponent implements OnInit{

  constructor(private gabService: GabService, private globalDataService: GlobalDataService, private route: ActivatedRoute, private router: Router, private interactionService: InteractionService) {
   }
  
  contentField: string = ''
  feed ?= new Array<Gab>();
  showLoader = true;
  interactions ?= Array<InteractionUser>();
  heart = faHeart;
  heartCrack = faHeartCrack;
  lastClickedLikeButton: HTMLElement | null = null;
  countLike = 0;
  isConnected: boolean | undefined;
  idGab = new Gab;
  faComment = faComment;
  interactionCUDRequest = new InteractionCUDRequest;
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
        this.interactionService.getInteractionsByUserUuid(uuid).subscribe(data => {
          this.interactions=data;
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

  toGab(id : number): void{
    const element = document.querySelector(`#btnh1-${id}`) as HTMLElement;
    this.Toggle1(id);
    this.Toggle2(id);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['gab/' + id]);
    });
  }

  onClickInteractiveBox(event: MouseEvent): void {
    event.stopPropagation();
  }
  
  getInteractionByGabId(gabId : number , interaction : string): Boolean{
    let exist = false;
    if(gabId > 0){
      if(this.interactions){
        for (let index = 0; index < this.interactions.length; index++) {
          if(gabId == this.interactions[index].gab_id && this.interactions[index].interaction == interaction){
            exist = true;
          }
        }
      }
    }
    return exist;
  }

Toggle1(id: number): void {
  const btnvar1 = document.getElementById(`btnh1-${id}`) as HTMLElement;
  btnvar1.classList.toggle('red');
  btnvar1.classList.toggle('btn');
  
  const btnvar2 = document.getElementById(`btnh2-${id}`) as HTMLElement;
  if(this.isConnected){
    if (btnvar1.classList.contains('red')) {
      btnvar2.classList.remove('red');
      btnvar2.classList.add('btn');
    }
  }
  else{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['connexion']);
    });
  }
}

Toggle2(id: number): void {
  const btnvar2 = document.getElementById(`btnh2-${id}`) as HTMLElement;
  btnvar2.classList.toggle('red');
  btnvar2.classList.toggle('btn');
  
  const btnvar1 = document.getElementById(`btnh1-${id}`) as HTMLElement;
  if(this.isConnected){
    if (btnvar2.classList.contains('red')) {
      btnvar1.classList.remove('red');
      btnvar1.classList.add('btn');
    }
  }
  else{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['connexion']);
    });
  }
}

  Interraction(idGab : number, uuid : string, interaction : string){
    this.interactionCUDRequest.gab_id = idGab;
    this.interactionCUDRequest.user_uuid = uuid;
    this.interactionCUDRequest.type = interaction;
    this.interactionService.interactionCUD(this.interactionCUDRequest).subscribe(data => {
    });
  }
}
