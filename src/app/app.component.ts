import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RegistroAcademicoPage } from '../pages/abogados/registro/registro-academico/registro-academico';
import { RegistroPersonalesPage } from '../pages/abogados/registro/registro-personales/registro-personales';
import { DetalleConsultaPage } from '../pages/detalle-consulta/detalle-consulta';
import { IntroduccionPage } from '../pages/introduccion/introduccion';
import { PagosPage } from '../pages/pagos/pagos';
import { AbogadosProvider } from '../providers/abogados/abogados';
import { PerfilPage } from '../pages/perfil/perfil';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = IntroduccionPage;
  pages: Array<{title: string, component: any,icon:string}>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public abogado:AbogadosProvider,public firebaseMessaging: FirebaseMessaging) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    if(this.abogado.isAbogado){
      this.pages = [
        { title: 'Inicio', component: IntroduccionPage,icon: './assets/imgs/icon1.png' },

        { title: 'Historial', component: DashboardPage,icon: './assets/imgs/icon2.png'  },
        
      ];
    }else{
      this.pages = [
        { title: 'Consultar', component: HomePage,icon: './assets/imgs/icon1.png' },
        { title: 'Historial', component: DashboardPage,icon: './assets/imgs/icon2.png'  },
        
      ];
    }
    this.firebaseMessaging.onMessage().subscribe(data=>{
      console.log(data);
    });
    this.firebaseMessaging.onBackgroundMessage().subscribe(data=>{
      console.log(data);
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
