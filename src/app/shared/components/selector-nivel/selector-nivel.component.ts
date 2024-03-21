import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-selector-nivel',
  templateUrl: './selector-nivel.component.html',
})
export class SelectorNivelComponent {

  operaciones:any=[];
  seleccionado:any={};
  @Input() valor:any={};

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();

  selectedCliente:string="";
  constructor() { }

  ngOnInit(): void {
    this.getData();
    this.seleccionado=this.valor;
  }
  getData(){
    this.operaciones=[
      {id:1, descripcion:"PRIMERA INFANCIA"},
      {id:2, descripcion:"PRIMARIA"},
      {id:3, descripcion:"SECUNDARIA"},
      {id:4, descripcion:"ADMINISTRATIVO"},

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
    this.seleccionado= this.operaciones.find(objeto => objeto['descripcion'] === valor);
   }
  }

}
