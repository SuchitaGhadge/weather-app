import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private searchHistory: string[] = [];

  addSearchQuery(query: string): void {
    this.searchHistory.unshift(query);
    if (this.searchHistory.length > 5) {
      this.searchHistory.pop();
    }
  }

  getSearchHistory(): string[] {
    return this.searchHistory;
  }
}
