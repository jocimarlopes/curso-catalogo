import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { UrlService } from 'src/app/provider/url.service';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  senha: string;

  constructor(
    public alertCtrl: AlertController, 
    public urlService: UrlService, 
    public http: Http, 
    public navCtrl: NavController, 
    public loading: LoadingController) {

      this.email = 'lopes.jocimar@gmail.com';
      this.senha = '123123';

     }

  ngOnInit() {
  }
  async logar() {
    if(this.email == undefined || this.senha == undefined) {
      
      this.urlService.alertas('Atenção', 'Preencha todos os campos')

    }else {

      const load = await this.loading.create({
        spinner: 'dots',
        message: 'Aguarde..'
      });
      await load.present();

      this.http.get(this.urlService.getUrl()+'login.php?email='+this.email+'&senha='+this.senha).pipe(map(res => res.json()))
      .subscribe(
        data => {
          if(data.msg.logado == 'sim') {
            if(data.dados.status == 'Ativo') {

              load.dismiss();

              this.navCtrl.navigateBack('folder');

            }else{
              load.dismiss();

              this.urlService.alertas('Atenção', 'Usuário desativado.<br><a href="#">Fale Conosco</a>')
            }

          }else{
            load.dismiss();

            this.urlService.alertas('Atenção', 'Usuário ou senha inválidos!');
          }
        }
      );
    };
  }

}
