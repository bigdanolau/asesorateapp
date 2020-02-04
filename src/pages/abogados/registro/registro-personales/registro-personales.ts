import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { ConfigProvider } from '../../../../providers/config/config';
import {NgForm} from '@angular/forms';
import { AbogadosProvider } from '../../../../providers/abogados/abogados';
import { RegistroAcademicoPage } from '../registro-academico/registro-academico';
@Component({
  selector: 'page-registro-personales',
  templateUrl: 'registro-personales.html',
})
export class RegistroPersonalesPage {
  selectedFiles: FileList;
  foto: File;
  departa;
  constructor(public navCtrl: NavController,public storage: AngularFireStorage,public config:ConfigProvider,public abogados:AbogadosProvider) {
    
    
  }
  ngOnInit(){
    this.config.getDepartamentos();
  }
  
  getPersonales(ng){
   this.abogados.getPersonales(ng,this.foto);
   this.navCtrl.push(RegistroAcademicoPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPersonalesPage');
    this.config.locaciones;
  }
  chooseFiles(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.item(0)){
      this.foto = this.selectedFiles.item(0);
    } 
  }
 
  uploadpic() {
    
 
  
  }
  
}
