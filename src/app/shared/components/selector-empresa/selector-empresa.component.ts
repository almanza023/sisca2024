import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input  } from '@angular/core';


@Component({
  selector: 'app-selector-empresa',
  templateUrl: './selector-empresa.component.html',
  styleUrls: ['./selector-empresa.component.scss']
})
export class SelectorEmpresaComponent implements OnInit  {

  
  empresas:any=[];
  seleccionado:any={};
  @Input() valor:any={};
  @Input() agrupado:boolean=false;
  
  @Output() empresaSeleccionada:EventEmitter<any> =new EventEmitter<any>();

  
  constructor() { }
 
  onChange(event) {   
    this.empresaSeleccionada.emit(event.value);       
  }

  ngOnInit(): void {
      this.obtenerEmpresas();     
      this.seleccionado=this.valor;
  }

  obtenerEmpresas(){
  if(this.agrupado){
    this.empresas=[
      { codempresa: '0', sigla:"TODAS" },
      { codempresa: '1', sigla:"SYA" },
      { codempresa: '2', sigla:"SE" },
      { codempresa: '13', sigla:"UT" },
    ];
  }else{
    this.empresas=[      
      { codempresa: '1', sigla:"SYA" },
      { codempresa: '2', sigla:"SE" },
      { codempresa: '13', sigla:"UT" },
    ];
  }
}

}
