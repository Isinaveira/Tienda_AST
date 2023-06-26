import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductosComponent } from './components/productos/productos.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './components/users/users.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { CreateUserComponent } from './components/create-user/create-user.component';






@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    UsersComponent,
    AccesoComponent,
    CreateUserComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {path: '', component: AccesoComponent},
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

