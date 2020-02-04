import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbogadosProvider } from '../../providers/abogados/abogados';
import { AngularFirestore } from '@angular/fire/firestore';
import swal from 'sweetalert';
import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'page-detalle-consulta',
  templateUrl: 'detalle-consulta.html',
})
export class DetalleConsultaPage {
public consulta:any[];
public respuesta;
public info:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public abogado:AbogadosProvider,public db:AngularFirestore,public config:ConfigProvider) {
 

  console.log(this.navParams.data);
  
  }
  ngOnInit(){
    if(this.abogado.isAbogado){
      this.consulta = this.navParams.data;
      this.config.http.get(this.config.url+'welcome/verificar_respuesta',{params:{
        id_consulta: this.consulta['id'],
        id_abogado: this.abogado.get_abogado['id']
      }}).subscribe(data=>{
        if(data['estado'] == 'success'){
          //swal('¡Correcto!',''+data['mensaje'],'success');
        }else{
          swal('success',''+data['mensaje'],'success');
          this.navCtrl.pop();
        }
      });
    }
    else{
      this.consulta = this.navParams.get('consulta');
    this.info = this.navParams.get('info');
    }
    
  }
  registrar(id){
    /*
    this.db.collection('consultas').doc(this.consulta['id']).collection('respuestas').doc(this.abogado.get_abogado[0]['personales']['cedula']).set({
      respuesta: this.respuesta,
      abogado: this.abogado.get_abogado[0]['personales']['cedula'],
      nombre: this.abogado.get_abogado[0]['personales']['nombre'],
      foto: this.abogado.get_abogado[0]['foto']
    });
    this.db.collection('asignaciones').doc(this.consulta['id']).delete();
    */
   this.config.http.get(this.config.url+'welcome/insertar_respuesta',{params:{
     respuesta: this.respuesta,
     id_consulta: id,
     id_abogado: this.abogado.get_abogado['id']
   }}).subscribe(data=>{
    if(data['estado'] == 'success'){
      swal('¡Correcto!',''+data['mensaje'],'success');
    }else{
      swal('error',''+data['mensaje'],'error');
    }
    this.respuesta = '';
    this.navCtrl.pop();
   });
   

  }
  contactar(){
    swal('¡Datos del abogado: !','Email: '+this.abogado.get_abogado.abogados_email+'Celular: '+this.abogado.get_abogado.abogados_telefono,'success');
  }
}
