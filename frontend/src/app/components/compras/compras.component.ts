import { Component } from '@angular/core';
import { ProductosComponent } from '../productos/productos.component';
import { ComprasService } from 'src/app/services/compras.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {

  constructor(public comprasService: ComprasService, public productosService: ProductosService){}
  ngOnInit(): void{
    this.productosService.getProductos().subscribe( 
      res => {
        this.comprasService.productos = res;
    }, err => console.log(err)
    ); //para que de inicio ya muestre los productos

  }
}
