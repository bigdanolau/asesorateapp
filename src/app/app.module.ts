import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { LoginPage } from '../pages/login/login';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { UserProvider } from '../providers/user/user';
import { DetalleRespuestaPage } from '../pages/detalle-respuesta/detalle-respuesta';
import { RegistroPersonalesPage } from '../pages/abogados/registro/registro-personales/registro-personales';
import { ConfigProvider } from '../providers/config/config';
import { AbogadosProvider } from '../providers/abogados/abogados';
import { RegistroAcademicoPage } from '../pages/abogados/registro/registro-academico/registro-academico';
import { ModalRamasPage } from '../pages/modal/modal-ramas/modal-ramas';
import { UrlsPipe } from '../pipes/urls/urls';
import { PagosPage } from '../pages/pagos/pagos';
import { DetalleConsultaPage } from '../pages/detalle-consulta/detalle-consulta';
import { LoginProvider } from '../providers/login/login';
import { IntroduccionPage } from '../pages/introduccion/introduccion';
import { HttpClientModule} from '@angular/common/http';
import { PerfilPage } from '../pages/perfil/perfil';
import { RamasAllPage } from '../pages/modal/ramas-all/modal-ramas';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
 const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyBl6w0UzRuO0F4o-JZBi_YXvhzusajkzjw",
    authDomain: "asesorateapp.firebaseapp.com",
    databaseURL: "https://asesorateapp.firebaseio.com",
    projectId: "asesorateapp",
    storageBucket: "asesorateapp.appspot.com",
    messagingSenderId: "386740019081"
  }
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    DashboardPage,
    DetalleRespuestaPage,
    RegistroPersonalesPage,
    RegistroAcademicoPage,
    ModalRamasPage,
    UrlsPipe,
    PagosPage,
    DetalleConsultaPage,
    IntroduccionPage,
    PerfilPage,
    RamasAllPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    DashboardPage,
    DetalleRespuestaPage,
    RegistroPersonalesPage,
    RegistroAcademicoPage,
    ModalRamasPage,
    PagosPage ,
    DetalleConsultaPage,
    IntroduccionPage,
    PerfilPage,
    RamasAllPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    FirebaseAuthentication,
    GooglePlus,
    UniqueDeviceID,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    DetalleRespuestaPage,
    ConfigProvider,
    AbogadosProvider,
    LoginProvider,
    FirebaseMessaging
  ]
})
export class AppModule {}
