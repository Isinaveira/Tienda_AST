import { Component, OnInit } from '@angular/core';
import {ProductosService} from '../../services/productos.service'
import { NgForm } from '@angular/forms';
import { Productos } from 'src/app/models/productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{
  public filtro;
  public typesearch;
  public selectedFile;
  public imageSrc;
  constructor(public productosService: ProductosService){}

  ngOnInit(): void{
    this.getProductos() //para que de inicio ya muestre los productos
  }

  getProductos(){
    this.productosService.getProductos().subscribe(
      res => {
        this.productosService.productos = res;
      },
      err =>console.log(err)

    )
  }

  onSubmit(productForm): void {
    console.log(this.productosService.selectedImage);
      if (productForm.valid) {
        const productData = new FormData();
        productData.append('name', this.productosService.productoSelected.name);
        productData.append('description', this.productosService.productoSelected.description);
        productData.append('price', this.productosService.productoSelected.price.toString());
        productData.append('quantity', this.productosService.productoSelected.quantity.toString());
        productData.append('image', this.productosService.selectedImage);
        this.productosService.createProducto(productData).subscribe(
          (response) => 
          {
            console.log(response); 

            this.getProductos();
          },
          (error) => console.log(error)
        );
      }
  }

  editProducto(producto: Productos){
    this.productosService.productoSelected=producto; //para que se rellenen los datos en el formulario
  }

  onFileSelected(event): void{
    this.productosService.selectedImage = event.target.files[0];
  }

  deleteProducto(id: string){
    if (confirm('Seguro que quieres eliminarlo?')){
       this.productosService.deleteProducto(id).subscribe(
         (res) => {
           this.getProductos();
           window.alert("Se ha borrado correctamente el producto");
         },
         (err) => console.error(err)
       );
      
    } 
  }
  getImageUrl(imageName): string {
    // Formar la URL completa de la imagen a partir del nombre
    return `${this.productosService.URL_API}/get-image/${imageName}`;
  }


  resetForm(form: NgForm){
   form.reset()
   this.getProductos()
  }

  search(searchForm){
    
    if(searchForm.value.typesearch=="name"){
        if(searchForm.value.filtrotxt){
        this.productosService.get_Productos(searchForm.value.filtrotxt).subscribe(
        res=>{
          
            this.productosService.productos=res;
        },
        error=> console.log(error)
      );
      }else if(searchForm.value.filtrotxt==null || searchForm.value.filtrotxt==''){ //en caso de q no haya nada en el buscador y se le de al boton, muestra todos
        this.productosService.getProductos().subscribe(
          res => {
            this.productosService.productos = res;
          },
          err =>console.log(err)
    
        )
      }
    }else if(searchForm.value.typesearch=="id"){
      
      if(searchForm.value.filtrotxt){
        this.productosService.getProducto(searchForm.value.filtrotxt).subscribe(
        res => {
          const array: Productos[] = [];
          const product: Productos = new Productos();
          product._id = res._id;
          product.description = res.description;
          product.name = res.name;
          product.quantity = res.quantity;
          product.price = res.price;
          array.push(product);
          this.productosService.productos = array;
        }
      );
      }else if(searchForm.value.filtrotxt==null || searchForm.value.filtrotxt==''){ //en caso de q no haya nada en el buscador y se le de al boton, muestra todos
        this.productosService.getProductos().subscribe(
          res => {
            this.productosService.productos = res;
          },
          err =>console.log(err)
    
        )
      }
    }
    
    
    
  }

  
}
