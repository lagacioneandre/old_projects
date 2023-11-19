import 'package:campominado/components/campo_widget.dart';
import 'package:campominado/components/resultado_widget.dart';
import 'package:campominado/components/tabuleiro_widget.dart';
import 'package:campominado/models/campo.dart';
import 'package:campominado/models/explosao_exception.dart';
import 'package:campominado/models/tabuleiros.dart';
import 'package:flutter/material.dart';

class CampoMinadoApp extends StatefulWidget {

  @override
  _CampoMinadoAppState createState() => _CampoMinadoAppState();
}

class _CampoMinadoAppState extends State<CampoMinadoApp> {
  bool _venceu = null;
  Tabuleiro _tabuleiro;

  void _reiniciar() {
    setState(() {
      _venceu = null;
      _tabuleiro.reiniciar();
    });
  }

  void _abrir(Campo c) {
    if (_venceu != null) {
      return;
    }

    setState(() {
      try {
        c.abrir();

        if (_tabuleiro.resolvido) {
          _venceu = true;
        }
      } on ExplosaoException {
        _venceu = false;
        _tabuleiro.revelarBombas();
      }
    });
  }

  void _alternarMarcacao(Campo c) {
    if (_venceu != null) {
      return;
    }

    setState(() {
      c.alternarMarcacao();
      if (_tabuleiro.resolvido) {
        _venceu = true;
      }
    });
  }

  Tabuleiro _getTabuleiro(double largura, double altura) {
    if (_tabuleiro == null) {
      int qtdeColunas = 15;
      double tamanhoCampo = largura / qtdeColunas;
      int qtdeLinhas = (altura / tamanhoCampo).floor();

      _tabuleiro = Tabuleiro(
        linhas: qtdeLinhas,
        colunas: qtdeColunas,
        qtdeBombas: 10
      );
    }

    return _tabuleiro;
  }

  @override
  Widget build(BuildContext context) {
    Campo campo = Campo(linha: 0, coluna: 0);

    return MaterialApp(
      home: Scaffold(
        appBar: ResultadoWidget(
          venceu: _venceu,
          onReiniciar: _reiniciar,
        ),
        body: Container(
          color: Colors.grey,
          child: LayoutBuilder(
            builder: (ctx, constraints) {
              return TabuleiroWidget(
                  tabuleiro: _getTabuleiro(
                      constraints.maxWidth,
                      constraints.maxHeight
                  ),
                  onAbrir: _abrir,
                  onAlternarMarcacao: _alternarMarcacao
              );
            },
          ),
        ),
      ),
    );
  }
}
