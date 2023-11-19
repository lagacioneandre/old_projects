import 'package:flutter/material.dart';

class CircleButton extends StatelessWidget {

  final Color buttonColor;
  final Color inkwelColor;
  final double size;
  final IconData icon;
  final Color iconColor;
  final double iconSize;
  final Function onTap;

  CircleButton({
    this.buttonColor,
    this.inkwelColor,
    this.size,
    this.icon,
    this.iconColor,
    this.iconSize,
    this.onTap
  });

  @override
  Widget build(BuildContext context) {
    return ClipOval(
      child: Material(
        color: this.buttonColor,
        child: InkWell(
          splashColor: this.inkwelColor,
          child: SizedBox(
              width: this.size,
              height: this.size,
              child: Icon(
                this.icon,
                color: this.iconColor ?? Colors.white,
                size: this.iconSize ?? 14,
              )
          ),
          onTap: this.onTap,
        ),
      ),
    );
  }
}
