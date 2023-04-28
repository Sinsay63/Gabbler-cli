import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService, Gab, GabService } from 'app/api';
import { catchError } from 'rxjs/operators';
import { GlobalDataService } from 'app/global.data.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-view-gab',
  templateUrl: './view-gab.component.html',
  styleUrls: ['./view-gab.component.scss']
})
export class ViewGabComponent {
  constructor( private route: ActivatedRoute, private userService: UserService, private gabService: GabService, private globalDataService: GlobalDataService) { }
  user = new User()
  gab = new Gab()
  formatDate=this.globalDataService.formatDate;

  ngOnInit() {
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
  }
}
