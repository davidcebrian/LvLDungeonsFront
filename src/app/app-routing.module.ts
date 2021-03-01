import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetallesUsuarioComponent } from './components/detalles-usuario/detalles-usuario.component';

const routes: Routes = [
  {path: 'inicio', redirectTo: '', pathMatch: 'full'},
  {path: '', component: InicioComponent},
  {path: 'lobby', component: LobbyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'detalles', component: DetallesUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
