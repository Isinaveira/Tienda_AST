import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {

  tiposUsuario: any[] = [
    { value: 'client', label: 'cliente' },
    { value: 'admin', label: 'administrador'},
    // { value: 'option3', label: 'Option 3' }
  ];
  selectedUser: string = "";
  delete: boolean = false;
  constructor(public usersService: UsersService){}



  controlAcceso() : void {
    if(!this.delete) {
        this.usersService.getUser(this.usersService.user_id).subscribe(
          {
            next: (res => {
              if(res == null){ 
                alert("NO ESTÁS DE ALTA EN EL SISTEMA");
                return;
              } else this.usersService.userSelected = res;

            }),
            error: (error => alert("NO ESTÁS DADO DE ALTA EN EL SISTEMA. PROCEDE A CREAR UN USUARIO."))
          }
        );
      // this.usersService.getRole(this.usersService.user_id).subscribe(
      //   {
      //     next: (response => {
      //       if(response == this.usersService.user_types.CLIENT || response == this.usersService.user_types.ADMIN){
      //         this.usersService.user_role = response;
      //       }else{
      //         alert("NO ESTÁS DE ALTA EN EL SISTEMA");
      //       }
      //     }),
      //     error: (error => console.log(error))
      //   }
      // );
    } else {
      if (confirm('Seguro que quieres eliminarlo?')){
        this.usersService.deleteUser(this.usersService.user_id).subscribe(
          (res) => {
            window.alert("Se ha borrado correctamente el usuario");
          },
          (err) => console.error(err)
        );
       
     } else this.delete = false;
    }
  }

}
