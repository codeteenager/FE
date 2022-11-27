# JavaScript原型与原型链
JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

![](/web/foundation/21.png)

我们先来理解一下几点原型规则。
* 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（null除外）
* 所有的引用类型（数组、对象、函数），都有一个__proto__属性，属性值是一个普通的对象
* 所有的函数，都有一个prototype属性，属性值也是一个普通的对象
* 所有的引用类型（数组、对象、函数），__proto__属性值指向它的构造函数的prototype属性值
* 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去他的__proto__(即它的构造函数的prototype)中寻找

## 介绍
### 什么是对象
JS的数据类型分为基础数据类型和引用数据类型，在JS中对象就是一种引用数据，数组、函数等也可以称为一种特殊的对象，所以在js中除了基础数据，其他几乎都是对象。

在JS中对象分为普通对象和函数对象，通过 new Function() 创建的对象都是函数对象，其他的对象都是普通对象，比如我们常见的Array、String、Number、 Boolean等JS内置函数也是通过new Function得来的，所以也是函数对象。所以为什么说JS函数也有__proto__属性，所有函数(对象)的 __ proto __ 都指向 Function.prototype，它是一个空函数（Empty function）。

创建对象有哪几种方法？
* 字面量
* 使用new Object()创建
* 使用构造函数创建
* 使用Object.create()创建

```js
 let obj1 = { name: 'test' };
 let obj2 = new Object({ name: 'test' });

 function Test(){
     this.name = 'test';
 }

 let obj3 = new Test();

 let obj4 = Object.create(obj1);

 console.log(obj1);
 console.log(obj2);
 console.log(obj3);
 console.log(obj4);
```

### 构造函数与实例
构造函数 ，是一种特殊的方法。主要用来在创建对象时初始化对象， 即为对象成员变量赋初始值，总与new运算符一起使用在创建对象的语句中。构造函数也是一个函数，任何的函数都可以作为构造函数存在，我们为了区分，通常将构造函数的首字母大写。

```js
function Person(name, age) {
​      this.name = name;
​      this.age = age;
​      this.sayName = function () {
​        console.log(this.name);
​      }
    //return this;   默认有这一行
​}

let person1 = new Person('zhangsan', 28);
let person2 = new Person('lisi', 23);
```

在这个例子中，person1, person2 都是 Person 的实例，这两个实例都有一个 constructor（构造函数）属性，该属性（是一个指针）指向 他们的构造函数 Person，即person1.constructor === Person。

#### 构造函数扩展
* `var a = {}`其实是`var a = new Object()` 的语法糖
* `var a = []`其实是`var a = new Array()` 的语法糖
* `function Foo(){...}`其实是`var Foo = new Function(...)`
* 使用instanceof判断一个函数是否是一个变量的构造函数

### 原型对象
每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function () {
         console.log(this.name);
    }
}
Person.prototype.sayAge = function(){
    console.log(this.age);
};
let person1 = new Person('zhangsan', 28);
let person2 = new Person('lisi', 23);
console.log(person1.__proto__ == Person.prototype); //true
```

Person.prototype 就是原型对象，上面的 Person.prototype.xxx 这些操作是 我们自己 对原型对象进行的 扩展，目的就是 Person 构造函数的所有实例都可以 继承 这些属性。

所有的 原型对象 都会包含一个 constructor （构造函数）属性（一个指针），这个属性）指向 prototype 属性所在的 构造函数。即 Person.prototype.constructor === Person 。

### 原型链
每个对象实例都会在其内部初始化一个__proto__属性，他是一个指向prototype（原型对象）的指针，当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，就会通过__proto__去prototype里找这个属性，这个prototype又有自己的__proto__指向自己的原型对象，于是就一直找下去，形成了原型链的概念。

所有对象的原型最终都可以上溯到Object.prototype，Object.prototype对象有没有它的原型呢？回答是Object.prototype的原型是null。null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null。

## instanceof的原理
![](/web/foundation/22.png)
instanceof用于判断引用类型属于哪个构造函数的方法，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。实现原理如下：
```js
function instanceof(left, right) {
    // 获得类型的原型
    let prototype = right.prototype
    // 获得对象的原型
    left = left.__proto__
    // 判断对象的类型是否等于类型的原型
    while (true) {
    	if (left === null)
    		return false
    	if (prototype === left)
    		return true
    	left = left.__proto__
    }
}
```

## new运算符的原理
* 一个新对象被创建，它继承自foo.prototype
* 构造函数foo被执行，执行的时候，相应的传参会被传入，同时上下文（this）会被指定为这个新实例，new foo等同于new foo()，只能用于在不传递任何参数的情况。
* 如果构造函数返回了一个对象，那么这个对象就会取代整个new出来的结果，如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象。

```js
let news = function(func){
   let o = Object.create(func.prototype);
   let k = func.call(o);
   if(typeof k === "object"){
      return k;
   }else {
      return o;
   }
}
```


