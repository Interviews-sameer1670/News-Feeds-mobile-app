import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../Service/network.service';
import { OfflineStorageService } from '../Service/offline-storage.service';
import { FetchNewsService } from '../fetch-news.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public key: string = 'OFFLINE_KEY';
  public value: any;
  public retrivedData: any;

  constructor(public toastController: ToastController,
              private networkService: NetworkService,
              private fetchNewsService: FetchNewsService,
              private offlineStorage: OfflineStorageService) { }

  ngOnInit() {
    //this.getDataFromAPI();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      position: 'middle',
      duration: 2000,
    });
    toast.present();
  }
  getDataFromAPI(){
      this.fetchNewsService.getNews('top-headlines?country=in').subscribe(data => {
      this.offlineStorage.saveAPIData(this.key, JSON.stringify(data));
    });

  }

  getData(){
    this.offlineStorage.retrieveAPIData(this.key).then(data =>{
      this.retrivedData = JSON.parse(data);
      //console.log('retrieved data from storage: '+data);
      alert('getdata called');
    });
  }

  async doRefresh(event: any) {
    alert('Begin async operation');
    await this.getDataFromAPI();
    await this.getData();
    await event.target.complete();
    /*let timeout = setTimeout(() => {
      alert('Async operation has ended');
      event.target.complete();
      clearTimeout(timeout);
    }, 2000);*/
  }
}
