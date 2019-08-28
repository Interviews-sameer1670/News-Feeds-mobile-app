import { Component, OnInit } from '@angular/core';
import { FetchNewsService } from '../fetch-news.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {

  articleDetail: any;

  constructor(private fetchNewsService: FetchNewsService, private iab: InAppBrowser) { }

  ngOnInit() {
    this.articleDetail = this.fetchNewsService.currentArticle;
    console.log(this.fetchNewsService.currentArticle);
  }

  goToNewsSource(url){
    let target = "_self";
    const browser = this.iab.create(url,target);

    browser.executeScript(url);

    //browser.insertCSS(...);
    //browser.on('loadstop').subscribe(event => {
      //browser.insertCSS({ code: "body{color: red;" });
    //});

    //browser.close();
  }

}
