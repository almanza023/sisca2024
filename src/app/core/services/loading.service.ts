import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private _count = 0;
    private _loading$ = new BehaviorSubject<boolean>(false);

    readonly loading$ = this._loading$.asObservable();

    show(): void {
        this._count++;
        if (this._count === 1) {
            this._loading$.next(true);
        }
    }

    hide(): void {
        if (this._count > 0) {
            this._count--;
        }
        if (this._count === 0) {
            this._loading$.next(false);
        }
    }
}
