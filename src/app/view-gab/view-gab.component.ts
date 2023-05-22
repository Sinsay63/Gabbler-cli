import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService, Gab, GabService, InteractionService, InteractionUser, InteractionCUDRequest, GabCreation } from 'app/api';
import { catchError } from 'rxjs/operators';
import { GlobalDataService } from 'app/global.data.service';
import { faArrowLeft, faComment, faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common'; 
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-view-gab',
  templateUrl: './view-gab.component.html',
  styleUrls: ['./view-gab.component.scss']
})
export class ViewGabComponent {
  constructor( private route: ActivatedRoute, private userService: UserService, private gabService: GabService, private router: Router, private globalDataService: GlobalDataService, private location: Location,private interactionService: InteractionService) { }
  user = new User()
  gab = new Gab()
  isConnected: boolean | undefined;
  comments ?= new Array<Gab>();
  interactionCUDRequest = new InteractionCUDRequest;
  interactions ?= Array<InteractionUser>();
  heart = faHeart;
  contentField: string = ''
  heartCrack = faHeartCrack;
  faArrowLeft = faArrowLeft;
  faComment = faComment;
  formatDate=this.globalDataService.formatDate;

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if(token){
      this.isConnected=true;
    }
    else{
      this.isConnected=false;
    }
    const stringId = this.route.snapshot.paramMap.get('id');
    const id = Number(stringId);
    this.gabService.getGabById( id ).pipe(
      catchError(() => {
        console.log('Erreur lors de la récupération du gab');
        return EMPTY;
      })
    )
    .subscribe((gab: Gab) => {
      this.gab = gab;
    });
    this.gabService.getCommentsByGabId(id).subscribe(data => {
      this.comments = data;
    });
    if(this.isConnected){
      const token = sessionStorage.getItem('token');
      if(token){
        const uuid = this.globalDataService.getUuidFromToken(token);
        this.userService.getUserByUuid(uuid).subscribe(data => {
          console.log(data);
          this.user=data;
        }, (error => {
          console.log(error);
        }));
      }
    }
  }
  
  retour(): void {
    this.location.back();
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

  createPost(content : string, idGabParent : number){
    if(this.isConnected){
      const token = sessionStorage.getItem('token');
      if(token){
        const uuid = this.globalDataService.getUuidFromToken(token);
        const date = new Date();
        var gab = new GabCreation();

        gab.content = content;
        gab.user_uuid = uuid;
        gab.parent_gab_id = idGabParent;
        
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

  Interraction(idGab : number, uuid : string, interaction : string){
    this.interactionCUDRequest.gab_id = idGab;
    this.interactionCUDRequest.user_uuid = uuid;
    this.interactionCUDRequest.type = interaction;
    this.interactionService.interactionCUD(this.interactionCUDRequest).subscribe(data => {
    });
  }
  toGab(id : number): void{
    const element = document.querySelector(`#btnh1-${id}`) as HTMLElement;
    this.Toggle1(id);
    this.Toggle2(id);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['gab/' + id]);
    });
  }
}
