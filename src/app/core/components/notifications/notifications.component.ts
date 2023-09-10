import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Popup } from '../../models/popup.interface';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  popupsObs$!: Observable<Popup[]>;

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.popupsObs$ = this.popupService.popupsObs$;
  }

  onCloseNotification(index: number) {
    this.popupService.deletePopup(index);
  }
}
