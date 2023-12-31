import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Home(),
    )
  );
}

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  TextEditingController weightController = TextEditingController();
  TextEditingController heightController = TextEditingController();
  String _infoText = "Informe seus dados!";
  GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  void _resetFields() {
    weightController.text = "";
    heightController.text = "";

    setState(() {
      _infoText = "Informe seus dados!";
      _formKey = GlobalKey<FormState>();
    });
  }

  void _calculate() {
    setState(() {
      double weight = double.parse(weightController.text);
      double height = double.parse(heightController.text) / 100;
      double imc = weight / (height * height);
      _printMessage(imc);
    });
  }

  void _printMessage(double imc) {
    setState(() {
      if (imc < 18.6) {
        _infoText = "Abaixo do peso, IMC ${imc.toStringAsPrecision(2)}";
      } else if (imc >= 18.6 && imc < 24.9) {
        _infoText = "Peso ideal, IMC ${imc.toStringAsPrecision(2)}";
      } else if (imc >= 24.9 && imc < 29.9) {
        _infoText = "Levemente acima do peso, IMC ${imc.toStringAsPrecision(2)}";
      } else if (imc >= 29.9 && imc < 34.9) {
        _infoText = "Obesidade grau I, IMC ${imc.toStringAsPrecision(2)}";
      } else if (imc >= 34.9 && imc < 39.9) {
        _infoText = "Obesidade grau II, IMC ${imc.toStringAsPrecision(2)}";
      } else if (imc >= 40) {
        _infoText = "Obesidade grau III, IMC ${imc.toStringAsPrecision(2)}";
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Calculadora de IMC"),
        centerTitle: true,
        backgroundColor: Colors.green,
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: _resetFields,
          )
        ],
      ),
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
        child: Form(
          key: _formKey,
          child:  Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Icon(
                Icons.person_outline,
                size: 120,
                color: Colors.green,
              ),
              TextFormField(
                keyboardType: TextInputType.number,
                decoration: InputDecoration(
                    labelText: "Peso (kg)",
                    labelStyle: TextStyle(
                        color: Colors.green
                    )
                ),
                controller: weightController,
                validator: (values) {
                  if (values.isEmpty) {
                    return "Informe seu peso!";
                  }
                },
              ),
              TextFormField(
                keyboardType: TextInputType.number,
                decoration: InputDecoration(
                    labelText: "Altura (cm)",
                    labelStyle: TextStyle(
                        color: Colors.green
                    )
                ),
                controller: heightController,
                validator: (values) {
                  if (values.isEmpty) {
                    return "Informe seu peso!";
                  }
                },
              ),
              Padding(
                padding: EdgeInsets.only(top: 10, bottom: 10),
                child: Container(
                  height: 50,
                  child: RaisedButton(
                    onPressed: () {
                      if (_formKey.currentState.validate()) {
                        _calculate();
                      }
                    },
                    child: Text(
                      "Calcular",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 25
                      ),
                    ),
                    color: Colors.green,
                  ),
                ),
              ),
              Text(
                _infoText,
                textAlign: TextAlign.center,
                style: TextStyle(
                    color: Colors.green,
                    fontSize: 25
                ),
              )
            ],
          ),
        )
      ),
    );
  }
}
