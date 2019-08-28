import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NetworkService } from './Service/network.service';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public isConnected:boolean = false;
  constructor(
    public toastController: ToastController,
    private networkService: NetworkService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      //this.statusBar.styleDefault();
      //this.statusBar.styleLightContent();
      //this.statusBar.overlaysWebView(false);
      //this.statusBar.backgroundColorByName("blue");
      this.splashScreen.hide();

      //check for network
      this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
        this.isConnected = connected;
        console.log('Network Status:',this.isConnected);
        //environment.network_status = this.isConnected;
        if(!this.isConnected){
          //environment.network_status = this.isConnected;
          this.presentToast('network disconnected');
        }
        else{
          this.presentToast('network connected!');
          //environment.network_status = this.isConnected;
        }
      });
    });
  }
}
