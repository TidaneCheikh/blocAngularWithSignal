import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteFormComponent } from './components/note-form/note-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NoteListComponent, 
    NoteFormComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-blue-600 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-3xl font-bold">Note Manager</h1>
        </div>
      </header>
      <main class="container mx-auto p-4">
        <div class="grid md:grid-cols-2 gap-8">
          <app-note-form></app-note-form>
          <app-note-list></app-note-list>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Note Manager';
}
