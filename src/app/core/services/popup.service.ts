import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Popup } from '../models/popup.interface';
import { __values } from 'tslib';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PopupService {
  private popups$ = new Subject<Popup[]>();
  private popups: Popup[]= [];

  constructor() {
  }

  get popupsObs$() {
    return this.popups$.asObservable()
  }

  pushPopup(newPopup: Popup) {
    if(this.popups.length < 5) {
      if(!this.popups.find(p => p.message === newPopup.message) || newPopup.autoCloseable === true) {
        this.popups.push(newPopup);
        this.popups$.next(this.popups);
      } 
    }
  }

  deletePopup(index: number) {
    this.popups.splice(index, 1);
    this.popups$.next(this.popups);
  }

  clearPopups() {
    for(let i = 0; i < this.popups.length; i++) {
      if(!this.popups[i].autoCloseable)
        this.deletePopup(i);
    };
  }
}
