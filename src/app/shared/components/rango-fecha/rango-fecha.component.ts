import { Component, Input, Output, OnInit,  EventEmitter } from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'app-rango-fecha',
  templateUrl: './rango-fecha.component.html',
  styleUrls: ['./rango-fecha.component.scss']
})
export class RangoFechaComponent implements OnInit {

  rangeDates:string;  
  @Input() valorInicial:string="";
  @Input() valorFinal:string="";
  @Output() fechaSeleccionada=new EventEmitter();

  ngOnInit(): void {      
    if(this.valorInicial!="" && this.valorFinal!="" ){
      this.rangeDates=this.valorInicial+" - "+this.valorFinal;
    }else{
      this.rangeDates="";
    }
  }

  ngOnDestroy() {
    this.rangeDates="";
    this.fechaSeleccionada.emit([]);
  }
  onChange(event) {      
    this.fechaSeleccionada.emit(this.rangeDates);
  }
  onSelect(event) {      
    let fechainicial = moment(this.rangeDates[0]).format('DD/MM/YYYY');
    let fechafinal = moment(this.rangeDates[1]).format('DD/MM/YYYY');
    let rangoFechas=[];
    rangoFechas.push(fechainicial);
    rangoFechas.push(fechafinal);
    this.fechaSeleccionada.emit(rangoFechas);   
  }

  onClear(event){    
    let rangoFechas=[];
    rangoFechas.push("");
    rangoFechas.push("");
    this.fechaSeleccionada.emit(rangoFechas);
  }
  limpiarCampos(){
    this.fechaSeleccionada.emit([]);
  }


  
}
