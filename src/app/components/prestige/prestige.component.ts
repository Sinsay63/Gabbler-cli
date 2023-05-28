import { Component, OnInit } from '@angular/core';
import { fa1, fa2, fa3, fa4, fa6, faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal'
import { SubscriptionService } from 'app/api';
import { GlobalDataService } from 'app/global.data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prestige',
  templateUrl: './prestige.component.html',
  styleUrls: ['./prestige.component.scss']
})

export class PrestigeComponent{
  un = fa1;
  deux = fa2;
  trois = fa3;
  six = fa6;


  checkbox1 = false;
  checkbox2 = false;
  checkbox3 = false;
  checkbox4 = false;
  public payPalConfig?: IPayPalConfig;

constructor(private subscriptionService: SubscriptionService,private toastr: ToastrService, private globalDataService: GlobalDataService) { }
  
  handleCheckboxChange(selectedCheckbox: number) {
    //Bien laisser ces chiffres car ils correspondent aux ids des offres en bdd
    if (selectedCheckbox === 1) {
      this.editPaypalConfig(selectedCheckbox);
      this.checkbox2 = false;
      this.checkbox3 = false;
      this.checkbox4 = false;
      if (this.checkbox1 === false) {
        this.payPalConfig = undefined;
      }
    } else if (selectedCheckbox === 2) {
      this.editPaypalConfig(selectedCheckbox);
      this.checkbox1 = false;
      this.checkbox3 = false;
      this.checkbox4 = false;
      if (this.checkbox2 === false) {
        this.payPalConfig = undefined;
      }
    } else if (selectedCheckbox === 3) {
      this.editPaypalConfig(selectedCheckbox);
      this.checkbox1 = false;
      this.checkbox2 = false;
      this.checkbox4 = false;
      if (this.checkbox3 === false) {
        this.payPalConfig = undefined;
      }
    } else if (selectedCheckbox === 4) {
      this.editPaypalConfig(selectedCheckbox);
      this.checkbox1 = false;
      this.checkbox2 = false;
      this.checkbox3 = false;
      if (this.checkbox4 === false) {
        this.payPalConfig = undefined;
      }
    }
    
  }

  private editPaypalConfig(nbChoice: number): void {

    let price: string;
    let name: string;
    
    if (nbChoice === 1 || nbChoice === undefined || nbChoice > 4) {
      price = '5.00';
      name = "Abonnement Gabbler Prestige pour 1 mois"
    } else if (nbChoice === 2) {
      price = '13.50';
      name = "Abonnement Gabbler Prestige pour 3 mois"
    } else if (nbChoice === 3) {
      price = '25.50';
      name = "Abonnement Gabbler Prestige pour 6 mois"
    } else if (nbChoice === 4) {
      price = '48.00';
      name = "Abonnement Gabbler Prestige pour 12 mois"
    }
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'Ae2HFIwd1hHVj9UyCw8ekvyXWOIkH78Xg466wpfZEAJHpCbroWKhXuUFZY3XDfdd4708LnBqsrQUL0c9',
      createOrderOnClient: (data) =>
      <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
              {
                  amount: {
                      currency_code: 'EUR',
                      value: price,
                      breakdown: {
                          item_total: {
                            value: price,
                            currency_code: 'EUR'
                          }
                        }
                  },
                  items: [
                      {
                          name: name,
                          quantity: '1',
                          category: 'DIGITAL_GOODS',
                          unit_amount: {
                              currency_code: 'EUR',
                              value: price,
                          },
                      },
                  ],
              },
          ],
      },
      style: {
          label: 'paypal',
          layout: 'horizontal',
      },
      
      onApprove: (data, actions) =>
          actions.order.capture().then((details: any) => {
            const userUuid = this.globalDataService.getUuidFromToken(sessionStorage.getItem("token") ?? "");
            this.subscriptionService.subscribeUser(userUuid,nbChoice).subscribe(
              (data) => {
                this.toastr.success("Vous êtes maintenant membre Gabbler Prestige","Bravo!");
              },
              (error) => {
                this.toastr.error("Erreur survenue sur le serveur", "Erreur");
                console.log(error);
              }
            );

          }),
          onError: err => {
          console.log('Error:', err);
          this.toastr.error("Erreur survenue lors du paiement", "Erreur");
          }
      };
  }
}
