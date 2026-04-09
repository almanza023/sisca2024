import { Component } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';

@Component({
    selector: 'app-loading-overlay',
    template: `
        <div class="loading-overlay" *ngIf="loadingService.loading$ | async">
            <div class="loading-box">
                <img src="assets/images/loading_ineda.gif" alt="Cargando..." class="loading-gif" />
                <p class="loading-text">Cargando...</p>
            </div>
        </div>
    `
})
export class LoadingOverlayComponent {
    constructor(public loadingService: LoadingService) {}
}
