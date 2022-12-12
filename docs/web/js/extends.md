# JS 常见的 6 种继承方式

## 原型链继承
原型链继承是比较常见的继承方式之一，其中涉及的构造函数、原型和实例，三者之间存在着一定的关系，即每一个构造函数都有一个原型对象，原型对象又包含一个指向构造函数的指针，而实例则包含一个原型对象的指针。例如：
```js
function Parent1() {
    this.name = 'parent1';
    this.play = [1, 2, 3]
}
function Child1() {
    this.type = 'child2';
}
Child1.prototype = new Parent1();
console.log(new Child1());
```
上面的代码其实有一个潜在的问题，例如：
```js
var s1 = new Child1();
var s2 = new Child1();
s1.play.push(4);
console.log(s1.play);
console.log(s2.play);
```
执行结果如下：
![](/web/27.png)
当我修改了s1的play属性的时候，s2的play属性也跟着变了，因为两个实例使用的是同一个原型对象。它们的内存空间是共享的，当一个发生变化的时候，另外一个也随之进行了变化，这就是使用原型链继承方式的一个缺点。

## 构造函数继承(借助 call)
```js
function Parent1(){
    this.name = 'parent1';
}

Parent1.prototype.getName = function () {
    return this.name;
}

function Child1(){
    Parent1.call(this);
    this.type = 'child1'
}

let child = new Child1();
console.log(child);  // 没问题
console.log(child.getName());  // 会报错
```
运行结果如下：
![](/web/28.png)
除了 Child1 的属性 type 之外，也继承了 Parent1 的属性 name。这样写的时候子类虽然能够拿到父类的属性值，解决了第一种继承方式的弊端，但问题是，父类原型对象中一旦存在父类之前自己定义的方法，那么子类将无法继承这些方法。

因此构造函数实现继承的优缺点，它使父类的引用属性不会被共享，优化了第一种继承方式的弊端；但是随之而来的缺点也比较明显——只能继承父类的实例属性和方法，不能继承原型属性或者方法。

## 组合继承(前两种组合)
这种方式结合了前两种继承方式的优缺点，结合起来的继承，代码如下：
```js
  function Parent3 () {
    this.name = 'parent3';
    this.play = [1, 2, 3];
  }
  Parent3.prototype.getName = function () {
    return this.name;
  }
  function Child3() {
    // 第二次调用 Parent3()
    Parent3.call(this);
    this.type = 'child3';
  }

  // 第一次调用 Parent3()
  Child3.prototype = new Parent3();
  // 手动挂上构造器，指向自己的构造函数
  Child3.prototype.constructor = Child3;
  var s3 = new Child3();
  var s4 = new Child3();
  s3.play.push(4);
  console.log(s3.play);  // 不互相影响
  console.log(s4.play);
  console.log(s3.getName()); // 正常输出'parent3'
  console.log(s4.getName()); // 正常输出'parent3'
```
结果如下：
![](/web/29.png)
之前方法一和方法二的问题都得以解决，但是这里又增加了一个新问题：通过注释我们可以看到 Parent3 执行了两次，第一次是改变Child3 的 prototype 的时候，第二次是通过 call 方法调用 Parent3 的时候，那么 Parent3 多构造一次就多进行了一次性能开销。

## 原型式继承
ES5 里面的 Object.create 方法，这个方法接收两个参数：一是用作新对象原型的对象、二是为新对象定义额外属性的对象(可选参数)。
```js
let parent4 = {
    name: "parent4",
    friends: ["p1", "p2", "p3"],
    getName: function() {
        return this.name;
    }
};

let person4 = Object.create(parent4);
person4.name = "tom";
person4.friends.push("jerry");

let person5 = Object.create(parent4);
person5.friends.push("lucy");

console.log(person4.name);
console.log(person4.name === person4.getName());
console.log(person5.name);
console.log(person4.friends);
console.log(person5.friends);
```
执行结果如下：
![](/web/30.png)

