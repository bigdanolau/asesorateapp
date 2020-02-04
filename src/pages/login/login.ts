import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Firebase} from '@ionic-native/firebase';

import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { GooglePlus } from '@ionic-native/google-plus';
import { UrlsPipe } from '../../pipes/urls/urls';
import { LoginProvider } from '../../providers/login/login';
import { RegistroPersonalesPage } from '../abogados/registro/registro-personales/registro-personales';
import { AbogadosProvider } from '../../providers/abogados/abogados';
import { DashboardPage } from '../dashboard/dashboard';
import { PerfilPage } from '../perfil/perfil';
import swal from 'sweetalert';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
public externalLink;
public email;
public password;
  constructor(public firebase: Firebase ,public googlePlus: GooglePlus, public navCtrl: NavController, public navParams: NavParams,public loginP: LoginProvider,public abogado:AbogadosProvider) {


  }
  login() {
     this.loginP.login(this.email,this.password).then(()=>{
      this.navCtrl.push(PerfilPage);
      this.abogado.logueo = this.email;
     });
     
      }
    registro(){
      this.navCtrl.push(RegistroPersonalesPage);
    }
    showPassword(input: any): any {
      input.type = input.type === 'password' ?  'text' : 'password';
     }
  recuperar(){
    let data = swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Ingresa tu email",
          type: "email",

        },
      },
    }).then(data=>{
      if(data){
        this.loginP.recuperar(data);
      }
      
     
    }).catch(err=>{
      swal("Error: ",""+err,"error");
    });
    
    
  }

}
