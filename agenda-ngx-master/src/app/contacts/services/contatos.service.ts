import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

import { Observable } from 'rxjs';

@Injectable()
export class ContatosService {
  private ref: AngularFireStorageReference;
  public task: AngularFireUploadTask;
  public uploadProgress: Observable<number>;

  constructor(
    private dataBase: AngularFireDatabase,
    private storage: AngularFireStorage
  ) { }

  public getFirebaseContacts(): AngularFireList<any> {
    return this.dataBase.list('contatos');
  }

  public salvarContato(dadosContato: object): any {
    return this.dataBase.list('contatos').push(dadosContato);
  }

  public salvarImagem(file: any, id: string): any {
    this.ref = this.storage.ref(id);
    this.task = this.ref.put(file);
    this.uploadProgress = this.task.percentageChanges();
  }

  public dowloadImagem(nome: string): any {
    const ref = this.storage.ref(nome);
    return ref.getDownloadURL();
  }

  public favoritarContato(dadosContato: object): any {
    const baseItems = this.obterContatos();
    const id = dadosContato['id'];
    delete dadosContato['id'];

    return baseItems.update(id, dadosContato);
  }

  public removerContato(idContato: string): any {
    const baseItems = this.obterContatos();
    return baseItems.remove(idContato);
  }

  public salvarContatoEditado(contato: object, id: string) {
    const baseItems = this.obterContatos();
    return baseItems.update(id, contato);
  }

  private obterContatos(): any {
    return this.dataBase.list('contatos');
  }

  public removeImage(name: string): any {
    this.ref = this.storage.ref(name);
    return this.ref.delete();
  }
}
