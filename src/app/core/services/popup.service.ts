import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Popup } from '../models/popup.interface';
import { __values } from 'tslib';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PopupService {
  private bufferedPopups: Popup[] = [];
  private popups$ = new Subject<Popup[]>();
  private popups: Popup[] = [];

  constructor() {
  }

  get popupsObs$() {
    return this.popups$.asObservable()
  }

  pushPopup(newPopup: Popup) {
    if(this.popups.length < 5) {
      if(!this.popups.find(p => p.message === newPopup.message)) {
        this.popups.push(newPopup);
        this.popups$.next(this.popups);
      } 
    } else {
      if(!this.bufferedPopups.find(bp => bp.message === newPopup.message)) {
        this.bufferedPopups.push(newPopup);
      }
    }
  }

  deletePopup(index: number) {
    this.popups.splice(index, 1);
    this.popups$.next(this.popups);
    if(this.bufferedPopups.length > 0) {
      this.pushPopup(this.bufferedPopups[0]);
      this.bufferedPopups.splice(0,1);
      this.popups$.next(this.popups);
    }
  }

  clearPopups() {
    for(let i = 0; i < this.popups.length; i++) {
      if(!this.popups[i].autoCloseable)
        this.deletePopup(i);
    };
  }
}
