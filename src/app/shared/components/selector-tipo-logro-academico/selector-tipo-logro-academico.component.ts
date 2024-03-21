import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoLogroService } from 'src/app/core/services/tipo-logro.service';

@Component({
  selector: 'app-selector-tipo-logro-academico',
  templateUrl: './selector-tipo-logro-academico.component.html',
})
export class SelectorTipoLogroAcademicoComponent {

  items:any=[];
  seleccionado:any={};
  arraySeleccionado:any=[];
  @Input() valor:any={};

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor(private tipoService: TipoLogroService) { }

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
