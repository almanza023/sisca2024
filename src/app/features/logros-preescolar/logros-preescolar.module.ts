
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroLogroPreescolarComponent } from './registro-logro-preescolar/registro-logro-preescolar.component';
import { LogrosPreescolarRoutingModule } from './logros-preescolar-routing.module';
import { LogrosPreescolarComponent } from './logros-preescolar.component';





@NgModule({
  declarations: [
    LogrosPreescolarComponent,
    RegistroLogroPreescolarComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    LogrosPreescolarRoutingModule
  ]
})
export class LogrosPreescolarModule { }
