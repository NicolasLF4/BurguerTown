import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PanelConfigComponent } from './components/panel-config/panel-config.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FuncionesComponent } from './components/funciones/funciones.component';


import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {path: 'menu', component: MenuComponent},
    {path: 'configuracion', component: PanelConfigComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'funciones', component: FuncionesComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
    LoginComponent,
    PanelConfigComponent,
    NavbarComponent,
]