import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { PanelConfigComponent } from './components/panel-config/panel-config.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FuncionesComponent } from './components/funciones/funciones.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {path: '', component: InicioComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent,
        children: [
            {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
            {path: 'configuracion', component: PanelConfigComponent, canActivate: [AuthGuard]},
            {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
            {path: 'funciones', component: FuncionesComponent, canActivate: [AuthGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
    PanelConfigComponent,
    MenuComponent,
    NavbarComponent,
    UsuariosComponent,
    FuncionesComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    InicioComponent
]