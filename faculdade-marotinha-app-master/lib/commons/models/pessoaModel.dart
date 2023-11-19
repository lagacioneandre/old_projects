import 'package:flutter/cupertino.dart';

class PessoaModel {
  final String name;
  final int age;
  final String cpf;
  final String phone;

  PessoaModel({
    @required this.name,
    @required this.age,
    @required this.cpf,
    @required this.phone
  });
}