import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Popup } from '../models/popup.model';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popups$ = new Subject<Popup[]>();
  private popups: Popup[]= [];

  constructor() { }

  get popupsObs$() {
    return this.popups$.asObservable()
  }

  pushPopup(newPopup: Popup) {
    this.popups.push(newPopup);
    this.popups$.next(this.popups);
  }

  deletePopup(index: number) {
    this.popups.splice(index, 1);
    this.popups$.next(this.popups);
  }
}
