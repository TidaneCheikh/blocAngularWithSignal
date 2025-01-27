import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <form 
        (ngSubmit)="onSubmit()" 
        class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <h2 class="text-2xl font-bold mb-4 text-center">Create New Note</h2>
        <div class="mb-4">
          <label for="title" class="block text-gray-700 font-bold mb-2">Title</label>
          <input 
            type="text" 
            id="title" 
            [(ngModel)]="title" 
            name="title" 
            required 
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div class="mb-4">
          <label for="content" class="block text-gray-700 font-bold mb-2">Content</label>
          <textarea 
            id="content" 
            [(ngModel)]="content" 
            name="content" 
            required 
            rows="4" 
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="color" class="block text-gray-700 font-bold mb-2">Color</label>
          <select 
            id="color" 
            [(ngModel)]="color" 
            name="color" 
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Random Color</option>
            <option value="#FFD700">Gold</option>
            <option value="#FF6B6B">Coral</option>
            <option value="#4ECDC4">Turquoise</option>
            <option value="#45B7D1">Sky Blue</option>
          </select>
        </div>
        <button 
          type="submit" 
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Create Note
        </button>
      </form>
    </div>
  `,
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnDestroy {
  title = '';
  content = '';
  color = '';
  private subscription: Subscription | null = null;

  constructor(private noteService: NoteService) {}

  onSubmit() {
    if (this.title.trim() && this.content.trim()) {
      this.subscription = this.noteService.addNote({
        title: this.title,
        content: this.content,
        color: this.color
      }).subscribe(() => {
        // Reset form
        this.title = '';
        this.content = '';
        this.color = '';
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
