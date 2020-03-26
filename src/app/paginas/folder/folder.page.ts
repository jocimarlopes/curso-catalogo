import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { UrlService } from '../../provider/url.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  produtos: any;

  constructor(public http: Http, public serviceUrl: UrlService, private activatedRoute: ActivatedRoute) {
    this.listProdutos()
   }

  ngOnInit() {
  }
  listProdutos() {
    this.http.get(this.serviceUrl.getUrl()+"listDados.php").pipe(map(res => res.json()))
    .subscribe(
      listDados => {
        this.produtos = listDados;
      }
    );
  }

}
