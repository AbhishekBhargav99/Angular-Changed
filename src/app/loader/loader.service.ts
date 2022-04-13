import {  Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

    public isLoading = new BehaviorSubject<boolean>(false);
    private _loading = new BehaviorSubject<boolean>(false);
    public readonly loading$ = this._loading.asObservable();

    constructor(){

    }

    show() {
      this._loading.next(true);
    }

    hide() {
      this._loading.next(false);
    }
 
}
