import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Note } from '../models/note.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Load notes from localStorage only in browser environment
    if (this.isBrowser) {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        this.notesSubject.next(JSON.parse(savedNotes));
      }
    }
  }

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  addNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Observable<Note[]> {
    const currentNotes = this.notesSubject.value;
    const newNote: Note = {
      id: Date.now(),
      ...note,
      createdAt: new Date(),
      updatedAt: new Date(),
      color: note.color || this.generateRandomColor()
    };

    const updatedNotes = [...currentNotes, newNote];
    this.notesSubject.next(updatedNotes);
    this.saveToLocalStorage(updatedNotes);
    
    return this.getNotes();
  }

  updateNote(id: number, updatedNote: Partial<Note>): Observable<Note[]> {
    const currentNotes = this.notesSubject.value;
    const updatedNotes = currentNotes.map(note => 
      note.id === id 
        ? { ...note, ...updatedNote, updatedAt: new Date() } 
        : note
    );
    this.notesSubject.next(updatedNotes);
    this.saveToLocalStorage(updatedNotes);
    
    return this.getNotes();
  }

  deleteNote(id: number): Observable<Note[]> {
    const currentNotes = this.notesSubject.value;
    const updatedNotes = currentNotes.filter(note => note.id !== id);
    this.notesSubject.next(updatedNotes);
    this.saveToLocalStorage(updatedNotes);
    
    return this.getNotes();
  }

  private saveToLocalStorage(notes: Note[]) {
    if (this.isBrowser) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }

  private generateRandomColor(): string {
    const colors = [
      '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', 
      '#FDCB6E', '#6C5CE7', '#A8E6CF', '#FF8ED4'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
