import 'package:flutter/material.dart';

class ItemMenu extends StatelessWidget {

  final IconData icon;
  final String text;
  final PageController pageController;
  final int page;

  ItemMenu(this.icon, this.text, this.pageController, this.page);

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {
          Navigator.of(context).pop();
          this.pageController.jumpToPage(this.page);
        },
        child: Container(
          height: 60,
          child: Row(
            children: <Widget>[
              Icon(
                this.icon,
                size: 32,
                color: this.pageController.page.round() == this.page ? Colors.white : Colors.grey[500],
              ),
              SizedBox(
                width: 32,
              ),
              Text(
                this.text,
                style: TextStyle(
                  fontSize: 16,
                  color: this.pageController.page.round() == this.page ? Colors.white : Colors.grey[500],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
