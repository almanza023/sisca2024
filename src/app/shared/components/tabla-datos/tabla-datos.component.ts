import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Table } from 'primeng/table';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-tabla-datos',
  templateUrl: './tabla-datos.component.html'
})
export class TablaDatosComponent {


  @Input() datos: any = [];
  cols: any[] = [];
  seleccionados: any = [];
  seleccionadosManual: any = [];
  seleccion:any=[];
  @Output() dataSeleccionada: EventEmitter<any[]> = new EventEmitter<any[]>();
  totalRecords: number;
  selectAll: boolean = false;
  ngOnInit() {
    this.totalRecords=this.datos.length;
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.datos);
        const workbook = {
            Sheets: { data: worksheet },
            SheetNames: ['data']
        };
        const excelBuffer: any = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        this.saveAsExcelFile(excelBuffer, 'Listado');
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
}

getStatusClass(id){
    let valor="";
    if(id==="1"){
        valor="#85C1E9";
    }
    if(id==="2"){
        valor="#F9E79F";
    }
    if(id==="3"){
        valor="#ABEBC6";
    }
    //console.log(id);
    return valor;
}



  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}




}
