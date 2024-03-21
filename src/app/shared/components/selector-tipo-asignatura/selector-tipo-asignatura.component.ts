import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoAsignaturaService } from 'src/app/core/services/tipo-asignatura.service';

@Component({
  selector: 'app-selector-tipo-asignatura',
  templateUrl: './selector-tipo-asignatura.component.html',
})
export class SelectorTipoAsignaturaComponent {

  items:any=[];
  seleccionado:any={};
  arraySeleccionado:any=[];
  @Input() valor:any={};

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor(private tipoService: TipoAsignaturaService) { }

  ngOnInit(): void {

    this.getData();

    this.seleccionado=this.valor;
    console.log(this.seleccionado);

  }o
  getData(){
    this.tipoService.getActive().subscribe(response => {
      this.items=response.data;
      } ,error => {
        console.log( error.error)
      });
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
