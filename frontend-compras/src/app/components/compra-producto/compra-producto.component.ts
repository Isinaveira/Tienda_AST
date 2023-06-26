import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productos } from 'src/app/models/productos';
import { ComprasService } from 'src/app/services/compras.service';
import { ProductosService } from 'src/app/services/productos.service';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-compra-producto',
  templateUrl: './compra-producto.component.html',
  styleUrls: ['./compra-producto.component.css']
})
export class CompraProductoComponent implements OnInit{
  producto: any;
  typesearch!: string;
  filtro!:any;

  constructor(
    private route: ActivatedRoute, 
    public productosService: ProductosService,
    public comprasService: ComprasService,
    public usersService: UsersService
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      const id = params.get('id');
      console.log(id);
      if(id){
        this.productosService.getProducto(id).subscribe({
          next: (producto) => this.producto = producto,
          error: (error) => console.error(error)
        })
      }
    })
  }

  onSubmit(compraForm: NgForm){
    this.comprasService.gestionaCompra(this.producto);
  }
  
  compruebaCliente(compraForm: NgForm){
    this.usersService.getRole(this.comprasService.compra.id_user).subscribe({
      next: (response)=> {
        if(response == this.usersService.user_types.CLIENT){
          this.usersService.user_role = response;
          compraForm.form.controls['id_user'].setErrors(null);
          compraForm.form.setErrors({'invalid': true});
        }else{
          alert("No eres un cliente");
          compraForm.form.controls['id_user'].setErrors({'No eres cliente': true});
          compraForm.form.setErrors({'invalid': true});
        }
      },
      error: (error) =>  {
        alert("NO ERES UN USUARIO");
        compraForm.form.controls['id_user'].setErrors({'No se encuentra el usuario': true});
        compraForm.form.setErrors({'invalid': true});
      }
    });
    
  };

  checkQuantity(compraForm: NgForm){
    console.log(this.comprasService.compra.quantity);
    console.log(this.producto.quantity);
    if(this.comprasService.compra.quantity > this.producto.quantity){
      compraForm.form.controls['quantity'].setErrors({'La cantidad seleccionada es superior al stock': true});
      alert('La cantidad seleccionada es superior al stock ❌');
      compraForm.form.setErrors({'invalid': true});
    }else{
      compraForm.form.controls['quantity'].setErrors(null);
          compraForm.form.setErrors({'invalid': true});
    }
  }


  resetForm(form: NgForm){
    form.reset()
   }

}
