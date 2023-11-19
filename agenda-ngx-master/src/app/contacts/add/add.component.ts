import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';

// validatros
import { CustomValidators } from 'ng2-validation';
import { GenericValidator } from '../../common/validation/generic-form-validator';

// services
import { ContatosService } from '../services/contatos.service';
import { EmitService } from '../../shared/services/emit.service';
import { PhonePipe } from '../../common/pipes/phone-mask.pipe';
import { MarkersService } from '../../markers/services/markers.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChild('boxImagem') private boxImagemRef: ElementRef<any>;

  private mensagensValidacao: any;
  private genericValidator: GenericValidator;
  public mostrarMensagens: object = {};
  public formContato: FormGroup;
  public progressoUpload: any;
  private idImagem: string;
  public urlImagem = '../../../assets/images/user.png';
  public textoLegenda = 'adicionarImagem';
  private idContato: string;
  public tituloPagina = 'adicionarContato';
  public markersList: Array<object> = [];

  constructor(
    private formBuilder: FormBuilder,
    private contatosService: ContatosService,
    private routerAc: ActivatedRoute,
    private router: Router,
    private emitService: EmitService,
    private phonePipe: PhonePipe,
    private markersService: MarkersService
  ) {
    this.idContato = this.routerAc.params['value']['id'];
    this.mensagensValidacaoForm();

    if (this.idContato) {
      this.tituloPagina = 'editarContato';
      this.obterContato();
    } else {
      this.emitService.loaderControle(false);
    }
  }

  ngOnInit() {
    this.montarForm();
    this.getAllMarkers();
  }

  private montarForm() {
    this.formContato = this.formBuilder.group({
      imagemContato: '',
      nomeContato: ['', [Validators.required, Validators.minLength(5)]],
      emailContato: ['', [Validators.required, CustomValidators.email]],
      telefoneContato: ['', [Validators.required]],
      descricaoContato: '',
      marcadorContato: '',
      contatoFavorito: false
    });
  }

  ngAfterViewInit() {
    this.formInputElements
      .map(
        (formControl: ElementRef) => {
          return fromEvent(formControl.nativeElement, 'blur')
            .subscribe(val => {
              this.mostrarMensagens = this.genericValidator.processMessages(this.formContato);
            });
        }
      );
  }

  private mensagensValidacaoForm() {
    this.mensagensValidacao = {
      nomeContato: {
        required: 'O nome precisa ser informado.',
        minlength: 'O tamanho minimo do nome é 5 caracteres.',
      },
      emailContato: {
        required: 'O e-mail precisa ser informado.',
        pattern: 'O e-mail informado não é valido.'
      },
      telefoneContato: {
        required: 'O telefone precisa ser informado.',
        pattern: 'O telefone informado é inválido.'
      }
    };

    this.genericValidator = new GenericValidator(this.mensagensValidacao);
  }

  public salvar() {
    let values = this.formContato.value;
    let contato = {
      nomeContato: values.nomeContato,
      emailContato: values.emailContato,
      telefoneContato: values.telefoneContato,
      descricaoContato: values.descricaoContato,
      linkImagem: this.urlImagem === '../../../assets/images/user.png' ? '' : this.urlImagem,
      marcador: values.marcadorContato,
      favorito: values.contatoFavorito,
      nomeImagem: this.idImagem || ''
    };

    if (this.idContato) {
      this.editarContato(contato);
    } else {
      this.salvarContato(contato);
    }
  }

  public uploadFoto(event) {
    if (this.idImagem) {
      this.removeImage(this.idImagem);
    }

    this.idImagem = Math.random().toString(32).substr(2);
    this.contatosService.salvarImagem(event.target.files[0], this.idImagem);
    this.progressoUpload = this.contatosService.uploadProgress;
    this.boxImagemRef.nativeElement.classList.add('upando-imagem');

    this.contatosService.task.then(
      () => {
        this.boxImagemRef.nativeElement.classList.remove('upando-imagem');
        this.boxImagemRef.nativeElement.classList.add('com-imagem');
        this.textoLegenda = 'alterarImagem';
        this.loadImage();
      },
      error => this.emitService.toasterConfig({
        tipo: 'error',
        titulo: 'Ooops : (',
        texto: error || 'Ocorreu algum erro ao fazer o upload da imagem!'
      })
    );
  }

  private limparForm() {
    this.formContato.reset();
    this.idImagem = '';
    this.boxImagemRef.nativeElement.classList.remove('upando-imagem,com-imagem');
    this.textoLegenda = 'adicionarImagem';
    this.urlImagem = '../../../assets/images/user.png';
  }

  private salvarContato(contato: object) {
    this.contatosService.salvarContato(contato)
      .then(
        () => {
          this.limparForm();
          this.emitService.toasterConfig({
            tipo: 'success',
            titulo: 'Contato salvo!',
            texto: 'O contato foi salvo com sucesso!'
          });
        },
        error => this.emitService.toasterConfig({
          tipo: 'error',
          titulo: 'Ooops : (',
          texto: error || 'Ocorreu algum erro ao salvar o contato!'
        })
      );
  }

  private editarContato(contato: object) {
    this.contatosService.salvarContatoEditado(contato, this.idContato)
      .then(
        () => {
          this.limparForm();
          this.emitService.toasterConfig({
            tipo: 'success',
            titulo: 'Contato editado!',
            texto: 'O contato foi editado com sucesso!'
          });

          const voltarLista = setTimeout(() => {
            this.router.navigate(['']);
            clearTimeout(voltarLista);
          }, 4000);
        },
        error => this.emitService.toasterConfig({
          tipo: 'error',
          titulo: 'Ooops : (',
          texto: error || 'Ocorreu algum erro ao salvar o contato!'
        })
      );
  }

  private obterContato() {
    this.contatosService.getFirebaseContacts().snapshotChanges()
      .subscribe(
        _resposta => {
          this.emitService.loaderControle(false);

          for (const contato of _resposta) {
            if (contato['key'] === this.idContato) {
              this.formContato.markAsDirty();
              const _contato = contato.payload.val();
              this.idImagem = _contato.nomeImagem;

              this.formContato.patchValue({
                nomeContato: _contato.nomeContato,
                emailContato: _contato.emailContato,
                telefoneContato: _contato.telefoneContato,
                descricaoContato: _contato.descricaoContato,
                marcadorContato: _contato.marcador,
                contatoFavorito: _contato.favorito
              });

              if (_contato.linkImagem) {
                this.urlImagem = _contato.linkImagem;
                this.textoLegenda = 'alterarImagem';
              } else {
                this.urlImagem = '../../../assets/images/user.png';
              }

              break;
            }
          }
        },
        error => {
          this.emitService.loaderControle(false);
          this.emitService.toasterConfig({
            tipo: 'error',
            titulo: 'Ooops : (',
            texto: error || 'Ocorreu algum erro ao obter os dados do contato!'
          });
        }
      );
  }

  private loadImage() {
    this.contatosService.dowloadImagem(this.idImagem)
      .subscribe(
        url => this.urlImagem = url,
        error => this.emitService.toasterConfig({
          tipo: 'error',
          titulo: 'Ooops : (',
          texto: error || 'Ocorreu algum erro ao obter a imagem!'
        })
      );
  }

  public maskPhone(value: string) {
    this.formContato.patchValue({
      telefoneContato: this.phonePipe.transform(value)
    });
  }

  private getAllMarkers() {
    this.markersService.getMarkers().snapshotChanges()
      .subscribe(
        _response => {
          this.markersList = [];

          _response.map(marker => {
            this.markersList.push({
              name: marker['payload'].val().name,
              id: marker['payload'].key
            });
          });
        },
        _error => {
          this.emitService.loaderControle(false);
          this.emitService.toasterConfig({
            tipo: 'error',
            titulo: 'Ooops : (',
            texto: _error || 'Ocorreu algum erro ao obter a lista de marcadores!'
          });
        }
      );
  }

  public back() {
    if (this.idImagem) {
      this.removeImage(this.idImagem);
    }
    window.history.back();
  }

  private removeImage(name: string) {
    this.contatosService.removeImage(name);
  }

}
