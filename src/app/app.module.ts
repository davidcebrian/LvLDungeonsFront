import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorService } from './services/http-interceptor.service';


import { AppComponent } from './app.component';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { EntidadesComponent } from './components/entidades/entidades.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    GetUsersComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetallesComponent,
    TablaComponent,
    FormularioComponent,
    EntidadesComponent,
    LoginComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
