
import { Injectable } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
public userId;
  constructor(public uniqueDeviceID: UniqueDeviceID) {
    this.uniqueDeviceID.get()
    .then((uuid: any) => this.userId = uuid)
    .catch((error: any) => console.log(error));
    console.log(this.userId);
    
  }

}
