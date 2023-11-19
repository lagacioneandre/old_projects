import 'package:faculdademarotinhaapp/alunos/create.dart';
import 'package:faculdademarotinhaapp/alunos/lista.dart';
import 'package:faculdademarotinhaapp/boletins/create.dart';
import 'package:faculdademarotinhaapp/boletins/lista.dart';
import 'package:faculdademarotinhaapp/cursos/create.dart';
import 'package:faculdademarotinhaapp/cursos/lista.dart';
import 'package:faculdademarotinhaapp/home/build_page.dart';
import 'package:faculdademarotinhaapp/materias/create.dart';
import 'package:faculdademarotinhaapp/materias/lista.dart';
import 'package:faculdademarotinhaapp/professores/create.dart';
import 'package:faculdademarotinhaapp/professores/lista.dart';
import 'package:faculdademarotinhaapp/turmas/create.dart';
import 'package:faculdademarotinhaapp/turmas/lista.dart';
import 'package:flutter/material.dart';

class Home extends StatelessWidget {

  final _pageController = PageController();

  @override
  Widget build(BuildContext context) {
    return PageView(
      controller: _pageController,
      physics: NeverScrollableScrollPhysics(),
      children: <Widget>[
        BuildPage('Alunos', AlunoLista(), this._pageController, AlunoCreate()),
        BuildPage('Boletins', BoletimLista(), this._pageController, BoletimCreate()),
        BuildPage('Cursos', CursosLista(), this._pageController, CursosCreate()),
        BuildPage('Matérias', MateriasLista(), this._pageController, MateriasCreate()),
        BuildPage('Professores', ProfessoresLista(), this._pageController, ProfessoresCreate()),
        BuildPage('Turmas', TurmasLista(), this._pageController, TurmasCreate()),
      ],
    );
  }
}
