import { Component, OnInit } from '@angular/core';
import { ParentsLogin, AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  parentslist: ParentsLogin = {
    username: 'demo',
    password: '1234',
    email: 'asd@gmail.com'
  };

  constructor(private autsService: AuthenticationService, private route: ActivatedRoute,
    private loadingController: LoadingController, private nav: NavController ){}

  parentsListID = null;
  ngOnInit() {
    this.parentsListID = this.route.snapshot.params['id'];
    if(this.parentsListID){
      this.registerParents();
    }
  }

  async registerParents(){
    const loading = await this.loadingController.create({
      message: 'Registrando Padre...'
    });
    await loading.present();

    if(!this.parentsListID){
        this.autsService.registerParents(this.parentslist).then(() => {
        loading.dismiss();
        this.nav.navigateBack('login');
      })
    }

  }
}
