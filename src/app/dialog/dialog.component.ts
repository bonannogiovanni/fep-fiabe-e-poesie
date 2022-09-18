import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.kidForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      sezione: ['', Validators.required],
      iscrizione: ['', Validators.required],
      dataNascita: ['', Validators.required],
      allergie: ['', Validators.required],
    });

    if (this.kidData) {
      this.kidForm.patchValue({
        nome: this.kidData.nome,
        cognome: this.kidData.cognome,
        dataNascita: this.kidData.dataNascita,
        sezione: this.kidData.sezione,
        iscrizione: this.kidData.iscrizione,
        allergie: this.kidData.allergie,
      });

      this.actionBtn = 'Modifica';
    }
  }

  addOrUpdateKid() {
    if (!this.kidData) {
      if (this.kidForm.valid) {
        this.api.createKid(this.kidForm.value).subscribe({
          next: (res) => {
            alert('Bambino Creato!');
            this.dialogRef.close('save');
            this.kidForm.reset();
          },
          error: (error) => {
            console.log(error);
            alert('Qualcosa non ha funzionato, il bambino non è stato creato');
          },
        });
      }
    }
    else{
      if (this.kidForm.valid) {
        this.api.updateKid(this.kidForm.value, this.kidData.id).subscribe({
          next: (res) => {
            alert('Bambino Modificato!');
            this.dialogRef.close('update');
            this.kidForm.reset();
          },
          error: (error) => {
            console.log(error);
            alert('Qualcosa non ha funzionato, il bambino non è stato modificato');
          },
        });
      }

    }
  }
}
