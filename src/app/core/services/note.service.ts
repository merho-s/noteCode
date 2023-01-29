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
        return this.http.get<Note[]>('http://localhost:3000/notes');
    }

    getNoteById(id: number): Observable<Note> {
        return this.http.get<Note>(`http://localhost:3000/notes/${id}`);
    }

    addNote(note: Note): Observable<Note> {
        return this.getAllNotes().pipe(
            map(notes => notes.sort((a,b) => a.id - b.id)),
            map(sortedNotes => sortedNotes[sortedNotes.length - 1]),
            map(previousNote => ({
                ...note,
                id: previousNote.id + 1
            })),
            switchMap(newNote => this.http.post<Note>('http://localhost:3000/notes', newNote))
        )
    }

    updateNote(updatedNote: Note, id: number): Observable<Note> {
        return this.getNoteById(id).pipe(
            map(note => note = updatedNote),
            switchMap(noteWithUpdate => this.http.put<Note>(`http://localhost:3000/notes/${id}`, noteWithUpdate))
        )
    }

    deleteNote(id: number): Observable<Note> {
        return this.getNoteById(id).pipe(
            switchMap(noteToDelete => this.http.delete<Note>(`http://localhost:3000/notes/${id}`))
        )
    }
}