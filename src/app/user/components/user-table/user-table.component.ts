import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit{
  constructor(private service: UserService) { }
  
  public users!: User[];

  
  ngOnInit(): void {
    this.service.listAll().subscribe((data)=> {
      this.users = data;
    });
  }

  public editaUser(user:User, i: number){
    this.service.userSelect(user, i);
  }

 



}
