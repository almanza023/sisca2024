import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import { AperturaPeriodoService } from 'src/app/core/services/apertura-periodo.service';
import { PeriodosService } from 'src/app/core/services/periodos.service';

@Component({
    selector: 'app-selector-periodo',
    templateUrl: './selector-periodo.component.html',
})
export class SelectorPeriodoComponent {
    items: any = [];
    seleccionado: any = [];
    arraySeleccionado: any = [];
    @Input() semestre = false;
    @Input() valor: any = {};
    @Input() final = false;

    @Output() itemSeleccionado: EventEmitter<any> = new EventEmitter<any>();
    selectedCliente: string = '';
    constructor(
        private periodoServicec: PeriodosService,
        private aperturaService: AperturaPeriodoService
    ) {}

    ngOnInit(): void {
        let rol = localStorage.getItem('rol');
        if (!this.semestre) {
            if (rol == '3') {
                if (this.final) {
                    this.items = [
                        { id: 1, numero: 1 },
                        { id: 2, numero: 2 },
                        { id: 3, numero: 3 },
                        { id: 4, numero: 4 },
                        { id: 5, numero: 'FINAL' },
                    ];
                } else {
                    this.getData();
                }
            } else {
                this.getDataAbiertos();
            }
        } else {
            this.items = [
                {id: 1, numero: 1},
                {id: 2, numero: 2},
                { id: 3, numero: 3 },
                { id: 4, numero: 4 },
            ];
        }
        this.seleccionado = [];
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.seleccionado = [];
    }
    getData() {
        this.periodoServicec.getActive().subscribe(
            (response) => {
                this.items = response.data;
            },
            (error) => {
                //console.log( error.error)
            }
        );
    }

    onChange(event) {
        this.itemSeleccionado.emit(event.value);
    }

    reiniciarComponente(): void {
        this.seleccionado = {}; // Reiniciar el estado del componente hijo
    }

    filtrar(valor: any) {
        if (valor) {
            this.seleccionado = this.items.find(
                (objeto) => objeto['id'] === valor
            );
        }
    }

    getDataAbiertos() {
        let fechaFormateada = this.getFechaActual();
        let data = {
            fecha: fechaFormateada,
        };
        this.aperturaService.getAbiertos(data).subscribe(
            (response) => {
                this.items = response.data;
            },
            (error) => {
                //console.log( error.error)
            }
        );
    }

    getFechaActual() {
        let fechaActual = new Date();
        let año = fechaActual.getFullYear();
        let mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
        let dia = String(fechaActual.getDate()).padStart(2, '0');
        let fechaFormateada = `${año}-${mes}-${dia}`;
        return fechaFormateada;
    }
}
