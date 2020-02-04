import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';
import { UserProvider } from '../../providers/user/user';
import { ConfigProvider } from '../../providers/config/config';
import { AbogadosProvider } from '../../providers/abogados/abogados';
import { LoadingController } from 'ionic-angular';
import swal from 'sweetalert';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public description;
public departamento;
public email;
public ramas;
public ciudad;
  constructor(public db:AngularFirestore, public navCtrl: NavController, public userP:UserProvider,public config: ConfigProvider,public abogado: AbogadosProvider,
    public loadingCtrl: LoadingController,public http: HttpClient) {
   this.abogado.isAbogado = false;
   
  }
  ngOnInit(){
    this.config.getDepartamentos();
  }
guardar(){
  /*
  let load = this.loadingCtrl.create({
    content:'Enviando....',
    duration: 3000
  });
  load.present();
  var id = this.config.uniqueId();
  this.db.firestore.collection('consultas').doc(id).set({
    user: this.userP.userId,
    state: 'pendiente',
    consulta: this.description,
    departamento: this.departamento,
    email: this.email,
    id: id
  }).then(()=>{ swal('¡Correcto!.','Consulta envíada','success');
  load.dismiss();
}).catch((e)=>{swal('Error!.',""+e,'error');
load.dismiss();
})
*/
let load = this.loadingCtrl.create({
  content:'Enviando....',
  duration: 3000
});
load.present();
var id = this.config.uniqueId();
this.http.get(this.config.url+'welcome/insertar_consulta',{params:{
  imei: this.userP.userId,
    consulta: this.description,
    ciudad: this.ciudad,
    email: this.email
}}).subscribe(data=>{
  load.dismiss();
  if(data['estado'] =='error'){
    swal('Error',''+data['mensaje'],'error');
    this.description = '';
    this.email = '';
  }
  if(data['estado'] =='success'){
    swal('¡Correcto!',''+data['mensaje'],'success');
    this.description = '';
    this.email = '';
  }
});
}

}
