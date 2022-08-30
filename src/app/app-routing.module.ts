import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LiderComponent } from './components/lider/lider.component';
// import { AdminComponent } from './components/admin/admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { PanelConfigComponent } from './components/panel-config/panel-config.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FuncionesComponent } from './components/funciones/funciones.component';
// import { RegistrarMiembroComponent } from './components/registrar-miembro/registrar-miembro.component';
// import { MuelleComponent } from './components/muelle/muelle.component';
// import { TomarListaComponent } from './components/tomar-lista/tomar-lista.component';
// import { EditComponent } from './components/edit/edit.component';
// import { ContadorComponent } from './components/contador/contador.component';
// import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
// import { GrafsexoComponent } from './components/graficos/graficos.component';
// import { GrafedadesComponent } from './components/grafedades/grafedades.component';
// import { SuperpanelComponent } from './components/superpanel/superpanel.component';
// import { LoginComponent } from './components/login/login.component';
// import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
// import { PerfilComponent } from './components/perfil/perfil.component';
// import { SoligeneralComponent } from './components/soligeneral/soligeneral.component';
// import { SolieliminarComponent } from './components/solieliminar/solieliminar.component';
// import { AgregarIglesiaComponent } from './components/agregar-iglesia/agregar-iglesia.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { NavbarPanelComponent } from './components/navbar-panel/navbar-panel.component';
// import { EditIglesiaComponent } from './components/edit-iglesia/edit-iglesia.component';
// import { MonitoreoComponent } from './components/monitoreo/monitoreo.component';
// import { SolinivelComponent } from './components/solinivel/solinivel.component';
// import { SoliestudioComponent } from './components/soliestudio/soliestudio.component';
// import { EstudiandoComponent } from './components/estudiando/estudiando.component';
// import { InicioComponent } from './components/inicio/inicio.component';

// import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {path: 'menu', component: MenuComponent},
    {path: 'configuracion', component: PanelConfigComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'funciones', component: FuncionesComponent}
    // {path: 'solicitudes', component: SoligeneralComponent, canActivate: [AuthGuard]},
    // {path: 'estudiando', component: EstudiandoComponent, canActivate: [AuthGuard]},
    // {path: 'congregacion', component: EstadisticasComponent, canActivate: [AuthGuard]},
    // {path: 'graficos', component: GrafsexoComponent, canActivate: [AuthGuard]},
    // {path: 'monitoreo', component: MonitoreoComponent, canActivate: [AuthGuard]},
    // {path: 'muelle', component: MuelleComponent, canActivate: [AuthGuard]},
    // {path: 'nuevo', component: RegistrarMiembroComponent, canActivate: [AuthGuard]},
    // {path: 'tomar-lista', component: TomarListaComponent, canActivate: [AuthGuard]},
    // {path: 'login', component: LoginComponent},
    // {path: 'lider', component: LiderComponent, canActivate: [AuthGuard]},
    // {path: 'contador', component: ContadorComponent, canActivate: [AuthGuard]},
    // {path: 'editar-persona/:id', component: EditComponent, canActivate: [AuthGuard]},
    // {path: 'panel', component: SuperpanelComponent, canActivate: [AuthGuard]},
    // {path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard]},
    // {path: 'agregar-iglesia', component: AgregarIglesiaComponent, canActivate: [AuthGuard]},
    // {path: 'editar-iglesia/:id', component: EditIglesiaComponent, canActivate: [AuthGuard]},
    // {path: 'perfil/:id', component: PerfilComponent, canActivate: [AuthGuard]},
    // {path: '**', component: InicioComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
    // LiderComponent,
    // AgregarIglesiaComponent,
    // SolinivelComponent,
    // SoliestudioComponent,
    // EstudiandoComponent,
    // SoligeneralComponent,
    // SolieliminarComponent,
    // PerfilComponent,
    // SuperpanelComponent,
    // MonitoreoComponent,
    // AdminComponent,
    // EstadisticasComponent,
    // MuelleComponent,
    // ConfiguracionComponent,
    // RegistrarMiembroComponent,
    // TomarListaComponent,
    // LoginComponent,
    PanelConfigComponent,
    NavbarComponent,
//     EditComponent,
//     ContadorComponent,
//     GrafsexoComponent,
//     GrafedadesComponent,
//     FooterComponent,
//     NavbarPanelComponent,
//     EditIglesiaComponent,
//     InicioComponent
]