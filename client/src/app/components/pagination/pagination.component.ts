import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cybaseal-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Output() dataToDisplayChange = new EventEmitter<any[]>(true);
  currentPage = 1;
  totalPages = 5;
  itemIndexStart = 1;
  itemIndexEnd = 1;
  buttonNumbers: number[] = [1];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.data) {
      this.update();
    }
  }

  update() {
    this.calculateButtonNumbers();

    this.itemIndexStart = this.getSmallest((this.currentPage - 1) * 10, this.data.length);
    this.itemIndexEnd = this.getSmallest(this.itemIndexStart + 10, this.data.length);
    const dataToDisplay = this.data.slice(this.itemIndexStart, this.itemIndexEnd);
    this.dataToDisplayChange.emit(dataToDisplay);
  }

  calculateButtonNumbers() {
    this.totalPages = Math.ceil(this.data.length / 10);
    this.totalPages = this.totalPages === 0 ? 1 : this.totalPages;
    this.currentPage = this.getSmallest(this.currentPage, this.totalPages);
    this.buttonNumbers = [];

    if (this.totalPages < 6) {
      for (let i = 1; i < this.totalPages + 1; i++) {
        this.buttonNumbers.push(i);
      }
    } else {
      this.buttonNumbers.push(1);

      if (this.currentPage < 4) {
        this.buttonNumbers.push(2);
        this.buttonNumbers.push(3);
        this.buttonNumbers.push(4);
      } else if (this.currentPage > this.totalPages - 3) {
        this.buttonNumbers.push(this.totalPages - 3);
        this.buttonNumbers.push(this.totalPages - 2);
        this.buttonNumbers.push(this.totalPages - 1);
      } else {
        this.buttonNumbers.push(this.currentPage - 1);
        this.buttonNumbers.push(this.currentPage);
        this.buttonNumbers.push(this.currentPage + 1);
      }

      this.buttonNumbers.push(this.totalPages);
    }
  }

  onNextClick() {
    this.currentPage++;
    this.update();
  }

  onPreviousClick() {
    this.currentPage--;
    this.update();
  }

  onPageClick(pageNumber: number) {
    this.currentPage = pageNumber;
    this.update();
  }

  getSmallest(toSet: number, compNumber: number): number {
    return toSet > compNumber ? compNumber : toSet;
  }
}
