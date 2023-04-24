import { Injectable } from '@angular/core';
import { Productos } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  URL_API = 'http://localhost:3002/api/compras';
  
  productos: Productos[];
  constructor() { }
}
