import { Component, OnInit } from '@angular/core';
import { FetchNewsService } from '../fetch-news.service';
import { Router } from '@angular/router';
import { OfflineStorageService } from '../Service/offline-storage.service';
import { environment } from 'src/environments/environment';
import { NetworkService } from '../Service/network.service';
import { Platform } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-featured-news',
  templateUrl: './featured-news.page.html',
  styleUrls: ['./featured-news.page.scss'],
})
export class FeaturedNewsPage implements OnInit {
  featuredArticles: any;
  featuredNewsKey : string = environment.featuredNewsKey;
  public isConnected:boolean = true;

  constructor(public toastController: ToastController,
              private platform: Platform,
              private splashScreen: SplashScreen,
              private fetchNewsService: FetchNewsService, 
              private router: Router,
              private offlineStorageService: OfflineStorageService,
              private networkService: NetworkService,
              private changeDetectorRef: ChangeDetectorRef) { 
               // this.retriveData();
               //this.saveAPIdata();
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
              //alert('Network Status inside featured news:'+this.isConnected);
              this.retriveData();
            }
            else{
              //alert('Network Status inside featured news:'+this.isConnected);
              //save fetched data in offline storage
              this.fetchNewsService.getNews('top-headlines?sources=google-news-in&pageSize=3&language=en')
              .subscribe(data => {
                //console.log('fetched data because network on',data);
                //alert('featured news key'+this.featuredNewsKey);
                let success = this.offlineStorageService.saveAPIData(this.featuredNewsKey, JSON.stringify(data));
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
    ////alert('ion view wiil enter!');
    //this.retriveData();
  }

   retriveData(){
    try{
      //alert('inside retreive data');
      //retrieve data from offline-storage
     this.offlineStorageService.retrieveAPIData(this.featuredNewsKey).then((data: any) => {
        //console.log('inside retrieving featured news',data);
        //alert(JSON.parse(data));
        if(data == null || data == '' || data == undefined){
          this.presentToast('You need to connect to a network to load news for the first time!');
        }
        else{
          this.featuredArticles = JSON.parse(data);
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

  hideSplashScreen(event: any){
    this.splashScreen.hide();
  }
  async doRefresh(event: any) {
    //alert('Begin async operation');
    this.splashScreen.hide();
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
