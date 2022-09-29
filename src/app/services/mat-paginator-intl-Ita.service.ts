import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlIta extends MatPaginatorIntl {
  constructor() {
    super();
    this.itemsPerPageLabel = 'Elementi per pagina';
    this.nextPageLabel = 'Pagina Successiva';
    this.previousPageLabel = 'Pagina Precedente';
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return '0 di ' + length;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' di ' + length;
  };
}
