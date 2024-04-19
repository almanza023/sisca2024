import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CampannaService } from '../../../core/services/campanna.service';

@Component({
  selector: 'app-selector-generico',
  templateUrl: './selector-generico.component.html',
})
export class SelectorGenericoComponent {


  seleccionado:any={};
  arraySeleccionado:any=[];
  @Input() valor:any={};
  @Input() items:any=[];

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor() { }

  ngOnInit(): void {

    this.seleccionado=this.valor;
    //console.log(this.seleccionado);

  }


  onChange(event) {
    this.itemSeleccionado.emit(event.value);
  }

  reiniciarComponente(): void {
    this.seleccionado = {}; // Reiniciar el estado del componente hijo
  }

  filtrar(valor:any) {
    if(valor){
     this.seleccionado= this.items.find(objeto => objeto['descripcion'] === valor);
    }
   }



}
