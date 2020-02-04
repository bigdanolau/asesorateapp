import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { ModalRamasPage } from '../../../modal/modal-ramas/modal-ramas';
import { AbogadosProvider } from '../../../../providers/abogados/abogados';
import { PagosPage } from '../../../pagos/pagos';
import { RamasAllPage } from '../../../modal/ramas-all/modal-ramas';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from '../../../../providers/config/config';

/**
 * Generated class for the RegistroAcademicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registro-academico',
  templateUrl: 'registro-academico.html',
})
export class RegistroAcademicoPage {
  public ramas;
  public universidad;
  public searchText;
  public instituto_pregrado;
  constructor(public config:ConfigProvider, public navCtrl: NavController,public http:HttpClient, public navParams: NavParams,public modalCtrl: ModalController,public abogados:AbogadosProvider) {
  this.ramas = ModalRamasPage;
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroAcademicoPage');
  }
  modal(){
    let modal = this.modalCtrl.create(RamasAllPage);
    modal.present();
  }
  guardar(ng){
    
    this.abogados.getAcademicos(ng);
    //this.navCtrl.push(RegistroAcademicoPage);
    this.navCtrl.push(PagosPage);
   }
   addNote(uni){
     this.searchText = uni.nombre;
    this.instituto_pregrado = uni.nombre;
    this.universidad = [];
   }
   buscar(){
     if(this.searchText.length >1){
      this.http.get(this.config.url+'welcome/universidad/',{params:{
        nombre: this.searchText
      }}).subscribe(data=>{
        this.universidad = data;
      });
     }
    
   }
}
