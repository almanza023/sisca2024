import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { CargaService } from 'src/app/core/services/carga.service';
import { GradosService } from 'src/app/core/services/grados.service';


@Component({
  selector: 'app-selector-grados',
  templateUrl: './selector-grados.component.html',
})
export class SelectorGradosComponent {

  items:any=[];
  seleccionado:any={};
  arraySeleccionado:any=[];
  rol:any;
  @Input() valor:any={};
  @Input() mostrar:boolean=false;


  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor(private barrioService: GradosService,
    private cargaService: CargaService
    ) { }

  ngOnInit(): void {

    this.rol=localStorage.getItem('rol')!;
    this.filtrarDocente();
    if(this.mostrar){
        this.getData();
    }
    this.seleccionado=this.valor;
  }

  getData(){
    this.barrioService.getActive().subscribe(response => {
      this.items=response.data;
      } ,error => {
        //console.log( error.error)
      });
  }

  getGradosBySede(sede:any){
   if(this.rol=="3"){
    this.cargaService.getGradosBySede(sede)
    .subscribe(response => {
        //console.log(response.data);
      this.items=response.data;
      } ,error => {
        //console.log( error.error)
      });
   }else{
    this.filtrarDocente();
   }
  }

  onChange(event) {
    this.itemSeleccionado.emit(event.value);
  }

  reiniciarComponente(): void {
    this.seleccionado = {}; // Reiniciar el estado del componente hijo
  }

  filtrar(valor:any) {
    //console.log(valor);
    if(valor){
     this.seleccionado= this.items.find(objeto => objeto['id'] === valor);
    }
   }

   filtrarDocente(){
     if(this.rol=="1" || this.rol=="2" || this.rol=="4"){
        let grados=JSON.parse(localStorage.getItem('grados')!);
        this.items = grados;
    }

   }

   getDireccionesGrados(){
    if(this.rol=="1" || this.rol=="2" || this.rol=="4"){
        this.items=JSON.parse(localStorage.getItem('direcciones')!);
    }else{
        this.getData();
    }
   }

   limpiar(){
    this.items=[];
   }







}
