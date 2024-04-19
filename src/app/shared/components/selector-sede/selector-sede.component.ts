import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { SedeService } from 'src/app/core/services/sede.service';

@Component({
  selector: 'app-selector-sede',
  templateUrl: './selector-sede.component.html',
})
export class SelectorSedeComponent {

  items:any=[];
  seleccionado:any={};
  arraySeleccionado:any=[];
  @Input() valor:any={};
  @Input() lider:string;

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor(private sedeService: SedeService) { }

  ngOnInit(): void {
    this.getData();
    this.seleccionado={};
  }
  getData(){
    this.sedeService.getActive()
    .pipe(finalize(()=>this.filtrarDocente()))
    .subscribe(response => {
      this.items=response.data;
      //console.log(response.data)
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

   filtrarDocente(){
    let rol=localStorage.getItem('rol')!;
    if(rol=="1" || rol=="2" || rol=="4"){
        let sede_id=localStorage.getItem('sede_id')!;
        this.items = this.items.filter(objeto => objeto.id == sede_id);
        //this.seleccionado=this.items[0]
    }

   }


}
