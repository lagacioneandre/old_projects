import 'package:faculdademarotinhaapp/commons/models/pessoaModel.dart';

class AlunoModel extends PessoaModel {

  AlunoModel({
    name,
    age,
    cpf,
    phone
  }) :
  super(
      name: name,
      age: age,
      cpf: cpf,
      phone: phone
  );

}