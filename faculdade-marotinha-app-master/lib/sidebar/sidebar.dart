import 'package:faculdademarotinhaapp/sidebar/item_menu.dart';
import 'package:flutter/material.dart';

class Sidebar extends StatelessWidget {

  final PageController controller;
  Sidebar(@required this.controller);

  Widget _buildDrawerBack(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).primaryColor
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Stack(
        children: <Widget>[
          _buildDrawerBack(context),
          ListView(
            padding: EdgeInsets.all(20),
            children: <Widget>[
              ItemMenu(Icons.person, 'Alunos', this.controller, 0),
              ItemMenu(Icons.description, 'Boletins', this.controller, 1),
              ItemMenu(Icons.keyboard, 'Cursos', this.controller, 2),
              ItemMenu(Icons.book, 'Matérias', this.controller, 3),
              ItemMenu(Icons.speaker_notes, 'Professores', this.controller, 4),
              ItemMenu(Icons.people, 'Turmas', this.controller, 5),
            ],
          )
        ],
      ),
    );
  }
}
