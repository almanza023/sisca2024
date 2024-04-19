import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { PersonasService } from '../../../core/services/personas.service';
import { DocentesService } from 'src/app/core/services/docentes.service';

@Component({
  selector: 'app-selector-docentes',
  templateUrl: './selector-docentes.component.html',
})
export class SelectorDocentesComponent {

  items:any=[];
  seleccionado:any=[];
  arraySeleccionado:any=[];
  @Input() valor:any={};
  @Input() lider:string;

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor(private docenteService: DocentesService) { }

  ngOnInit(): void {
    this.getData();
    this.seleccionado=[];
  }

  getData(){
    this.docenteService.getActive().subscribe(response => {
        this.items=response.data;
        } ,error => {
          //console.log( error.error)
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
