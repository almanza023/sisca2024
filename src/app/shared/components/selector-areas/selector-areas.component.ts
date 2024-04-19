import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-selector-areas',
  templateUrl: './selector-areas.component.html',
})
export class SelectorAreasComponent {

  items:any=[];
  seleccionado:any=[];
  arraySeleccionado:any=[];
  @Input() valor:any={};
  @Input() lider:string;

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  rol:string="";
  constructor() { }

  ngOnInit(): void {
    this.getData();
  }
  ngOnChanges(changes: SimpleChanges): void {
   this.seleccionado=[];

  }
  getData(){
    this.rol=localStorage.getItem("rol")!;
    if(this.rol=="1" || this.rol=="4"){
        this.items=[
            {id:1, descripcion:"MATEMATICAS", code:"MAT"},
            {id:1, descripcion:"HUMANIDADES", code:"CAS"},
            {id:1, descripcion:"CIENCIAS NATURALES", code:"CNA"},
            {id:1, descripcion:"CIENCIAS SOCIALES", code:"CSOC"},
        ];
    }
    if(this.rol=="3"){
        this.items=[
            {id:1, descripcion:"MATEMATICAS", code:"MAT"},
            {id:2, descripcion:"HUMANIDADES", code:"CAS"},
            {id:3, descripcion:"CIENCIAS NATURALES", code:"CNA"},
            {id:4, descripcion:"CIENCIAS SOCIALES", code:"CSOC"},
        ];
    }

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
