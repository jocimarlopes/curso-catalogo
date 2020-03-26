import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  url: string = "http://localhost:8088/php/";


  constructor() { }

  getUrl() {
    return this.url;
  }


}


