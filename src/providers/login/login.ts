
import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { AbogadosProvider } from '../abogados/abogados';
import sweet from 'sweetalert';
import { LoadingController } from 'ionic-angular';


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  
  constructor(public firebaseAuthentication: FirebaseAuthentication,public abogado: AbogadosProvider,
    public loadingCtrl: LoadingController) {
    console.log('Hello LoginProvider Provider');
    this.firebaseAuthentication.onAuthStateChanged().subscribe(d=>{
      console.log(d);
      
    })
  }
  login(email,pass){
    var promise = new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({content:'Validando..'});
      loading.present(loading); //nav instance of NavController
  
  this.firebaseAuthentication.signInWithEmailAndPassword(email,pass).then(data=>{
    this.abogado.getAb(email).then(data=>{
      this.abogado.isAbogado = true;
      loading.dismiss();
      resolve();
    });
    
    
      }).catch(
        err=>{
          sweet("Datos incorrectos","Usuario o contraseña incorrectos, verifique.","error");
          loading.dismiss();
          reject();
        }
      )
    });
    return promise;

  }

  recuperar(email){
    this.firebaseAuthentication.sendPasswordResetEmail(email).then(data=>{
      sweet("¡Datos enviados!","Link para recuperar contraseña enviado a: "+email,"success");
    }).catch(err=>{
      sweet("Error: ",err,"error");
    })
  }
}
