import { AuthenticationService, ParentsLogin } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 


  parents: ParentsLogin = {
    username: 'demo',
    password: '12345',
    email: 'as@g.com'
  }

  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }
  
  user = null;
  ngOnInit() {
    this.user = this.route.snapshot.params['username'];
  }
 
  login() {
    console.log("entro a login");
    console.log(this.user);
    this.authService.login();

  }

  
 
}