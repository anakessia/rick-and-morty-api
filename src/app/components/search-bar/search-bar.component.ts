import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();
  searchTerm: string = '';

  constructor() {}

  onInputChange() {
    this.filterChange.emit(this.searchTerm.trim());
  }
}
