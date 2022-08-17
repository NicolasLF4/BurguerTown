import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { PanelConfigComponent } from './components/panel-config/panel-config.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FuncionesComponent } from './components/funciones/funciones.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PanelConfigComponent,
    MenuComponent,
    NavbarComponent,
    UsuariosComponent,
    FuncionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
