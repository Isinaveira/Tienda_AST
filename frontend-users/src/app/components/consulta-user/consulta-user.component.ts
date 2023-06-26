import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-consulta-user',
  templateUrl: './consulta-user.component.html',
  styleUrls: ['./consulta-user.component.css']
})
export class ConsultaUserComponent implements OnInit{
  
  role_selected= 'All';
  role_types = {
    CLIENT : 'client',
    ADMIN : 'admin',
    ALL: 'all'
  }
  constructor(public usersService: UsersService){}

  ngOnInit(): void{
    this.getUsers() //para que de inicio ya muestre los usuarios
  }

  getUsers(){
    this.usersService.getUsers().subscribe(
      res => {
        this.usersService.users = res;
      },
      err =>console.log(err)

    )
  }

  deleteUser(id: string){
    if (confirm('Seguro que quieres eliminarlo?')){
      this.usersService.deleteUser(id).subscribe(
        (res) => {
          this.getUsers();
          window.alert("Se ha borrado correctamente el producto");
        },
        (err) => console.error(err)
      );
     
   } 

  }
  
  search(){
    if(this.role_selected == this.role_types.ADMIN || this.role_selected == this.role_types.CLIENT){
      this.usersService.getUsersByRole(this.role_selected).subscribe(
        res => {
          this.usersService.users = res;
        },
        err => console.log(err)
      );
    }else{
      this.getUsers();
    }
  }

}
