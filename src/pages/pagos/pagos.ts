import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import sweet from 'sweetalert';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-pagos',
  templateUrl: 'pagos.html',
})
export class PagosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ir(url) {
    
    sweet('Confirmación de pago','Una vez se realize el pago, la cuenta se activará en un máximo de 24 hrs','info').then(val=>{
      if(val){
        location.href = url;
      }
    });
  //;
    
  }
  login(){
    this.navCtrl.push(LoginPage);
  }
}
