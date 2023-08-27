import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Popup } from '../models/popup.model';
import { __values } from 'tslib';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popups$ = new Subject<Popup[]>();
  private popups: Popup[]= [];

  constructor(private router: Router) {
    this.router.events.pipe(
      tap(event => {
        if(event instanceof NavigationEnd) {
          this.clearPopups();
        }
      })
    ).subscribe();
  }

  get popupsObs$() {
    return this.popups$.asObservable()
  }

  pushPopup(newPopup: Popup) {
    if(!this.popups.map(p => p.message).includes(newPopup.message)) {
      this.popups.push(newPopup);
      this.popups$.next(this.popups);
    }
  }

  deletePopup(index: number) {
    this.popups.splice(index, 1);
    this.popups$.next(this.popups);
  }

  clearPopups() {
    this.popups = [];
    this.popups$.next(this.popups);
  }
}
