import { Component } from '@angular/core';
import { fa1, fa2, fa3, fa4, fa6 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prestige',
  templateUrl: './prestige.component.html',
  styleUrls: ['./prestige.component.scss']
})
export class PrestigeComponent {
  un = fa1;
  deux = fa2;
  trois = fa3;
  six = fa6;


  checkbox1 = false;
  checkbox2 = false;
  checkbox3 = false;
  checkbox4 = false;

  handleCheckboxChange(selectedCheckbox: number) {
    if (selectedCheckbox === 1) {
      this.checkbox2 = false;
      this.checkbox3 = false;
      this.checkbox4 = false;
    } else if (selectedCheckbox === 2) {
      this.checkbox1 = false;
      this.checkbox3 = false;
      this.checkbox4 = false;
    } else if (selectedCheckbox === 3) {
      this.checkbox1 = false;
      this.checkbox2 = false;
      this.checkbox4 = false;
    } else if (selectedCheckbox === 4) {
      this.checkbox1 = false;
      this.checkbox2 = false;
      this.checkbox3 = false;
    }
  }
}
