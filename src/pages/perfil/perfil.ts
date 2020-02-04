import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AbogadosProvider } from '../../providers/abogados/abogados';
import { HttpClient} from '@angular/common/http';
import { ConfigProvider } from '../../providers/config/config';
import { RegistroAcademicoPage } from '../abogados/registro/registro-academico/registro-academico';
import { ModalRamasPage } from '../modal/modal-ramas/modal-ramas';
import { DashboardPage } from '../dashboard/dashboard';
import { PagosPage } from '../pagos/pagos';
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  public info;
  selectedFiles: FileList;
  public foto: File;
  departa;
  public nombre;
  public cedula;
  public tarjetaprofe;
  public celular;
  public email;
  public ramas;
  public estado;
  public pet = 'kittens';
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public abogado:AbogadosProvider,public http:HttpClient,public config: ConfigProvider) {
    this.ramas = ModalRamasPage;
  }

  ionViewDidLoad() {
   
  }
  go(){
    this.navCtrl.push(DashboardPage);
  }
  ngOnInit(){
    this.config.getDepartamentos();
    this.http.get(this.config.url+'welcome/get_user_login',{params:{
      email: this.abogado.logueo
    }}).subscribe(data=>{
     this.info = data;
     console.log(this.info);
     
    this.nombre = this.info.abogados_nombre;
    this.cedula = this.info.abogados_cedula;
    this.celular = this.info.abogados_telefono;
    this.email = this.info.abogados_email;
    this.estado = this.info.abogados_estado;
    this.tarjetaprofe = this.info.abogados_tarjeta;
    
    });
    this.config.locaciones;
  }
  chooseFiles(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.item(0)){
      this.foto = this.selectedFiles.item(0);
    } 
  }
  getPersonales(ng){
    this.abogado.update_personales(ng,this.foto).then(()=>{
      this.navCtrl.setRoot(PerfilPage); 
    });
  }
  modal(){
    let modal = this.modalCtrl.create(ModalRamasPage);
    modal.present();
  }
  pago(){
    this.navCtrl.push(PagosPage);
  }
}
