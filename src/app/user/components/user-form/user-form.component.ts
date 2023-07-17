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

  public edit: boolean = false;

  public index: number = -1;

  public user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    roles: '',
  };

  ngOnInit(): void {
    this.service.emitEvent.subscribe({
      next: (res: any) => {
        this.user = res[0];
        this.index = res[1];
        this.edit = true;
      },
    });
  }
  
  public getUsersByName(name: string) {
    this.service.getUsersByName(name);
  }

  public cancela() {
    this.user = {
      id: 0,
      name: '',
      email: '',
      password: '',
      roles: '',
    };
    this.edit = false;
  }
}
