import 'package:flutter/cupertino.dart';

class PaginationModel<T> {
  final List<T> content;
  final int totalElements;
  final int totalPages;
  final bool last;
  final bool first;
  final int size;
  final int number;
  final int numberOfElements;

  PaginationModel({
    @required this.content,
    @required this.totalElements,
    @required this.totalPages,
    @required this.last,
    @required this.first,
    @required this.size,
    @required this.number,
    @required this.numberOfElements,
  });
}