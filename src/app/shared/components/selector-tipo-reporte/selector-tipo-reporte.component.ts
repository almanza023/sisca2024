import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AperturaPeriodoService } from 'src/app/core/services/apertura-periodo.service';


@Component({
  selector: 'app-selector-tipo-reporte',
  templateUrl: './selector-tipo-reporte.component.html',
})
export class SelectorTipoReporteComponent {

  items:any=[];
  seleccionado:any=[];
  arraySeleccionado:any=[];
  @Input() valor:any={};
  @Input() lider:string;

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor() { }

  ngOnInit(): void {
    this.getData();
  }
  ngOnChanges(changes: SimpleChanges): void {
   this.seleccionado=[];

  }
  getData(){
    this.items=[
        {id:1, descripcion:"Reporte Matricula"},
        {id:2, descripcion:"Reporte Calificaciones"},
        {id:3, descripcion:"Consolidado de Periodo"}
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
