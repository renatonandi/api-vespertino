import { Injectable } from '@angular/core';
import { GlobalServiceService } from 'src/app/global-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private globalService: GlobalServiceService) { }

  public getToken(email: string, password: string){
     this.globalService.getToken(email, password).subscribe(() => {
        console.log('Token:', this.globalService.token); 
      });
  }

}
