import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
  locais :any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage){

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

}
