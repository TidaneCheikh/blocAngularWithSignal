import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { Subscription } from 'rxjs';
import { signal } from '@angular/core';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">My Notes</h2>
      <div *ngIf="notes().length === 0" class="text-gray-500 text-center">
        No notes yet. Create your first note!
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          *ngFor="let note of notes()" 
          class="p-4 rounded-lg shadow-md transition-all hover:scale-105"
          [style.background-color]="note.color"
        >
          <h3 class="font-bold text-lg mb-2">{{ note.title }}</h3>
          <p class="text-sm mb-2">{{ note.content }}</p>
          <div class="text-xs text-gray-600 flex justify-between">
            <span>Created: {{ note.createdAt | date }}</span>
            <button 
              (click)="deleteNote(note.id)"
              class="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes = signal<Note[]>([]);
  private notesSubscription: Subscription | null = null;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.notesSubscription = this.noteService.getNotes().subscribe(notes => {
      this.notes.set(notes);
    });
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
  }

  ngOnDestroy() {
    if (this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
  }
}
