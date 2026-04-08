import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ReporteService } from '../../../core/services/reporte.service';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorAsignaturasComponent } from 'src/app/shared/components/selector-asignaturas/selector-asignaturas.component';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';
import { CargaService } from 'src/app/core/services/carga.service';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver'; // para descargar el zip
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  providers: [MessageService],
})
export class ReporteGeneralComponent {

    filtro:any={};
    data:any=[];
    pdf:string="";
    sublideres:any=[];
    nombreModulo:string;
    form: FormGroup;
    tiporeporte:any;
    ocultarPanelAisgPer:boolean=false;
    loading:boolean=false;
    carga:any[]=[];
    formatos:any[]=[];
    formatoSeleccionado:any;

    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent) gradosComponent: SelectorGradosComponent;
    @ViewChild(SelectorAsignaturasComponent)  asignaturasComponent: SelectorAsignaturasComponent;
    @ViewChild(SelectorPeriodoComponent) periodoComponent: SelectorPeriodoComponent;

    constructor(
        private messageService: MessageService,
        private reporteService: ReporteService,
        private cargaService: CargaService,
        private fb: FormBuilder

    ){}
    ngOnInit() {
        this.nombreModulo="Reportes General";

        this.form = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            tipo_id: ['', Validators.required],
            asignatura_id: ['',],
            periodo_id: ['',],
        });
        this.getFormatos();
    }
    getFormatos(){
        this.formatos = [
            {id: 1, nombre: 'Pdf', value: 'pdfUnificado'},
            {id: 2, nombre: 'Zip', value: 'zip'},
        ];
        this.formatoSeleccionado = this.formatos[0];
    }

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                if (event != null) {
                    this.form.get('sede_id').setValue(event.id);
                    //this.formEnviar.get('sede_id').setValue(event.id);
                    this.gradosComponent.getDireccionesGrados();
                }
                break;
            case 'grado':
                if (event != null) {
                    this.form.get('grado_id').setValue(event.id);
                    this.asignaturasComponent.getAsignaturasBySedeAndGrado(
                        this.form.get('sede_id').value,
                        event.id
                    );
                    //this.formEnviar.get('grado_id').setValue(event.id);

                }
                break;
            case 'asignatura':
                if (event != null) {
                    this.form.get('asignatura_id').setValue(event.id);
                    //this.formEnviar.get('asignatura_id').setValue(event.id);
                }
                break;
            case 'periodo':
                if (event != null) {
                    this.form.get('periodo_id').setValue(event.id);
                    //this.formEnviar.get('periodo_id').setValue(event.id);
                }
                break;
                case 'tipo':
                    this.tiporeporte=event.id;
                    this.form.get('tipo_id').setValue(event.id);

                    //console.log(this.tiporeporte);
                    if(this.tiporeporte==1 ){
                        //Habilitar asignatura y periodo
                        this.ocultarPanelAisgPer=false;
                    }
                    if(this.tiporeporte==2 || this.tiporeporte==3
                        || this.tiporeporte==4 || this.tiporeporte==5 || this.tiporeporte==6
                        || this.tiporeporte==7 || this.tiporeporte==8
                        ) {
                        //Habilitar asignatura y periodo
                        this.ocultarPanelAisgPer=true;
                        if(this.tiporeporte==7){
                            this.periodoComponent.semestre=true;
                        }

                    }

                    break;
                    case 'areas':
                        this.form.get('asignatura_id').setValue(event.code);
                        break;
        }
    }









    getDatMatriculas(filtro) {
        this.reporteService
            .reporteMatriculas(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteMatriculas.pdf')))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });

                }
            );
    }

    getDatCalificaciones(filtro) {
        this.reporteService
            .reporteCalificaciones(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteCalificaciones.pdf')))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });

                }
            );
    }

    getDatConsolidados(filtro) {
        this.reporteService
            .reporteConsolidadoPeriodo(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteConsolidado.pdf')))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                    this.loading=false;
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });
                    this.loading=false;

                }
            );
    }

    getDataEstadisticasPeriodo(filtro) {
        console.log(filtro);
        this.reporteService
            .reporteEstadisticaPeriodo(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteEstadisticas.pdf')))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    if(response.code==200){
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Reporte Generado Exitosamente',
                            detail: response.message,
                            life: 3000,
                        });
                        this.loading=false;
                    }else{
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: response.message,
                            life: 3000,
                        });
                        this.loading=false;
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });
                    this.loading=false;

                }
            );
    }


    getDataAreaPeriodo(filtro) {
        this.reporteService
            .reporteAreaPeriodo(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteArea.pdf')))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    if(response.code==200){
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Reporte Generado Exitosamente',
                            detail: response.message,
                            life: 3000,
                        });
                        this.loading=false;
                    }else{
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: response.message,
                            life: 3000,
                        });
                        this.loading=false;
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });
                    this.loading=false;

                }
            );
    }

    getValoraciones(filtro) {
        this.reporteService
            .reporteValoraciones(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteValoraciones.pdf')))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    if(response.code==200){
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Reporte Generado Exitosamente',
                            detail: response.message,
                            life: 3000,
                        });
                        this.loading=false;
                    }else{
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: response.message,
                            life: 3000,
                        });
                        this.loading=false;
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });
                    this.loading=false;

                }
            );
    }

    getDatNivelaciones(filtro) {
        this.reporteService
            .reporteNivelaciones(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteNivelaciones.pdf')))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                    this.loading=false;
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });
                    this.loading=false;

                }
            );
    }

    getNotasAcumulativas(filtro) {
        this.reporteService
            .reporteNotasAcumulativas(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteAcumulativos.pdf')))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                    this.loading=false;
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });
                    this.loading=false;

                }
            );
    }

    getConsolidado(filtro) {
        this.reporteService
            .reporteConsolidado(filtro)
            .pipe(finalize(() => this.downloadFileExcel(this.pdf, 'ReporteConsolidado_'+filtro.grado_id+'.xlsx')))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                    this.loading=false;
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });
                    this.loading=false;

                }
            );
    }

    getAnalisis(filtro) {
        this.reporteService
            .analisisPeriodo(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'Anilisis'+filtro.grado_id+'.pdf')))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                    this.loading=false;
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });
                    this.loading=false;

                }
            );
    }




    downloadFile(base64:any,fileName:any){
        if(base64!==undefined || base64!=""){
            const src = `data:application/pdf;base64,${base64}`;
            const link = document.createElement("a")
            link.href = src
            link.download = fileName
            link.click()
            link.remove()
        }else{
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: "Error al Generar PDF",
                life: 3000,
            });
        }
    }

    downloadFileExcel(base64: any, fileName: any) {
        if (base64 !== undefined && base64 !== "") {
            // Cambia el tipo de contenido a application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
            const src = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
            const link = document.createElement("a");
            link.href = src;
            link.download = fileName; // Puedes asegurarte de que el nombre de archivo termine con .xlsx
            document.body.appendChild(link); // Añade el enlace al DOM
            link.click(); // Simula un clic en el enlace
            document.body.removeChild(link); // Elimina el enlace del DOM después de la descarga
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: "Error al Generar Excel",
                life: 3000,
            });
        }
    }


    async getNotasAcumulativasGrado(filtro: any) {
  this.loading = true;

  try {
    // 1. Obtener todas las asignaturas
    const asignaturas = await this.getAsignaturasSedeGrado(filtro.sede_id, filtro.grado_id);

    if (!asignaturas?.length) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No hay asignaturas.', life: 3000 });
      return;
    }

    // 2. Normalizar y agrupar POR DOCENTE desde el inicio
    const docentesMap = new Map<string, any[]>();

    for (const asig of asignaturas) {
      // Validar y normalizar docente
      if (!asig.docente || typeof asig.docente !== 'string') continue;

      let nombreDocente = asig.docente.trim();
      if (nombreDocente === '') continue;

      // Opcional: normalizar a mayúsculas o minúsculas para evitar duplicados
      // Ej: 'Dora Luz' y 'DORA LUZ' → mismo docente
      nombreDocente = nombreDocente.toUpperCase(); // 👈 esto evita duplicados por formato

      if (!docentesMap.has(nombreDocente)) {
        docentesMap.set(nombreDocente, []);
      }
      docentesMap.get(nombreDocente)!.push(asig);
    }

    if (docentesMap.size === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ninguna asignatura tiene docente válido.', life: 3000 });
      return;
    }

    // 3. Procesar cada docente
    let docentesConPDF = 0;

    for (const [nombreDocenteNormalizado, asignaturasDocente] of docentesMap) {
      const pdfUnificado = await PDFDocument.create();
      let alMenosUnPDFExitoso = false;

      for (const asig of asignaturasDocente) {
        try {
          const response = await this.reporteService
            .reporteNotasAcumulativas({ ...filtro, asignatura_id: asig.id })
            .toPromise();

          const bytes = this.base64ToUint8Array(response.pdf);
          const srcDoc = await PDFDocument.load(bytes);
          const pages = await pdfUnificado.copyPages(srcDoc, srcDoc.getPageIndices());
          pages.forEach(page => pdfUnificado.addPage(page));
          alMenosUnPDFExitoso = true;
        } catch (err) {
          console.warn(`PDF fallido para asignatura ${asig.id} (${asig.nombre}) del docente ${nombreDocenteNormalizado}:`, err);
          // Continuar con las demás asignaturas del mismo docente
        }
      }

      // Solo guardar si al menos un PDF se generó
      if (alMenosUnPDFExitoso) {
        const pdfBytes = await pdfUnificado.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        // Restaurar formato legible (solo primera letra en mayúscula si quieres, o dejar como vino)
        // Aquí usamos el nombre normalizado en mayúsculas, pero puedes ajustarlo
        const nombreArchivo = `Reporte_${nombreDocenteNormalizado.replace(/[/\\?%*:|"<>]/g, '_')}_${filtro.grado_id}.pdf`;
        saveAs(blob, nombreArchivo);
        docentesConPDF++;
      } else {
        console.warn(`Ningún PDF generado para el docente: ${nombreDocenteNormalizado}`);
      }
    }

    if (docentesConPDF === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo generar ningún PDF.', life: 5000 });
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Listo',
        detail: `${docentesConPDF} PDF(s) descargado(s), uno por docente.`,
        life: 6000,
      });
    }

  } catch (error) {
    console.error('Error general:', error);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error?.error?.message || 'Error al generar los reportes.',
      life: 6000,
    });
  } finally {
    this.loading = false;
  }
}

    onSubmit(){
        if(this.form.valid){
            this.loading=true;
            setTimeout(() => {
                if(this.tiporeporte==1){
                    this.getDatMatriculas(this.form.value);
                }
                if(this.tiporeporte==2){
                    this.getDatCalificaciones(this.form.value);
                }
                if(this.tiporeporte==3){
                    this.getDatConsolidados(this.form.value);
                }
                if(this.tiporeporte==4){
                    this.getDataEstadisticasPeriodo(this.form.value);
                }
                if(this.tiporeporte==5){
                    this.getDataAreaPeriodo(this.form.value);
                }
                if(this.tiporeporte==6){
                    this.getValoraciones(this.form.value);
                }
                if(this.tiporeporte==7){
                    this.getDatNivelaciones(this.form.value);
                }
                if(this.tiporeporte==8){
                    this.getNotasAcumulativas(this.form.value);
                }
                if(this.tiporeporte==9){
                    this.getConsolidado(this.form.value);
                }
                 if(this.tiporeporte==10){
                    this.getAnalisis(this.form.value);
                }
                 if(this.tiporeporte==11){
                    this.getNotasAcumulativasGrado(this.form.value);
                }

            }, 1500);
        }else{
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: "Debe seleccionar los campos obligatorios",
                life: 3000,
            });
        }
    }


    // Convierte base64 a Uint8Array (requerido por pdf-lib)
private base64ToUint8Array(base64: string): Uint8Array {
  const clean = base64.replace(/^data:application\/pdf;base64,/, '')
                      .replace(/^application\/pdf;base64,/, '');
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

private getAsignaturasSedeGrado(sedeId: any, gradoId: any): Promise<any[]> {
  return new Promise((resolve, reject) => {
    this.cargaService.getAsignaturasBySedeAndGrasdo(sedeId, gradoId).subscribe({
      next: (response) => resolve(response.data || []),
      error: (err) => reject(err)
    });
  });
}



}
