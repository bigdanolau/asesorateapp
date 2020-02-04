import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DetalleConsultaPage } from '../detalle-consulta/detalle-consulta';
import { AngularFirestore } from '@angular/fire/firestore';
import swal from 'sweetalert';
import { ConfigProvider } from '../../providers/config/config';


@Component({
  selector: 'page-detalle-respuesta',
  templateUrl: 'detalle-respuesta.html',
})
export class DetalleRespuestaPage {
public consulta;
public ir;
public respuestas:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFirestore,public loadingCtrl: LoadingController,public config: ConfigProvider) {
    this.ir = DetalleConsultaPage;
    let load = this.loadingCtrl.create({
      content:'Cargando....',
      duration: 3000
    });
    load.present();
    this.consulta = this.navParams.data;
    console.log(this.consulta);
    
    this.config.http.get(this.config.url+'/welcome/get_respuestas_user',{params:{
      id_consulta: this.consulta['id']
    }}).subscribe(data=>{
      if(data['estado'] == 'success'){
        this.respuestas = data['mensaje'];
      }else{
        swal("Respuesta en proceso","Su consulta está siendo gestionada, intente más tarde.","success");
        this.navCtrl.pop();
      }
      
      load.dismiss();
    })
    /*
    this.db.collection('consultas').doc(this.consulta['id']).collection('respuestas').valueChanges().subscribe(data=>{
      load.dismiss();
      
      this.respuestas = data;
      
      if(typeof  this.respuestas !== 'undefined' &&  this.respuestas.length > 0){
        load.dismiss();
      }else{
        swal("Respuesta en proceso","Su consulta está siendo gestionada, intente más tarde.","success");
        this.navCtrl.pop();
      }
    })
    */
  }
  ngOnInit(){
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleRespuestaPage');
  }
  detalle(res){

    this.navCtrl.push(DetalleConsultaPage,{info:res,consulta:this.consulta});
  }

}
