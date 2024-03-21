import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SeguridadService } from 'src/app/core/services/seguridad.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
    providers: [MessageService],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];

    usuario!: string;
    clave!: string;
    loading: boolean = false;

    constructor(
        private router: Router,
        public layoutService: LayoutService,
        private seguridadService: SeguridadService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.limpiarLocalstore();
    }

    login() {
        this.limpiarLocalstore();
        if (this.usuario === undefined || this.usuario == '') {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Ingresar un Usuario',
                life: 3500,
            });
            return;
        }

        if (this.clave === undefined || this.clave == '') {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Ingresar una Contraseña',
                life: 3500,
            });
            return;
        }
        let datos = {
            documento: this.usuario,
            password: this.clave,
        };
        this.loading = true;
        setTimeout(() => {
            this.seguridadService.postLogin(datos).subscribe(
                (response) => {
                    console.log(response);
                    localStorage.setItem('username', response.name);
                    localStorage.setItem('rol', response.tipo);
                    localStorage.setItem('user_id', response.user_id);
                    localStorage.setItem('docente_id', response.docente_id);
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('sede_id', response.sede_id);
                    localStorage.setItem('grados', JSON.stringify(response.grados));
                    localStorage.setItem('direcciones', JSON.stringify(response.direcciones));
                    this.router.navigate(['/dashboard']);
                },
                (error) => {
                    this.loading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Advertencia',
                        detail: 'Credenciales Incorrectas o no tiene permiso para ingresar al aplicativo',
                        life: 3800,
                    });
                }
            );
        }, 2500);
    }

    limpiarLocalstore() {
        localStorage.removeItem('username');
        localStorage.removeItem('rol');
        localStorage.removeItem('user_id');
        localStorage.removeItem('token');
        localStorage.removeItem('sede_id');
        localStorage.removeItem('grados');
        localStorage.removeItem('direcciones');
    }
}
