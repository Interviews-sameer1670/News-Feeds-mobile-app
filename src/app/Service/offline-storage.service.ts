import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class OfflineStorageService {

  constructor(public storage: Storage) {
    console.log('Storage service called!',storage);
   }

   saveAPIData(key: string, value: string){
    //console.log('key => value',key+'=>'+value);
    try{
          this.storage.set(key, value);
          //alert('inside saveAPIdata');
        return true;
    }
    catch(e){
      alert('Error in saving into database:'+e);
      return false;
    }
   }

   retrieveAPIData(key: string){
     //await console.log('data inside storage is:',this.storage.get(key));
     try{
          //debugger;
            //alert('inside retriveAPIdata');
            return this.storage.get(key);
     }
     catch(e){
       alert('Error occurred in retrieving data:'+e);
       return null;
     }
   }
}
