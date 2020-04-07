import { Component, OnInit } from '@angular/core';
import { Validator, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { UrlService } from '../../provider/url.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.page.html',
  styleUrls: ['./cadastro-produtos.page.scss'],
})
export class CadastroProdutosPage implements OnInit {

  postagem: any;
  nome: any;
  valor: any;
  quantidade: any;
  descricao: any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public http: Http, public urlService: UrlService) { 
    this.postagem = this.formBuilder.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      quantidade: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  postarProduto() {
    if(this.nome == undefined || this.valor == undefined || this.quantidade == undefined || this.descricao == undefined) {
      this.urlService.alertas('Atenção', 'Preencha todos os campos.');
    }else{

      this.postData(this.postagem.value) 
      .subscribe (
        data => {
          console.log('Inserido com Sucesso!');
        },
        err => {
          console.log('Erro ao inserir produto.');
        }
      )
    }
  }

  postData(valor: any) {

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.urlService.url + "insertProduto.php", valor, {
      headers: headers,
      method: "POST"
    }).pipe(map(
      (res: Response) => { return res.json(); }
    ));
  }

  ngOnInit() {
  }

}
