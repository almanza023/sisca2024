import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { ReporteService } from 'src/app/core/services/reporte.service';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';

@Component({
  selector: 'app-reporteboletinperiodo',
  templateUrl: './reporteboletinperiodo.component.html',
  providers: [MessageService],
})
export class ReporteboletinperiodoComponent {

    nombreModulo: string = 'Reporte Boletines de Periodo';
    form: FormGroup;
    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent)
    gradosComponent: SelectorGradosComponent;

    @ViewChild(SelectorPeriodoComponent)
    periodoComponent: SelectorPeriodoComponent;

    pdf:string;

    constructor(
        private reporteService: ReporteService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.form = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            periodo_id: ['', Validators.required],
        });
    }

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                if (event != null) {
                    this.form.get('sede_id').setValue(event.id);
                    this.gradosComponent.getDireccionesGrados();
                }
                break;
            case 'grado':
                if (event != null) {
                    this.form.get('grado_id').setValue(event.id);
                }
                break;
            case 'periodo':
                if (event != null) {
                    this.form.get('periodo_id').setValue(event.id);
                }
                break;
        }
    }

    onSubmit(){

        if(this.form.valid){
            let nombre="Reporte_"+this.form.get("grado_id").value;
            this.getDataAll(nombre, this.form.value)
        }
    }

    getDataAll(nombre:string, filtro) {
        this.reporteService
            .reporteBoletinPeriodo(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, nombre+'.pdf')))
            .subscribe(
                (response) => {
                    console.log(response.pdf);
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




    downloadFile(base64:any,fileName:any){
        if(base64!==undefined){
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



}
