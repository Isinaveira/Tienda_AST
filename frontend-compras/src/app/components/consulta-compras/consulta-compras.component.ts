import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras.service';
import { Compras } from 'src/app/models/compras';
import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-consulta-compras',
  templateUrl: './consulta-compras.component.html',
  styleUrls: ['./consulta-compras.component.css']
})
export class ConsultaComprasComponent implements OnInit{

  compras!: Compras[];
  typesearch!: string;
  filtro!:any;
  constructor(public usersService: UsersService, public comprasService: ComprasService){}


  ngOnInit(){
    this.getCompras();
  }

  onSubmit(comprasForm: NgForm){
    if (comprasForm.valid) {
      const compraData = new FormData();
      compraData.append('_id', this.comprasService.compraSelected.name);
      compraData.append('id_producto', this.comprasService.compraSelected.id_producto);
      compraData.append('producto', this.comprasService.compraSelected.producto);
      compraData.append('quantity', this.comprasService.compraSelected.quantity.toString());
      compraData.append('price', this.comprasService.compraSelected.price.toString());
      compraData.append('name', this.comprasService.compraSelected.name);
      compraData.append('direction', this.comprasService.compraSelected.direction);
      compraData.append('id_user', this.comprasService.compraSelected.id_user);
      this.comprasService.editCompra(compraData)
    }
  }
  
  
  getCompras(){
    this.comprasService.getCompras(this.usersService.user_id).subscribe(
      res => {
        this.comprasService.compras = res;
      },
      err =>console.log(err)

    )
  }
  editCompra(compra: Compras){ 
    this.comprasService.compraSelected = compra;
  }
  
  deleteCompra(id_compra: any){
    if (confirm('Seguro que quieres eliminarlo?')){
      this.comprasService.deleteCompra(id_compra).subscribe(
        (res) => {
          this.getCompras();
          window.alert("Se ha borrado correctamente la compra");
        },
        (err) => console.error(err)
      );
     
   } 
  }
  
  search(searchForm: NgForm){
    
    if(searchForm.value.typesearch=="name"){
      
        if(searchForm.value.filtrotxt){
          
        this.comprasService.getCompraByName(searchForm.value.filtrotxt).subscribe(
        res=>{
            console.log(res);
            this.comprasService.compras = [...res];
        },
        error=> console.log(error)
      );
      }else if(searchForm.value.filtrotxt==null || searchForm.value.filtrotxt==''){ //en caso de q no haya nada en el buscador y se le de al boton, muestra todos
        this.comprasService.getCompras(this.usersService.user_id).subscribe(
          res => {
            this.comprasService.compras = [...res];
          },
          err =>console.log(err)
    
        )
      }
    }else if(searchForm.value.typesearch=="id"){
      if(searchForm.value.filtrotxt){
        this.comprasService.getCompra(searchForm.value.filtrotxt).subscribe(
        res => {
          const array: Compras[] = [];
          const compra: Compras = new Compras();
          compra._id = res._id;
          compra.name = res.name;
          compra.direction = res.direction;
          compra.id_producto=res.id_producto;
          compra.producto=res.producto;
          compra.quantity = res.quantity;
          compra.price = res.price;
          compra.id_user= res.id_user;
          array.push(compra);
          this.comprasService.compras = [...array];
          //console.log(this.comprasService.compras);
         
        }
      );
      }else if(searchForm.value.filtrotxt==null || searchForm.value.filtrotxt==''){ //en caso de q no haya nada en el buscador y se le de al boton, muestra todos
        this.comprasService.getCompras(this.usersService.user_id).subscribe(
          res => {
            this.comprasService.compras = [...res];
          },
          err =>console.log(err)
    
        )
      }
    }
    
    
    
  }

  resetForm(form: NgForm){
    form.reset()
    this.getCompras()
   }
}
