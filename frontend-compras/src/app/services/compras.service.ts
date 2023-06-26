import { Injectable } from '@angular/core';
import { Productos } from '../models/productos';
import { Compras } from '../models/compras';
import { UsersService } from './users.service';
import { ProductosService } from './productos.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  URL_API = 'http://localhost:3002/api/compras';
  
  COMPRA_MESSAGE = {
    message : "",
    compra : ""
  }
  productos!: Productos[];
  compras!: Compras[];
  compra = new Compras();
  compraSelected: Compras = {
      id_producto: "",
      producto: "",
      quantity: 0,
      price: 0,
      name: "",
      direction: "",
      id_user: ""
  };
  constructor(
    public usersService: UsersService,
    public productosService: ProductosService,
    private http: HttpClient
  ) { }

  
  gestionaCompra(producto: Productos){
    if(producto._id){
      this.compra.id_producto = producto._id;
    }
    this.compra.producto = producto.name;
    this.compra.price = producto.price;    
    if(this.usersService.user_role == this.usersService.user_types.CLIENT){
      if(this.compra.quantity > producto.quantity){
        alert("LA COMPRA SUPERA LA CANTIDAD DEL PRODUCTO EN STOCK");
      }else{
        producto.quantity = producto.quantity - this.compra.quantity;
        var formData = new FormData();
        if(producto._id){
          formData.append("_id", producto._id);
          formData.append("name",producto.name);
          formData.append("description", producto.description);
          formData.append("quantity", producto.quantity.toString());
          formData.append("price", producto.price.toString());
          this.productosService.editProducto(formData);
          const compra = this.compra;
          this.comprar(compra);
          //alert("COMPRA REALIZADA CON EXITO")
        }

      }
    }else{
      alert("ERES UN ADMIN O NO ESTÁS EN LA BBDD");
    }
    

  }

  getCompras(id_user: string):Observable<Compras[]>{
    return this.http.get<Compras[]>(`${this.URL_API}/historial-compras/${id_user}`);
  }

  comprar(compra: Compras){
    //console.log(compra);
    fetch(this.URL_API,{
      method: 'POST',
      body: JSON.stringify(compra),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( response =>response.json())
    .then( data => { 
      {alert(`Se ha realizado la compra exitosamente con ID COMPRA: ${data.compra}`)}
    })
    .catch(
      error => {
        //console.log(error);
        window.alert("Se ha producido un error");
      }
    );
  }
  
  editCompra(compra: FormData){
    fetch(`${this.URL_API}/${compra.get('_id')}`,{
      method:'PUT',
      body: compra,
    }).then( response =>{
      window.alert("Se ha editado correctamente la compra!");
      console.log(response);
    }).catch(
      error => console.log(error)
    )

  }

  getCompra(id: string):Observable<Compras>{
    return this.http.get<Compras>(`${this.URL_API}/${id}`);
  }

  getCompraByName(filtro: string):Observable<Compras[]>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get<Compras[]>(this.URL_API+'/filtro/'+filtro,{headers:headers});
  }

  getIdProducto(id: string){
    return this.http.get(`${this.URL_API}+'/producto/'+${id}`);
  }

  deleteCompra(_id: string){
    this.getCompra(_id).subscribe((compra: Compras) => {
      const idproducto = compra.id_producto;
      const cantidad = compra.quantity;
      this.productosService.getProducto(idproducto).subscribe( res => {
        const productData = new FormData();
        if(res._id){
          productData.append('_id', res._id);
        }
        productData.append('name', res.name);
        productData.append('description', res.description);
        productData.append('price',res.price.toString());
        const newquantity = res.quantity + cantidad; //actualizacion de la cantidad del articulo
        productData.append('quantity', newquantity.toString());
        if(res.image){
          productData.append('image', res.image);
        }
        this.productosService.editProducto(productData);
        
      })

      
    })
    
    return this.http.delete(`${this.URL_API}/${_id}`);
  }


}

  

