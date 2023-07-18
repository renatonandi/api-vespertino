import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  constructor(private service: UserService) {}

  public users!: User[];

  public user = {} as User;



  ngOnInit(): void {
    this.service.emitEvent.subscribe({
      next: (res: any) => {
        this.user = res[0];
      },
    });
  }
  
  public getUsersByName() {
    this.service.getUsersByName(this.user.name).subscribe((data) => {
      this.users = data;
    })
  }

  public cancela(){
    this.user = {} as User;
  }

  public saveUser(){
    if(this.user.id){
      this.service.update(this.user).subscribe((data) => {
        this.user = {} as User;
      })
    }else{
      this.service.insert(this.user).subscribe((data) => {
        this.user = {} as User;
      })
    }
  }
}
