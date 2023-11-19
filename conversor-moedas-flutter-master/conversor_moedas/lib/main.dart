import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

const request = "https://api.hgbrasil.com/finance?format=json&key=40261fa6";

void main() async {
  runApp(MaterialApp(
    home: Home(),
    theme: ThemeData(
      hintColor: Colors.amber,
      primaryColor: Colors.white,
      inputDecorationTheme: InputDecorationTheme(
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(
            color: Colors.white
          )
        )
      )
    ),
  ));
}

Future<Map> getData() async {
  http.Response response = await http.get(request);
  return json.decode(response.body);
}

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {

  final realController = TextEditingController();
  final dolarController = TextEditingController();
  final euroController = TextEditingController();

  double dolar;
  double euro;

  void _realChanged(String text) {
    if(text.isEmpty) {
      _clearAll();
      return;
    }

    double _real = double.parse(text);
    this.dolarController.text = (_real / dolar).toStringAsFixed(2);
    this.euroController.text = (_real / euro).toStringAsFixed(2);
  }
  void _dolarChanged(String text) {
    if(text.isEmpty) {
      _clearAll();
      return;
    }

    double _dolar = double.parse(text);
    this.realController.text = (_dolar * this.dolar).toStringAsFixed(2);
    this.euroController.text = (_dolar * this.dolar / euro).toStringAsFixed(2);
  }
  void _euroChanged(String text) {
    if(text.isEmpty) {
      _clearAll();
      return;
    }

    double _euro = double.parse(text);
    this.realController.text = (_euro * this.dolar).toStringAsFixed(2);
    this.dolarController.text = (_euro * this.dolar / euro).toStringAsFixed(2);
  }

  void _clearAll(){
    this.realController.text = "";
    this.dolarController.text = "";
    this.euroController.text = "";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: Text("\$ Conversor \$"),
        backgroundColor: Colors.amber,
        centerTitle: true,
      ),
      body: FutureBuilder<Map>(
        future: getData(),
        builder: (context, snapshot) {
          switch(snapshot.connectionState){
            case ConnectionState.none:
            case ConnectionState.waiting:
              return Center(
                child: Text(
                  "Carregando Dados...",
                  style: TextStyle(
                    color: Colors.amber,
                    fontSize: 25
                  ),
                  textAlign: TextAlign.center,
                ),
              );
            default:
              if (snapshot.hasError) {
                return Center(
                  child: Text(
                    "Erro ao carregar dados :(",
                    style: TextStyle(
                        color: Colors.amber,
                        fontSize: 25
                    ),
                    textAlign: TextAlign.center,
                  ),
                );
              } else {
                this.dolar = snapshot.data["results"]["currencies"]["USD"]["buy"];
                this.euro = snapshot.data["results"]["currencies"]["EUR"]["buy"];

                return SingleChildScrollView(
                  padding: EdgeInsets.all(10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: <Widget>[
                      Icon(
                        Icons.monetization_on,
                        size: 150,
                        color: Colors.amber,
                      ),
                      buildTextFiled("Reais", "R\$ ", this.realController, this._realChanged),
                      Divider(),
                      buildTextFiled("Dolares", "US\$ ", this.dolarController, this._dolarChanged),
                      Divider(),
                      buildTextFiled("Euros", "€ ", this.euroController, this._euroChanged),
                      Divider(),
                      buildCurrencyValue("US\$ 1,00 = R\$ " +  dolar.toStringAsFixed(2)),
                      Divider(),
                      buildCurrencyValue("€ 1,00 = R\$ " + euro.toStringAsFixed(2)),
                    ],
                  ),
                );
              }
          }
        }
      ),
    );
  }
}

Widget buildTextFiled(String label, String prefix, TextEditingController controller, Function onChanged) {
  return TextField(
    controller: controller,
    decoration: InputDecoration(
      labelText: label,
      labelStyle: TextStyle(
          color: Colors.amber
      ),
      border: OutlineInputBorder(),
      prefixText: prefix,
    ),
    style: TextStyle(
        color: Colors.amber,
        fontSize: 25
    ),
      onChanged: onChanged,
    keyboardType: TextInputType.numberWithOptions(
      decimal: true
    ),
  );
}
Widget buildCurrencyValue(String text) {
  return Text(
    text,
    style: TextStyle(
        color: Colors.amber,
        fontSize: 25
    ),
    textAlign: TextAlign.center,
  );
}
