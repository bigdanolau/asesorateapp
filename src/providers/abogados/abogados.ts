
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import sweet from 'sweetalert';
import { ConfigProvider } from '../config/config';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
/*
  Generated class for the AbogadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AbogadosProvider {
  public get_abogado;
  public isAbogado;
  public logueo;
  public registro:any[] = [];
  public nombre = '';
  public personales = new Array();
  public academicos = new Array();
  public archivos:any[] = [];
  public archivosname = new Array();
  public foto:File ;
  public enlaces = [];
  constructor(public db:AngularFirestore,public storage: AngularFireStorage,public auth: FirebaseAuthentication,public config: ConfigProvider,public http:HttpClient) {
   this.archivos = [];
   this.academicos = [];
   this.isAbogado = false;
  //  COMENTAR LUEGO
  //this.logueo = "agamezgutierrezdaniel@gmail.com";
  }
   getPersonales(form,foto){
    var keys:any[] = Object.keys(form.controls);
    
    keys.forEach(d=>{
      this.personales[d] = form.controls[d].value;
     
    })
    this.foto = foto;
    console.log(this.personales);
  }
  update_personales(form,foto){
    let promesa = new Promise((resolve,reject)=>{
      var keys:any[] = Object.keys(form.controls);
    
      keys.forEach(d=>{
        this.personales[d] = form.controls[d].value;
       
      })
      
        this.foto = foto;
      console.log(this.personales);
  
      // EDITAR
  
  if(this.archivos.length > 0){
    this.generar_archivos().then((success:string)=>{
        
      let perso = this.personales;
      console.log(this.personales);
      
      if(foto){
        console.log('entró');
        
        this.storage.upload('/'+this.personales['cedula']+'/'+'fotoperfil', this.foto).catch(err=> console.log(err)).then(d=>{
          d.ref.getDownloadURL().then(per=>{
            this.config.http.get(this.config.url+'welcome/editar_abogado',{params:{
          
              celular: this.personales['celular'],
              ciudad: this.personales['ciudad'],
              id_usuario: this.personales['email'],
              foto: per,
              archivos: success
            }}).subscribe(data=>{
              resolve();
              swal('success',''+data['mensaje'],'success');
              
            });
        })
        
          /*
          this.db.collection('abogados').doc(this.personales['cedula']).set({personales: Object.assign({},this.personales),academicos: Object.assign({},this.academicos),
          foto: per,
          archivos: enlaces
            }).catch(e=>{
              sweet("error",""+e,"error");
          });
          */
        });
      }
      else{
          // SI NO HAY FOTO PARA EDITAR 
  
              this.config.http.get(this.config.url+'welcome/editar_abogado',{params:{
                id_usuario: this.logueo,
                celular: this.personales['celular'],
                ciudad: this.personales['ciudad'],
                nombre: this.personales['nombre'],
                foto: null,
                archivos: success
              }}).subscribe(data=>{
                swal('success',''+data['mensaje'],'success');
                resolve();
              });
          
  
      }
    
  
  
    
    });
  
      // FIN EDITAR
  }else{
  
    this.config.http.get(this.config.url+'welcome/editar_abogado',{params:{
      id_usuario: this.logueo,
      celular: this.personales['celular'],
      ciudad: this.personales['ciudad'],
      nombre: this.personales['nombre'],
      foto: null
    }}).subscribe(data=>{
      swal('success',''+data['mensaje'],'success');
      resolve();
    });
  
  }
    })
    return promesa;
  

    
  }
  
  getAcademicos(form){
   this.auth.createUserWithEmailAndPassword(this.personales['email'],this.personales['password']).catch(err=>
    swal('error',''+err,'error')).then(data=>{

    });
    var keys:any[] = Object.keys(form.controls);
    
    keys.forEach(d=>{
      this.academicos[d] = form.controls[d].value;

        let perso = this.personales;
        this.storage.upload('/'+this.personales['cedula']+'/'+'fotoperfil', this.foto).catch(err=>{ console.log(err);console.log('aqúi');this.personales;
        }).then(d=>{
        d.ref.getDownloadURL().then(per=>{
          this.http.get(this.config.url+'welcome/registrar_abogado',{params:{
            cedula: this.personales['cedula'],
            celular: this.personales['celular'],
            ciudad: this.personales['ciudad'],
            email: this.personales['email'],
            nombre: this.personales['nombre'],
            tarjeta: this.personales['tarjetaprofe'],
            foto: per,
            instituto_pregrado: this.academicos['instituto_pregrado'],
            perfil: this.academicos['perfil'],

            //archivos: success
          }}).subscribe(data=>{
            swal('success',''+data['mensaje'],'success');
            
          });
      })
      
        /*
        this.db.collection('abogados').doc(this.personales['cedula']).set({personales: Object.assign({},this.personales),academicos: Object.assign({},this.academicos),
        foto: per,
        archivos: enlaces
          }).catch(e=>{
            sweet("error",""+e,"error");
        });
        */
      });
    
  
    })
   
  
    
      //
  }
  getAb(email){
    /*
    this.db.collection('abogados',ref => ref.where('personales.email','==', email)).valueChanges().subscribe(data=>{
      this.get_abogado = data;
      console.log(this.get_abogado);
      
    })
    */
   var verificado = new Promise((resolve,reject) => {
    this.config.http.get(this.config.url+'welcome/get_user',{params:{email: email}}).subscribe(data=>{
      this.get_abogado = data['mensaje'][0];
      resolve();
     })
   });
   return verificado;
   
  }
  generar_archivos(){
    var generar = new Promise((resolve,reject)=>{
      
      var finish = false;
     // console.log(this.archivos);
      this.archivos.forEach(element=>{
        console.log(element);
       this.storage.upload('/'+this.personales['cedula']+'/'+element['rama'], element['archivo']).catch(err=> console.log(err)).then(d=>{console.log(d);
        
            d.ref.getDownloadURL().then(dat=>{
              this.enlaces.push(this.enlaces,dat);

            });
        });
    
      });
      resolve(JSON.stringify(this.enlaces));
    })

    return generar;
  }
}
