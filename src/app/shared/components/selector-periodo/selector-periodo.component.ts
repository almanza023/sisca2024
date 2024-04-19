import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AperturaPeriodoService } from 'src/app/core/services/apertura-periodo.service';
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
  constructor(private periodoServicec: PeriodosService,
        private aperturaService: AperturaPeriodoService) { }

  ngOnInit(): void {
    let rol=localStorage.getItem("rol");
    if(rol=="3"){
        this.getData();
    }else{
        this.getDataAbiertos();
    }
    this.seleccionado=[];
  }
  ngOnChanges(changes: SimpleChanges): void {
   this.seleccionado=[];

  }
  getData(){
    this.periodoServicec.getActive().subscribe(response => {
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

   getDataAbiertos(){
    let fechaFormateada = this.getFechaActual();
    let data={
        fecha:fechaFormateada
    }
    this.aperturaService.getAbiertos(data).subscribe(response => {
      this.items=response.data;
      } ,error => {
        //console.log( error.error)
      });
  }

  getFechaActual(){
    let fechaActual = new Date();
    let año = fechaActual.getFullYear();
    let mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    let dia = String(fechaActual.getDate()).padStart(2, '0');
    let fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada;
  }


}
