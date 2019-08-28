import { Component, OnInit } from '@angular/core';
import { FetchNewsService } from '../fetch-news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { OfflineStorageService } from '../Service/offline-storage.service';
import { NetworkService } from '../Service/network.service';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  fetchedNews: any;
  newsFeedKey: string = environment.newsFeedKey;
  public isConnected: boolean = true;

//private activatedRoute: ActivatedRoute
  constructor(public toastController: ToastController,
              private platform: Platform,
              private fetchNewsService: FetchNewsService, 
              private router: Router,
              private offlineStorageService: OfflineStorageService,
              private networkService: NetworkService,
              private changeDetectorRef: ChangeDetectorRef) {
                //this.retriveData();
                //alert('constructor called');
                this.checkNetwork();
              }

  ngOnInit() {
    //alert('inside init');
    //this.checkNetwork();
    this.saveAPIdata();
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }

  checkNetwork(){
      this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
      if(!this.isConnected){
        this.retriveData();
      }
      else{
        this.saveAPIdata();
      }
      //this.saveAPIdata();
    });
  }

  saveAPIdata(){
    this.platform.ready().then(() => {
        //check for network
            if(!this.isConnected){
              //alert('Network Status inside news feed:'+this.isConnected);
              this.retriveData();
            }
            else{
              //alert('Network Status inside news feed:'+this.isConnected);
              //save fetched data in offline storage
             this.fetchNewsService.getNews('top-headlines?country=in')
              .subscribe(data => {
                
                console.log('fetched data because network on',data);
                //alert('featured news key'+this.newsFeedKey);
                let success = this.offlineStorageService.saveAPIData(this.newsFeedKey, JSON.stringify(data));
                if(success){
                  //alert('data saved successfully!');
                  this.retriveData();
                }
              },
              (err) => {
                console.log('error in http request',err.status);
                this.presentToast('error occurred, falling back to local storage');
                this.retriveData();
              });
            }
      });
  }

  ionViewWillEnter(){
    ////alert('ion view will enter')
    //this.retriveData();
  }

   retriveData(){
    try{
      //retrieve data from offline-storage
       this.offlineStorageService.retrieveAPIData(this.newsFeedKey).then(data => {
        //console.log('inside retrieving featured news',data);
        //alert(JSON.parse(data));
        if(data == null || data == '' || data == undefined){
          this.presentToast('You need to connect to a network to load news for the first time!');
        }
        else{
          this.fetchedNews = JSON.parse(data);
          //this.changeDetectorRef.detectChanges();
        }
      });
    }
    catch(e){
      //alert('data not retrived'+e);
    }
  }

  goToNewsDetail(article: any){
    this.fetchNewsService.currentArticle = article;
    this.router.navigate(['/news-detail']);
  }

  async doRefresh(event: any) {
    //alert('Begin async operation');
    await this.saveAPIdata();
    let timeout = setTimeout(() =>{
      event.target.complete();
      clearTimeout(timeout);
    },2000);
  }

  ngOnDestroy(){
    //alert('view destroyed!')
  }

}
