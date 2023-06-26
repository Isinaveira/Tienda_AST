import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Productos } from '../models/productos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  URL_API = 'http://localhost:3000/api/productos';
  
  productoSelected: Productos = {
    name:'',
    description:'',
    quantity:0,
    price:0,
    image :''
  };
  imagePreview!: string;
  selectedImage!: string;
  productos!: Productos[];
  
  constructor(private http:HttpClient) { 
    this.productoSelected=  new Productos();
  }
  

  getProductos(){
      return this.http.get<Productos[]>(this.URL_API);
  }

  getImageUrl(imageName: any): string {
    // Formar la URL completa de la imagen a partir del nombre
    return `${this.URL_API}/get-image/${imageName}`;
  }
  
  createProducto(formData: FormData){
    
    return this.http.post<any>(this.URL_API, formData);
  }

  deleteProducto(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);

  }
  
  getProducto(_id: string):Observable<Productos>{
    return this.http.get<Productos>(`${this.URL_API}/${_id}`);
  }

  editProducto(formData: FormData){
    
    fetch(`${this.URL_API}/${formData.get('_id')}`,{
      method: 'PUT',
      body: formData,
    }).then( response =>{
      console.log(response);
    }).catch(
      error => console.log(error)
    );
    
    //return this.http.put(`${this.URL_API}/${formData.get('_id')}`,formData)
  }

  selectProducto(producto: Productos){
    this.productoSelected = producto;
  }

  get_Productos(filtro:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.URL_API+'/filtro/'+filtro,{headers:headers});
  }
}
 