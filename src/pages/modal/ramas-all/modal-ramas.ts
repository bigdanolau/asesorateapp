import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../../providers/config/config';
import { AngularFireStorage } from '@angular/fire/storage';
import { AbogadosProvider } from '../../../providers/abogados/abogados';
import swal from 'sweetalert';
/**
 * Generated class for the ModalRamasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-ramas-all',
  templateUrl: 'modal-ramas.html',
})
export class RamasAllPage {
  public ramas:any[] = [
    'Derecho público' ,'Derecho privado'
    ,' General',
    'Derecho laboral y seguridad social', 'Derecho penal'
  ];
  selectedFiles: FileList;
  file: File;
  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public storage: AngularFireStorage,public abogados: AbogadosProvider) {
   //s swal('¡Atención!','Subir postgrado o documento que acredite su experiencia','success');
  }
  ngOnInit(){
    this.config.getRamas();
    
  }
  chooseFiles(event,rama) {
  if(event.checked){
    this.uploadpic(rama); 
  }else{
    const index = this.abogados.archivos.indexOf(this.abogados.archivos.find(x => x.rama == rama));
    console.log(index);
    
    if (index > -1) {
        this.abogados.archivos.splice(index, 1);
    }
    console.log(this.abogados.archivos);
    
  }
      
  
  }
  uploadpic(rama) {
    
    var tmp:any[] = [];
    tmp['archivo']  = null;
    tmp['rama'] = rama;
    this.abogados.archivos.push(tmp);
    
    console.log(this.abogados.archivos);
    
    let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
    //const uploadTask = this.storage.upload(this.abogados.personales['cedula']+'/'+rama+'/', file).catch(err=> console.log(err));
 
    //this.imgsrc = uploadTask.downloadURL();

    
 
  
  }
  close(){
    this.navCtrl.pop();
  }
}
