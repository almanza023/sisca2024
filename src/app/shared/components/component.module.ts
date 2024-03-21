import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos de la plantilla
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from "primeng/multiselect";
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule  } from 'primeng/toolbar';


//Componentes Compartidos
import { SelectorEmpresaComponent } from './selector-empresa/selector-empresa.component';

import { RangoFechaComponent } from './rango-fecha/rango-fecha.component';

import { MessageService } from 'primeng/api';
import { TablaDatosComponent } from './tabla-datos/tabla-datos.component';
import { SelectorFiltroComponent } from './selector-filtro/selector-filtro.component';
import { SelectorEstadoComponent } from './selector-estado/selector-estado.component';
import { SelectorTipoPersonaComponent } from './selector-tipo-persona/selector-tipo-persona.component';


import { CheckboxModule } from 'primeng/checkbox';

import { VerPowerbiComponent } from './ver-powerbi/ver-powerbi.component';
import { SelectorSedeComponent } from './selector-sede/selector-sede.component';
import { SelectorNivelComponent } from './selector-nivel/selector-nivel.component';
import { SelectorTipoComponent } from './selector-tipo/selector-tipo.component';
import { SelectorTipoAsignaturaComponent } from './selector-tipo-asignatura/selector-tipo-asignatura.component';
import { SelectorGradosComponent } from './selector-grados/selector-grados.component';
import { SelectorAsignaturasComponent } from './selector-asignaturas/selector-asignaturas.component';
import { SelectorDocentesComponent } from './selector-docentes/selector-docentes.component';
import { SelectorGenericoComponent } from './selector-generico/selector-generico.component';
import { SelectorPeriodoComponent } from './selector-periodo/selector-periodo.component';
import { SelectorTipoLogroAcademicoComponent } from './selector-tipo-logro-academico/selector-tipo-logro-academico.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [

    SelectorEmpresaComponent,
    SelectorGradosComponent,
    RangoFechaComponent,
    SelectorNivelComponent,
    TablaDatosComponent,
    SelectorDocentesComponent,
    SelectorFiltroComponent,SelectorTipoAsignaturaComponent,
    SelectorEstadoComponent,SelectorTipoPersonaComponent, SelectorAsignaturasComponent,
    SelectorSedeComponent, SelectorGenericoComponent, SelectorTipoComponent,
    VerPowerbiComponent, SelectorPeriodoComponent, SelectorTipoLogroAcademicoComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule, ButtonModule,
    CalendarModule, TableModule,KeyFilterModule,
    ToastModule, RatingModule, MultiSelectModule, SelectButtonModule,
    InputMaskModule, InputNumberModule, InputTextModule, AccordionModule, FileUploadModule,
    DialogModule, TabViewModule, ToolbarModule, InputTextareaModule, CheckboxModule
  ],
  exports: [
    SelectorEmpresaComponent,
    SelectorGradosComponent,
    RangoFechaComponent,
    SelectorNivelComponent,
    CommonModule, CheckboxModule, InputMaskModule, InputNumberModule, DropdownModule, InputTextModule,
    FormsModule, ButtonModule, CalendarModule, SelectButtonModule, AccordionModule,
    TableModule, ToastModule, RatingModule, MultiSelectModule,KeyFilterModule, FileUploadModule,
    DialogModule, TabViewModule, TablaDatosComponent,
    ToolbarModule, InputTextareaModule, SelectorFiltroComponent,
    SelectorEstadoComponent,SelectorTipoPersonaComponent,
    SelectorTipoAsignaturaComponent, SelectorDocentesComponent,
    SelectorAsignaturasComponent,SelectorSedeComponent,SelectorGenericoComponent,
    SelectorTipoComponent, SelectorPeriodoComponent,SelectorTipoLogroAcademicoComponent, LoadingComponent

  ]
})
export class ComponentModule { }
