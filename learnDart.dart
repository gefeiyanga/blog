void main(List<String> args) => runApp();


// 下面示例向你展示了一个包含三个属性、两个构造函数以及一个方法的类。
// 其中一个属性不能直接赋值，因此它被定义为一个getter方法（而不是变量）

class Spacecraft {
  String name;
  DateTime launchDate;

  // 构造函数，带有可以直接为成员变量赋值的语法糖
  Spacecraft(this.name, this.launchDate) {
    // 这里可以实现初始化代码
  }

  // 命名构造函数，转发到默认构造函数
  Spacecraft.unlaunched(String name, DateTime launchDate) : this(name, launchDate);

  int get launchYear => launchDate?.year;  // 只读的非 final 的属性

  // 方法
  void describe() {
    print('宇宙飞船：$name');
    if (launchDate != null) {
      int years = DateTime.now().difference(launchDate).inDays ~/ 365;
      print('发射时间：$launchYear($years years ago)');
    } else {
      print('尚未发射');
    }
  }
}

void runApp() {
  var voyager = Spacecraft('旅行者一号', DateTime(1977, 9, 5));
  voyager.describe();

  var voyager3 = Spacecraft.unlaunched('旅行者三号', DateTime(1976, 9, 5));
  voyager3.describe();
}

class Point {
  double x;
  double y;
}

void learn() {
  var point = Point();
  point.x = 4;  // 使用 x 的Setter方法（隐式定义）
  print(point.x == 4);
  print(point.y == null); 
}