通过 Object.create 这个方法可以实现普通对象的继承，不仅仅能继承属性，同样也可以继承 getName 的方法。前三个输出都是正常的，最后两个输出结果一致是因为Object.create 方法是可以为一些对象实现浅拷贝的，那么关于这种继承方式的缺点也很明显，多个实例的引用类型属性指向相同的内存。

## 寄生式继承
使用原型式继承可以获得一份目标对象的浅拷贝，然后利用这个浅拷贝的能力再进行增强，添加一些方法，这样的继承方式就叫作寄生式继承。

虽然其优缺点和原型式继承一样，但是对于普通对象的继承方式来说，寄生式继承相比于原型式继承，还是在父类基础上添加了更多的方法。实现如下：
```js
let parent5 = {
    name: "parent5",
    friends: ["p1", "p2", "p3"],
    getName: function() {
        return this.name;
    }
};

function clone(original) {
    let clone = Object.create(original);
    clone.getFriends = function() {
        return this.friends;
    };
    return clone;
}

let person5 = clone(parent5);

console.log(person5.getName());
console.log(person5.getFriends());
```
输出结果如下：
![](/web/31.png)

从最后的输出结果中可以看到，person5 通过 clone 的方法，增加了 getFriends 的方法，从而使 person5 这个普通对象在继承过程中又增加了一个方法，这样的继承方式就是寄生式继承。

## 寄生组合式继承
结合第四种中提及的继承方式，解决普通对象的继承问题的 Object.create 方法，我们在前面这几种继承方式的优缺点基础上进行改造，得出了寄生组合式的继承方式，这也是所有继承方式里面相对最优的继承方式，代码如下：
```js
function clone (parent, child) {
    // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}

function Parent6() {
    this.name = 'parent6';
    this.play = [1, 2, 3];
}
Parent6.prototype.getName = function () {
    return this.name;
}
function Child6() {
    Parent6.call(this);
    this.friends = 'child5';
}

clone(Parent6, Child6);
    Child6.prototype.getFriends = function () {
    return this.friends;
}

let person6 = new Child6();
console.log(person6);
console.log(person6.getName());
console.log(person6.getFriends());
```
执行结果如下：
![](/web/32.png)
这种寄生组合式继承方式，基本可以解决前几种继承方式的缺点，较好地实现了继承想要的结果，同时也减少了构造次数，减少了性能的开销。整体看下来，这六种继承方式中，寄生组合式继承是这六种里面最优的继承方式。

## ES6的extends关键字实现逻辑
ES6提供了extends语法糖，使用关键字很容易实现JavaScript的继承，先看一下extends使用方法。
```js
class Person {
  constructor(name) {
    this.name = name
  }
  // 原型方法
  // 即 Person.prototype.getName = function() { }
  // 下面可以简写为 getName() {...}
  getName = function () {
    console.log('Person:', this.name)
  }
}
class Gamer extends Person {
  constructor(name, age) {
    // 子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    super(name)
    this.age = age
  }
}
const asuna = new Gamer('Asuna', 20)
asuna.getName() // 成功访问到父类的方法
```
使用babel将ES6 的代码编译成 ES5，代码如下：
```js
function _possibleConstructorReturn (self, call) { 
		// ...
		return call && (typeof call === 'object' || typeof call === 'function') ? call : self; 
}
function _inherits (subClass, superClass) { 
    // 这里可以看到
	subClass.prototype = Object.create(superClass && superClass.prototype, { 
		constructor: { 
			value: subClass, 
			enumerable: false, 
			writable: true, 
			configurable: true 
		} 
	}); 
	if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; 
}

var Parent = function Parent () {
	// 验证是否是 Parent 构造出来的 this
	_classCallCheck(this, Parent);
};
var Child = (function (_Parent) {
	_inherits(Child, _Parent);
	function Child () {
		_classCallCheck(this, Child);
		return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments));
}
	return Child;
}(Parent));
```
从上面编译完成的源码中可以看到，它采用的也是寄生组合继承方式，因此也证明了这种方式是较优的解决继承的方式。