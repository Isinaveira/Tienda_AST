import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Users } from '../../models/users'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  /*
  tiposUsuario: any[] = [
    { value: 'client', label: 'cliente' },
    { value: 'admin', label: 'administrador'},
    // { value: 'option3', label: 'Option 3' }
  ];
  */
  selectedUser!: string;
  id_user!: string;

  constructor(public usersService: UsersService){}

  crearUsuario(userForm: NgForm): void {
    if (userForm.valid) {
      if(this.selectedUser == this.usersService.user_types.ADMIN){
        this.usersService.userSelected.role = this.usersService.user_types.ADMIN;
        this.usersService.createUser();
      }else{
        this.usersService.userSelected.role = this.usersService.user_types.CLIENT;
        this.usersService.createUser();
      }     

    }
  }

}
