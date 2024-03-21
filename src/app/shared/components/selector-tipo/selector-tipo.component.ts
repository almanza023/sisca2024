import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MotivoLlamadaService } from '../../../core/services/motivollamada.service';

@Component({
  selector: 'app-selector-tipo',
  templateUrl: './selector-tipo.component.html',
})
export class SelectorTipoComponent {

  items:any=[];
  seleccionado:any={};
  arraySeleccionado:any=[];
  @Input() valor:any={};

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor() { }

  ngOnInit(): void {
    this.getData();
    this.seleccionado=this.valor;
  }

  getData(){
    this.items=[
        {id:1, descripcion:"DOCENTE"},
        {id:2, descripcion:"CORDINADOR ACADEMICO"},
        {id:3, descripcion:"SECRETARIA"},
        {id:4, descripcion:"RECTOR"},
        {id:5, descripcion:"AUXILIAR"},
        {id:6, descripcion:"ADMINISTRATIVO"},

      ]
  }

  onChange(event) {
    this.itemSeleccionado.emit(event.value);
  }

  reiniciarComponente(): void {
    this.seleccionado = {}; // Reiniciar el estado del componente hijo
  }

  filtrar(valor:any) {
    if(valor){
     this.seleccionado= this.items.find(objeto => objeto['id'] === valor);
    }
   }


}
