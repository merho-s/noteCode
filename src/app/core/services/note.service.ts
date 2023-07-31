import { HttpClient } from '@angular/common/http'
import { Note } from '../models/note.model';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CodeSnippet } from '../models/codesnippet.model';
import { Codetag } from '../models/codetag.model';

@Injectable({
    providedIn: 'root'
})

export class NoteService {
    private userNotes$ = new BehaviorSubject<Note[]>([]);

    constructor(private http: HttpClient) {}

    getUserNotesObservable(): Observable<Note[]> {
        return this.userNotes$.asObservable();
    }

    getAllNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(`${environment.apiUrlNote}/testget`)
    }

    getNoteById(id: number): Observable<Note> {
        return this.http.get<Note>(`${environment.apiUrlNote}/${id}`);
    }

    addNote(note: {title: string, description: string, codes: CodeSnippet[], codetags: Codetag[]}) {
        return this.http.post<Note>(environment.apiUrlNote, note).pipe(
            tap(() => this.refreshUserNotes())
        );
    }

    refreshUserNotes() {
        return this.http.get<Note[]>(environment.apiUrlNote).pipe(
            tap(notes => this.userNotes$.next(notes))
        ).subscribe();
    }

    updateNote(updatedNote: Note, id: number): Observable<Note> {
        return this.getNoteById(id).pipe(
            switchMap(() => this.http.put<Note>(`${environment.apiUrlNote}/${id}`, updatedNote))
        )
    }

    deleteNote(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrlNote}/${id}`);
    }
}