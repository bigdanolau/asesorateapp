import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the IntroduccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-introduccion',
  templateUrl: 'introduccion.html',
})
export class IntroduccionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  home(){
    this.navCtrl.push(HomePage);
  }
  login(){
    this.navCtrl.push(LoginPage);
  }
 

}
