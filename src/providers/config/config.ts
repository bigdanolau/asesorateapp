
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';


/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {
  public locaciones:any[] = [];
public departamentos;
public ramas:any[] ;
public ciudades;
public ramascompletas;
public url;
  constructor(public db:AngularFirestore,public http: HttpClient) {
    this.url = "https://app.asesorateapp.com/index.php/";
    
  }
  
  getDepartamentos(){
    /*this.db.collection('locaciones').get().subscribe(d=>{
      d.docs.forEach(d=>{
        this.departamentos.push(d.id);
      });
      console.log(this.departamentos);
     });
     */
      this.http.get(this.url+'/welcome/get_departamentos').subscribe(data=>{
        this.departamentos = data;
        
        
      });
    
  }
  getCiudades(id){   
    /* 
    this.ciudades = [];
    if(dato){
      this.db.collection('locaciones').doc(dato).valueChanges().subscribe(data=>{
       this.ciudades =  Object.keys(data).map(function(i){
        let person = data[i];
        // do something with person
        return person;
    });;
         
         
        
      })
    }
    
    
    */
   this.http.get(this.url+'/welcome/get_ciudades',{params:{id_ciudad:id}}).subscribe(data=>{
    this.ciudades = data;
    
    
  });
  }
  size(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// Get the size of an object
  getRamas(){
    
  } 
   uniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
  };
}
