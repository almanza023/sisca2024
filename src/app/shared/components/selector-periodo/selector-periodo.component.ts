import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { PeriodosService } from 'src/app/core/services/periodos.service';
import { SedeService } from 'src/app/core/services/sede.service';

@Component({
  selector: 'app-selector-periodo',
  templateUrl: './selector-periodo.component.html',
})
export class SelectorPeriodoComponent {

  items:any=[];
  seleccionado:any=[];
  arraySeleccionado:any=[];
  @Input() valor:any={};
  @Input() lider:string;

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor(private periodoServicec: PeriodosService) { }

  ngOnInit(): void {
    this.getData();
    this.seleccionado=[];
  }
  ngOnChanges(changes: SimpleChanges): void {
   this.getData();
   this.seleccionado=[];

  }
  getData(){
    this.periodoServicec.getActive().subscribe(response => {
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
