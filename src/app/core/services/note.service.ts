import { HttpClient } from '@angular/common/http'
import { Note } from '../models/note.interface';
import { Observable, Subject, tap } from 'rxjs'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CodeSnippet } from '../models/codesnippet.interface';
import { PopupService } from './popup.service';

@Injectable({
    providedIn: 'root'
})

export class NoteService {
    private userNotes$ = new Subject<Note[]>;

    constructor(private http: HttpClient,
                private popupService: PopupService) {}

    getUserNotesObservable(): Observable<Note[]> {
        return this.userNotes$.asObservable();
    }

    getNoteById(id: string): Observable<Note> {
        return this.http.get<Note>(`${environment.apiUrl}/notes/${id}`);
    }

    addNote(note: Note) {
        return this.http.post<Note>(`${environment.apiUrl}/notes`, note).pipe(
            tap((note) => {
                if(note) {
                    this.refreshUserNotes();
                    this.popupService.pushPopup({
                        message: 'Note created !',
                        type: 'success',
                        autoCloseable: true
                    });
                }
            })
        );
    }

    refreshUserNotes() {
        return this.http.get<Note[]>(`${environment.apiUrl}/notes`).pipe(
            tap(notes => this.userNotes$.next(notes))
        ).subscribe();
    }

    editNote(editedNote: Note): Observable<Note> {
        return this.http.put<Note>(`${environment.apiUrl}/notes`, editedNote).pipe(
            tap(() => {
                this.popupService.pushPopup({
                    message: 'Note edited !',
                    type: 'success',
                    autoCloseable: true
                });
                this.refreshUserNotes();
            })
        );
    }

    deleteNote(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/notes/${id}`);
    }
}