import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController ,  AlertController} from 'ionic-angular';
import { Geolocation} from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map:any;

  locais:any = [];

  local: any = {
    nome: String,
    atividade: String,
    horario: String,
    latitude: Number,
    longitude: Number,
  };

  latitude:Number;
  longitude:Number;

  constructor(public navCtrl: NavController, public geolocation:Geolocation, public alertCtrl: AlertController,private storage: Storage) {

  }

  ionViewDidLoad(){
    this.loadMap();

  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Informações do Local',
      inputs: [
        {
          name: 'nome',
          placeholder: 'aonde você está?'
        },
        {
          name: 'atividade',
          placeholder: 'o que você está fazendo?',
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'REGISTRAR',
          handler: data => {

            this.salvar(data.nome.toString(), data.atividade.toString());

            // if (User.isValid(data.username, data.password)) {
            //   // logged in!
            // } else {
            //   // invalid login
            //   return false;
            // }
          }
        }
      ]
    });
    alert.present();
  }

  salvar(nome,atividade){

    var local;
    // var local = {nome,atividade,marker.latitude,marker.longitude};


    this.local.nome = nome;
    this.local.atividade = atividade;

    // console.log("HERE           " + this.latitude);
    this.local.latitude = this.map.getCenter().lat();
    this.local.longitude = this.map.getCenter().lng();
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.local.horario = localISOTime;


      this.locais.push(this.local);



    this.storage.set('local', this.locais);

    console.log(this.locais);

  }


  loadMap(){
    this.geolocation.getCurrentPosition().then((position)=>{
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);




    },function(error){
      console.log(error.toString());
      ///TODO: ASK USER IF HE WANT TO ACTIVE GPS

    }).then((position)=>{
      this.loadMarkerIfExists();


    });


  }


  loadMarkerIfExists(){ //Fill the vector with the stored object if exists.

    this.storage.get('local').then((val) => {
      if(val == null){
        return;
      }
      console.log(val);
      this.locais = val;


      for (var i = 0; i < this.locais.length; i++) {
        console.log(this.locais.length.toString());
        var marker = new google.maps.Marker({
          map:this.map,
          animation: google.maps.Animation.DROP,
          position:{
            lat: this.locais[i].latitude,
            lng: this.locais[i].longitude,
          }
        });


      }

    },function(error){
      console.log(error.toString());
      return;
    });


  }

  addMarker(){
    var marker = new google.maps.Marker({
      map:this.map,
      animation: google.maps.Animation.DROP,
      position:this.map.getCenter()
    });

    let content = "<h4>Local Atual!</h4>";
    this.addInfoWindow(marker,content);



  }

  addInfoWindow(marker,content){
    let infoWindow = new google.maps.InfoWindow({
      content:content
    });
    google.maps.event.addListener(marker,'click',()=> {
      infoWindow.open(this.map,marker);

     console.log(this.map.getCenter());


      this.presentPrompt();

    });
  }

}
