import 'dart:convert';

import 'package:faculdademarotinhaapp/alunos/models/alunoModel.dart';
import 'package:faculdademarotinhaapp/commons/cardList/models/Card.dart';
import 'package:faculdademarotinhaapp/config/environment.dart';
import 'package:mobx/mobx.dart';
import 'package:http/http.dart' as http;

part 'listStore.g.dart';

class ListStore =_ListStore with _$ListStore;

abstract class _ListStore with Store {
  final String baseUrl = Environment.baseUrl();

  ObservableList<AlunoModel> alunos = ObservableList<AlunoModel>();

  @action
  void getAlunos() async {
    final http.Response response = await http.post('$baseUrl/aluno/list');
    print(json.decode(response.body)['content']);
    this.parseAlunos(json.decode(response.body)['content']);
  }

  void parseAlunos(List<dynamic> response) {
    response.map((value) => {
      this.alunos.add(
          new AlunoModel(
            name: value['name'],
            age: value['age'],
            cpf: value['cpf'],
            phone: value['phone']
        )
      )

    }).toList();
    print(this.alunos);
  }

}