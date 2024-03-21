import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoLogroService } from 'src/app/core/services/tipo-logro.service';


@Component({
  selector: 'app-selector-tipo-persona',
  templateUrl: './selector-tipo-persona.component.html',
})
export class SelectorTipoPersonaComponent {

  items:any=[];
  seleccionado:any=[];
  arraySeleccionado:any=[];
  @Input() valor:any={};

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor(private tipoService: TipoLogroService) { }

  ngOnInit(): void {
    this.getData();
    this.seleccionado=[];
  }
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


}
