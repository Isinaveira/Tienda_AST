import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {
  create: boolean;
  constructor(public usersService: UsersService){}



  controlAcceso(){
    this.usersService.getUser(this.usersService.user_id).subscribe(
      {
        next: (res => {
          if(res == null){ 
            this.usersService.userSelected.role = 'empty';
            alert("NO ESTÁS DE ALTA EN EL SISTEMA");
            return;
          } else this.usersService.userSelected = res;

          if(this.usersService.userSelected.role == this.usersService.user_types.CLIENT) alert('NO PUEDE ENTRAR. USTED NO ES ADMIN');

        }),
        error: (error => console.log(error))
      }
    );
  }

}
