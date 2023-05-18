import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IClient } from 'src/app/model/IClient';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-restablish-password',
  templateUrl: './restablish-password.component.html',
  styleUrls: ['./restablish-password.component.scss'],
})
export class RestablishPasswordComponent implements OnInit {
  client: IClient;

  dni: string = '';
  email: string = '';
  password: string = '';

  showInput: boolean = false;

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService,
    private clientService: ClientService
  ) {
    this.form = formBuilder.group({
      dni: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern('^[0-9]{8}[A-Z]{1}$'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-z0-9A-Z]{0,}[A-Z]{1}[a-z0-9A-Z]{1,}[@]{1}[a-z]{1,}[.]{1}[a-z]{1,}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.minLength(4),
          Validators.pattern('^([a-z0-9A-Z]*[-_.,ºª*+-Ç]*)*$'),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  setNewPassword() {
    if (!this.form.value.dni || !this.form.value.email) {
      this.toastr.error(
        this.translate.instant('enterData'),
        this.translate.instant('error')
      );
    } else if (this.form.valid) {
      /* this.showInput = true; */
      this.clientService.getByDni(this.form.value.dni).subscribe(
        (data) => {
          if (data === null || data === undefined) {
            this.toastr.error(
              this.translate.instant('notExist'),
              this.translate.instant('error')
            );
          } else {
            if (this.form.value.email != data.email) {
              this.toastr.error(
                this.translate.instant(
                  '"los datos no son los que se esperaban"'
                ),
                this.translate.instant('error')
              );
            } else {
              /* this.clientService. */
            }
          }
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(
            this.translate.instant('errorServer'),
            this.translate.instant('error')
          );
        }
      );
    }
  }
}
