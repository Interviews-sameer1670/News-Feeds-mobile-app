import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class FetchNewsService {

  currentArticle: any;

  constructor(private http: HttpClient) { }

  getNews(url){
    //console.log(url);
    try{
      return this.http.get(`${API_URL}/${url}&apikey=${API_KEY}`);
    }
    catch(e){
      return e;
    }
  }
}
