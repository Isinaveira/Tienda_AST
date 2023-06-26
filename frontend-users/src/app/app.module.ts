import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// import { ComprasComponent } from './components/compras/compras.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CompraProductoComponent } from './components/compra-producto/compra-producto.component';
import { AccesoComponent } from './components/acceso/acceso.component';
// import { ConsultaComprasComponent } from './components/consulta-compras/consulta-compras.component';
import { CommonModule } from '@angular/common';
import { NgForOf } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ConsultaUserComponent } from './components/consulta-user/consulta-user.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccesoComponent,
    CreateUserComponent,
    ConsultaUserComponent
  ],
  imports: [
    RouterModule.forRoot([
      {path: '', component: AccesoComponent},
      {path: 'create-user', component: CreateUserComponent},
      {path: 'consulta-users', component: ConsultaUserComponent},
      // {path: 'historial-compras/:id_user', component: ConsultaComprasComponent}
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
