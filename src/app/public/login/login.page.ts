import { AuthenticationService, ParentsLogin } from './../../services/authentication.service';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  parents: ParentsLogin = {
    username: null,
    password: null,
    email: null
  }
 
  listParents = null;
  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }
  
  
  ngOnInit() {
    this.authService.getParentsList().subscribe(res => {
      this.listParents = res;
    });
  }
 
  login() {
    console.log("entro a login");
    console.log(this.parents.username);

    
    console.log(JSON.stringify(this.listParents));

    for(let item in this.listParents){
      if(this.listParents.username == this.parents.username){
        console.log("OK");
        this.authService.login();
      }else{
        console.log("NOK");
      }
    }
    

  }

  
 
}