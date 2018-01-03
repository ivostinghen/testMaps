import {Component, ViewChild} from '@angular/core';
import { NavController,IonicPage, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import {HomePage} from "../home/home";
/**
 * Generated class for the LocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  user:any = {} ;
  locais :any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage, public events:Events){

  }





  ionViewDidLoad() {
    this.storage.get('local').then((val) => {
      if(val == null) return;
      this.locais = val;
      console.log(val);


    },function(error){
      console.log(error.toString());
      return;
    });

  }
  mapFocus(item){




    this.storage.set('focusMap', item).then((val) => {
      this.events.publish('reloadMap');
      this.navCtrl.pop();
    },function(error){
      console.log(error.toString());
      return;
    });





    // this.navCtrl.pop();
    //



  }

}
