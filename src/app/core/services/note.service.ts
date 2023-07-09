import { HttpClient } from '@angular/common/http'
import { Note } from '../models/note.model';
import { Observable, map, switchMap } from 'rxjs'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CodeSnippet } from '../models/codesnippet.model';
import { Codetag } from '../models/codetag.model';

@Injectable({
    providedIn: 'root'
})

export class NoteService {
    constructor(private http: HttpClient) {}

    getAllNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(`${environment.apiUrlNote}/testget`);
    }

    getNoteById(id: number): Observable<Note> {
        return this.http.get<Note>(`${environment.apiUrlNote}/${id}`);
    }

    addNote(note: {title: string, description: string, codes: CodeSnippet[], codetags: Codetag[]}): Observable<Note> {
        return this.http.post<Note>(environment.apiUrlNote, note)
    }

    getAllNotesByUser(): Observable<Note[]> {
        return this.http.get<Note[]>(environment.apiUrlNote);
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