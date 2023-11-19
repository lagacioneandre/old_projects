import { Component, ViewChildren, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';

// plugins
import { CustomValidators } from 'ng2-validation';

// services
import { GenericValidator } from '../../../common/validation/generic-form-validator';
import { LoginService } from './services/login.service';
import { EmitService } from '../../services/emit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public urlAcessada: string;
  public erroLogin = false;
  public logando = false;
  public formLogin: FormGroup;
  private genericValidator: GenericValidator;
  public menssagensValidacao: {
    [key: string]: {
      [key: string]: string
    }
  };
  public mostrarMensagens: {
    [key: string]: string
  } = {};

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private emitService: EmitService
  ) {
    this.menssagensValidacaoForm();

    this.loginService.emitLoginError$
      .subscribe(
        () => {
          this.erroLogin = true;
          this.logando = false;
        }
      );
  }

  ngOnInit() {
    this.montarForm();
    this.emitService.loaderControle(false);
    this.urlAcessada = this.emitService.getUrlAcessada();
  }

  ngAfterViewInit() {
    this.mapearInputs();
  }

  private montarForm() {
    this.formLogin = this.formBuilder.group({
      email: ['teste@teste.com.br', [Validators.required, CustomValidators.email]],
      senha: ['102030', [Validators.required, Validators.minLength(5)]]
    });

    this.formLogin.markAsDirty();
  }

  private mapearInputs() {
    this.formInputElements
      .map(
        (formControl: ElementRef) => {
          return fromEvent(formControl.nativeElement, 'blur')
            .subscribe(
              () => this.mostrarMensagens = this.genericValidator.processMessages(this.formLogin)
            );
        }
      );
  }

  private menssagensValidacaoForm() {
    this.menssagensValidacao = {
      email: {
        required: 'O campo e-mail é obrigatório.',
        email: 'E-mail inválido.'
      },
      senha: {
        required: 'O campo senha é obrigatório.',
        minlength: 'A quantidade mínima é 5 caractéres.'
      }
    };

    this.genericValidator = new GenericValidator(this.menssagensValidacao);
  }

  public login(email: string, passs: string) {
    this.logando = true;

    this.loginService.login(email, passs, this.urlAcessada).then(() => {
      this.erroLogin = false;
    });
  }

}
