import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  imageObject = [{
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
},{
    image: 'https://www.comment-apprendre-la-photo.fr/wp-content/uploads/2020/09/Comment-apprendre-la-photo-bonnes-photos-d-oiseaux-6-pexels-pixabay-416179.jpg',
    thumbImage: 'https://www.comment-apprendre-la-photo.fr/wp-content/uploads/2020/09/Comment-apprendre-la-photo-bonnes-photos-d-oiseaux-6-pexels-pixabay-416179.jpg',
}];
}

