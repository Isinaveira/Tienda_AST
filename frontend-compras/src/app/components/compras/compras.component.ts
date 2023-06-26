import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Productos } from 'src/app/models/productos';
import { ComprasService } from 'src/app/services/compras.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {

  typesearch!: string;
  filtro!:any;
  constructor(public comprasService: ComprasService, public productosService: ProductosService, public usersService: UsersService){}
  ngOnInit(): void{
    this.productosService.getProductos().subscribe( 
      res => {
        this.comprasService.productos = res;
    }, err => console.log(err)
    ); //para que de inicio ya muestre los productos

  }

  search(searchForm: NgForm){
    
    if(searchForm.value.typesearch=="name"){
      console.log("1er if")
        if(searchForm.value.filtrotxt){
        this.productosService.get_Productos(searchForm.value.filtrotxt).subscribe(
        res=>{
          console.log(res);
          
            this.comprasService.productos=res;
        },
        error=> console.log(error)
      );
      }else if(searchForm.value.filtrotxt==null || searchForm.value.filtrotxt==''){ //en caso de q no haya nada en el buscador y se le de al boton, muestra todos
        this.productosService.getProductos().subscribe(
          res => {
            this.comprasService.productos = res;
          },
          err =>console.log(err)
    
        )
      }
    }else if(searchForm.value.typesearch=="id"){
      
      if(searchForm.value.filtrotxt){
        this.productosService.getProducto(searchForm.value.filtrotxt).subscribe(
        res => {
          console.log(res)
          const array: Productos[] = [];
          const product: Productos = new Productos();
          product._id = res._id;
          product.description = res.description;
          product.name = res.name;
          product.quantity = res.quantity;
          product.price = res.price;
          product.image = res.image;
          array.push(product);
          this.comprasService.productos = array;
        }
      );
      }else if(searchForm.value.filtrotxt==null || searchForm.value.filtrotxt==''){ //en caso de q no haya nada en el buscador y se le de al boton, muestra todos
        this.productosService.getProductos().subscribe(
          res => {
            this.comprasService.productos = res;
          },
          err =>console.log(err)
    
        )
      }
    }
    
    
    
  }


}
