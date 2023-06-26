import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComprasComponent } from './components/compras/compras.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompraProductoComponent } from './components/compra-producto/compra-producto.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { ConsultaComprasComponent } from './components/consulta-compras/consulta-compras.component';
import { CommonModule } from '@angular/common';
import { NgForOf } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ComprasComponent,
    CompraProductoComponent,
    AccesoComponent,
    ConsultaComprasComponent
  ],
  imports: [
    RouterModule.forRoot([
      {path: '', component: AccesoComponent},
      {path: 'compras', component: ComprasComponent},
      {path: 'compras/producto/:id', component: CompraProductoComponent},
      {path: 'historial-compras/:id_user', component: ConsultaComprasComponent}
    ]),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    CommonModule,
    NgForOf,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
