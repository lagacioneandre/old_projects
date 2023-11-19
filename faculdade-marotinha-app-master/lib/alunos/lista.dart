import 'package:faculdademarotinhaapp/alunos/listStore.dart';
import 'package:faculdademarotinhaapp/alunos/models/alunoModel.dart';
import 'package:faculdademarotinhaapp/commons/cardList/cardList.dart';
import 'package:faculdademarotinhaapp/commons/cardList/models/Card.dart';
import 'package:faculdademarotinhaapp/commons/cardList/models/ContentCard.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';

class AlunoLista extends StatelessWidget {

  final ListStore listStore = ListStore();

  CardItem buildCard(dynamic item) {
    return new CardItem(title: item['name'], content: this.buildCardList(item));
  }

  List<ContentCard> buildCardList(dynamic item) {
    List<ContentCard> content = List<ContentCard>();

    ContentCard age = new ContentCard('Idade', item['age']);
    content.add(age);

    ContentCard cpf = new ContentCard('CPF', item['cpf']);
    content.add(cpf);

    ContentCard phone = new ContentCard('Phone', item['phone']);
    content.add(phone);

    return content;
  }

  @override
  Widget build(BuildContext context) {
    this.listStore.getAlunos();
    return Scaffold(
      body: ListView(
        padding: EdgeInsets.all(15),
        children: <Widget>[
          Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Observer(
                builder: (_) {
                  for (AlunoModel aluno in listStore.alunos)
                    return CardList(titleCard: aluno.name, values: this.buildCardList(aluno),);

                  return Container();
                },
              )
//              CardList(values: listStore.getAlunos(),),
//              CardList(),
//              CardList(),
//              CardList(),
//              CardList(),
            ],
          ),
        ],
      ),
    );
  }
}
