import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private service: LoginService) { }

  public login = {} as Login;
  
  
  ngOnInit(): void {}

  public buttonLogin(): void {
    if (this.login.email && this.login.password) {
      this.service.getToken(this.login.email, this.login.password);
    }
  }

}
