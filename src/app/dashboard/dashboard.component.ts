import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { identifierName } from '@angular/compiler';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

function compare(
  a: number | string | Date,
  b: number | string | Date,
  isAsc: boolean
) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'Fiabe E Poesie';

  allKids: Array<any> = [];

  displayedColumns: string[] = [
    'cognome',
    'nome',
    'iscrizione',
    'rettaMensile',
    'speseVarie',
    'attivita',
    'bolliFatture',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {}

  createKid() {
    this.dialog
      .open(DialogComponent, {
        width: '90%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllKids();
        }
      });
  }

  getAllKids() {
    this.api.getKids().subscribe({
      next: (kids) => {
        this.allKids = kids;
        this.dataSource = new MatTableDataSource(this.allKids);
        this.dataSource.filterPredicate = function (
          data,
          filter: string
        ): boolean {
          return data.cognome.toLowerCase().includes(filter);
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error);
        alert('Errore recupero bambini');
      },
    });
  }

  editKid(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '90%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllKids();
        }
      });
  }

  deleteKid(id: string) {
    this.api.deleteKid(id).subscribe({
      next: (res) => {
        this.getAllKids();
        this.openSnackBar('Bambino Eliminato!');
      },
      error: (error) => {
        console.log(error);
        this.openSnackBar(
          'Qualcosa non ha funzionato, il bambino non è stato eliminato'
        );
      },
    });
  }

  confirmDeleteDialog(row: any): void {
    const message = `Procedere all'eliminazione di ${row.nome} ${row.cognome}?`;

    const dialogData = new ConfirmDialogModel('Conferma', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteKid(row._id);
      }
    });
  }

  ngOnInit(): void {
    this.getAllKids();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      //this.sortedData = data;
      return;
    }

    this.allKids = this.allKids.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        // case 'name':
        //   return compare(a.name, b.name, isAsc);
        // case 'calories':
        //   return compare(a.calories, b.calories, isAsc);
        // case 'fat':
        //   return compare(a.fat, b.fat, isAsc);
        // case 'carbs':
        //   return compare(a.carbs, b.carbs, isAsc);
        // case 'protein':
        //   return compare(a.protein, b.protein, isAsc);
        case 'dataNascita':
          return compare(a.dataNascita, b.dataNascita, isAsc);
        default:
          return 0;
      }
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
