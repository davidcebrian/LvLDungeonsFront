import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetallesComponent } from './components/detalles/detalles.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {path: 'inicio', redirectTo: '', pathMatch: 'full'},
  {path: '', component: InicioComponent},
  {path: 'detalles', component: DetallesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
