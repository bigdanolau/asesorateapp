import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserProvider } from '../../providers/user/user';
import { DetalleRespuestaPage } from '../detalle-respuesta/detalle-respuesta';
import { AbogadosProvider } from '../../providers/abogados/abogados';
import { DetalleConsultaPage } from '../detalle-consulta/detalle-consulta';
import { ConfigProvider } from '../../providers/config/config';
import swal from 'sweetalert';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  public consultas: any[];
  public detalle;
  public error;
  constructor(public db:AngularFirestore, public navCtrl: NavController, public userC: UserProvider,public abogado:AbogadosProvider,public loadingCtrl:LoadingController,
    public config: ConfigProvider) {
    console.log(this.abogado.get_abogado);
    if(this.abogado.isAbogado){
      this.detalle = DetalleConsultaPage;
    }else{
      this.detalle = DetalleRespuestaPage;
    }



    if(this.abogado.isAbogado){
      /*
      this.db.collection('ramas', ref => ref.where('abogado.cedula','==','1235038396').where('respondida','==',false)).valueChanges().subscribe(data=>{
        this.consultas = [];
        data.forEach(e=>{
          this.db.collection('consultas').doc(e['consulta']).valueChanges().subscribe(dato=>{
           
            this.consultas.push(dato);
            if(typeof  dato !== 'undefined' &&  dato !== '' &&  dato !== ' '){

            }else{
              this.error = 'No hay consultas en sus ramas asignadas por el momento.';
            }
          })
        })
        
        console.log(data);
      });
      */
     
      let load = this.loadingCtrl.create({
        content:'Cargando....',
        duration: 3000
      });
      load.present();
      this.config.http.get(this.config.url+'welcome/getConsultas',{params:{id: this.abogado.get_abogado.id}}).subscribe(data=>{
        if(data['estado'] == 'success'){
          this.consultas = data['mensaje'];
          console.log(data);
          
        }else{
          this.error = data['mensaje'];
          swal('error',''+data['mensaje'],'error');
        }
        
        load.dismiss();
      });
    }else{
      
      let load = this.loadingCtrl.create({
        content:'Cargando....',
        duration: 3000
      });
      load.present();
      /*
      this.db.collection('consultas', ref => ref.where('user','==',this.userC.userId).where('state','==','pendiente')).valueChanges().subscribe(data=>{
        this.consultas = data;
        load.dismiss();
        
      });
      */
      this.config.http.get(this.config.url+'welcome/get_consultas_imei',{params:{imei: this.userC.userId}}).subscribe(data=>{
        if(data['estado'] == 'success'){
          this.consultas = data['mensaje'];
        }else{
          this.error = data['mensaje'];
          swal('error',''+data['mensaje'],'error');
        }
        
        load.dismiss();
      });
    }
  }

  ngOnInit() {
   
  }
}

