import { HttpClient } from '@angular/common/http'
import { Note } from '../models/note.model';
import { Observable, map, switchMap } from 'rxjs'
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class NoteService {
    constructor(private http: HttpClient) {}

    getAllNotes(): Observable<Note[]> {
        return this.http.get<Note[]>('https://localhost:7287/api/v1/notes/testget');
    }

    getNoteById(id: number): Observable<Note> {
        return this.http.get<Note>(`https://localhost:7287/api/v1/notes/${id}`);
    }

    addNote(note: Note): Observable<Note> {
        return this.http.post<Note>('https://localhost:7287/api/v1/notes', note);
    }

    getAllNotesByUser(): Observable<Note[]> {
        return this.http.get<Note[]>('https://localhost:7287/api/v1/notes');
    }

    updateNote(updatedNote: Note, id: number): Observable<Note> {
        return this.getNoteById(id).pipe(
            switchMap(() => this.http.put<Note>(`http://localhost:3000/notes/${id}`, updatedNote))
        )
    }

    deleteNote(id: number): Observable<Note> {
        return this.getNoteById(id).pipe(
            switchMap(() => this.http.delete<Note>(`http://localhost:3000/notes/${id}`))
        )
    }
}