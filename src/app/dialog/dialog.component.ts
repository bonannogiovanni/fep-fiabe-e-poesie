import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  section = ['N', 'P', 'I'];

  kidForm!: FormGroup;

  actionBtn: string = 'Salva';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public kidData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.kidForm = this.formBuilder.group({
      _id: [''],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      dataNascita: [''],
      luogoNascita: [''],
      cf: [''],
      indirizzo: [''],
      sezione: [''],
      nomePadre: [''],
      telefonoPadre: [''],
      cfPadre: [''],
      emailPadre: [''],
      nomeMadre: [''],
      telefonoMadre: [''],
      cfMadre: [''],
      emailMadre: [''],
      altriRecapiti: [''],
      allergie: [''],

      iscrizione: [0],
      bolliFatture: [0],
      speseVarie: [0],
      attivita: [0],
      rettaMensile: [0],
      prescuola: [0],
      altriServizi: [0],
    });

    if (this.kidData) {
     

      this.patchForm([
        '_id',
        'nome',
        'cognome',
        'dataNascita',
        'luogoNascita',
        'cf',
        'indirizzo',
        'sezione',
        'nomePadre',
        'telefonoPadre',
        'cfPadre',
        'emailPadre',
        'nomeMadre',
        'telefonoMadre',
        'cfMadre',
        'emailMadre',
        'altriRecapiti',
        'allergie',
        'iscrizione',
        'bolliFatture',
        'speseVarie',
        'attivita',
        'rettaMensile',
        'prescuola',
        'altriServizi',
      ]);

      this.actionBtn = 'Modifica';
    }
  }

  addOrUpdateKid() {
    if (!this.kidData) {
      console.log(this.kidForm);
      if (this.kidForm.valid) {
        console.log('valid!');
        this.api.createKid(this.kidForm.value).subscribe({
          next: (res) => {
            this.openSnackBar('Bambino Creato!');
            this.dialogRef.close('save');
            this.kidForm.reset();
          },
          error: (error) => {
            console.log(error);
            this.openSnackBar('Qualcosa non ha funzionato, il bambino non è stato creato');
          },
        });
      }
    } else {
      if (this.kidForm.valid) {
        this.api.updateKid(this.kidForm.value, this.kidData._id).subscribe({
          next: (res) => {
            this.openSnackBar('Bambino Modificato!');
            this.dialogRef.close('update');
            this.kidForm.reset();
          },
          error: (error) => {
            console.log(error);
            this.openSnackBar(
              'Qualcosa non ha funzionato, il bambino non è stato modificato'
            );
          },
        });
      }
    }
  }

  private patchForm(controls: string[]) {
    for (let control of controls) {
      this.kidForm.patchValue({ [control]: this.kidData[control] });
    }
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
