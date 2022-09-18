import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Fiabe E Poesie';

  displayedColumns: string[] = [
    'nome',
    'cognome',
    'dataNascita',
    'iscrizione',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {}

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
        this.dataSource = new MatTableDataSource(kids);
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

  deleteKid(id: number) {
    this.api.deleteKid(id).subscribe({
      next: (res) => {
        this.getAllKids();
        alert('Bambino Eliminato!');
      },
      error: (error) => {
        console.log(error);
        alert('Qualcosa non ha funzionato, il bambino non è stato eliminato');
      },
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
}
