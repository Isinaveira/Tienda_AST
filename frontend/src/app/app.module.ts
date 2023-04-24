import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductosComponent } from './components/productos/productos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComprasComponent } from './components/compras/compras.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './components/users/users.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    NavbarComponent,
    ComprasComponent,
    UsersComponent
  ],
  imports: [
    RouterModule.forRoot([
      {path: 'compras', component: ComprasComponent },
      {path: 'usuarios', component: UsersComponent},
      {path: 'productos', component: ProductosComponent}
    ]),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

