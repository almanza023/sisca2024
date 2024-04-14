import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsignaturasService } from 'src/app/core/services/asignaturas.service';
import { CargaService } from 'src/app/core/services/carga.service';

@Component({
  selector: 'app-selector-asignaturas',
  templateUrl: './selector-asignaturas.component.html',
})
export class SelectorAsignaturasComponent {

  items:any=[];
  seleccionado:any=[];
  arraySeleccionado:any=[];
  @Input() valor:any={};
  @Input() mostrar:boolean=false;
  rol:any;

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor(private asignaturaService: AsignaturasService,
    private cargaService: CargaService) { }

  ngOnInit(): void {
    this.rol=localStorage.getItem("rol")!;
    if(this.mostrar){
        this.getData();
    }
    this.seleccionado=[];
  }
  getData(){
    this.asignaturaService.getActive().subscribe(response => {
      this.items=response.data;
      } ,error => {
        console.log( error.error)
      });
  }

  onChange(event) {
    this.itemSeleccionado.emit(event.value);
    console.log(event.value);
  }

  reiniciarComponente(): void {
    this.seleccionado = {}; // Reiniciar el estado del componente hijo
  }

  filtrar(valor:any) {
    if(valor){
     this.seleccionado= this.items.find(objeto => objeto['id'] === valor);
    }
   }

   getAsignaturasBySedeAndGrado(sede:any, grado:any){
        if(this.rol=="1"){
            let docente=localStorage.getItem("docente_id")!;
            this.getAsignaturasByDocente(sede, grado, docente )
        }else{
            this.getAsignaturasSedeGrado(sede, grado);
        }
  }

  getAsignaturasSedeGrado(sede:any, grado:any){
    this.cargaService.getAsignaturasBySedeAndGrasdo(sede, grado).subscribe(response => {
        this.items=response.data;
        } ,error => {
          console.log( error.error)
        });
  }

  getAsignaturasByDocente(sede:any, grado:any, docente:any){
    this.cargaService.getAsignaturasByDocente(sede, grado, docente).subscribe(response => {
      this.items=response.data;
      } ,error => {
        console.log( error.error)
      });
  }


}
