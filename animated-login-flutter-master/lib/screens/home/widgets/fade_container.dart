import 'package:flutter/material.dart';

class FadeContainer extends StatelessWidget {

  final Animation<Color> fadeAnimation;
  FadeContainer({this.fadeAnimation});

  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: 'fade',
      child: Container(
        color: fadeAnimation.value,
      ),
    );
  }
}
