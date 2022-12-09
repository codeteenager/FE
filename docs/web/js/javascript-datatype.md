# JavaScript数据类型
::: tip
JavaScript数据类型是入门的基础知识点，同时也是最为重要的，我们常常在代码中遇到边界数据类型条件判断问题，只有处理好才能让我们的代码更为严谨。
:::

## 数据类型的种类
JavaScript 是一种弱类型脚本语言，所谓弱类型指的是定义变量时，不需要什么类型，在程序运行过程中会自动判断类型。最新的 ECMAScript 标准定义了 8 种数据类型：包含7种基础数据类型和1种引用类型。

![](/web/14.png)

七种基本数据类型为：

* 布尔值（Boolean），有 2 个值分别是：true 和 false
* null ， 一个表明 null 值的特殊关键字。 JavaScript 是大小写敏感的，因此 null 与 Null、NULL或变体完全不同
* undefined ，和 null 一样是一个特殊的关键字，undefined 表示变量未赋值时的属性
* 数字（Number），整数或浮点数，例如： 42 或者 3.14159
* 任意精度的整数 (BigInt) ，可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制
* 字符串（String），字符串是一串表示文本值的字符序列，例如：”Howdy” 
* 代表（Symbol）( 在 ECMAScript 6 中新添加的类型).。一种实例是唯一且不可改变的数据类型

引用数据类型（Object）又分为Array – 数组对象、RegExp – 正则对象、Date – 日期对象、Math – 数学函数、Function – 函数对象等常见类型。

其中基础数据类型存储在栈内存，被引用或拷贝时，会创建一个完全相等的变量。引用类型存储在堆内存，存储的是地址，多个引用指向同一个地址。

## 数据类型判断

我们日常工作中经常会用到数据类型的检测方法，以下三种检测方法是我们经常用到的。
### typeof
```js
typeof 1           //'number'
typeof '1'         //'string'
typeof undefined   //'undefined'
typeof true        //'boolean'
typeof Symbol()    //'symbol'
typeof null        //'object'
typeof []          //'object'
typeof {}          //'object'
typeof /^a/g       //'object'
typeof console     //'object'
typeof console.log //'function'
typeof Array       //'function'
typeof Number      //'function'
typeof Object      //'function'
typeof Math        //'object'
typeof RegExp      //'function'
typeof Date        //'function'
```

以上输出结果，其中前6种都是基础数据类型，但是最后null的类型为object，它不正确地表明null是一个对象，这是一个错误，而且无法修复，因为它会破坏现有的代码。在 JS 的最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

引用数据类型中可以看到除了函数像Array、Date等函数判断正确，其他都为object，像数组字面量是无法判断出来的。

### instanceof
通过 instanceof 我们能判断这个对象是否是之前那个构造函数生成的对象，这样就基本可以判断出这个新对象的数据类型。比如：

```js
let car = new String('car')
car instanceof String // true
```

那么instanceof是怎么实现的呢？

```js
function instanceof(left, right) {
    // 这里先用typeof来判断基础数据类型，如果是，直接返回false
    if(typeof left !== 'object' || left === null) return false;
    // 获得类型的原型
    let prototype = right.prototype
    // 获得对象的原型
    left = Object.getPrototypeOf(left);
    // 判断对象的类型是否等于类型的原型
    while (true) {
    	if (left === null)
    		return false
    	if (prototype === left)
    		return true
    	left = Object.getPrototypeof(left);
    }
}
```

以上可以看出instanceof可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型，而 typeof 虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了 function 类型以外，其他的也无法判断。为此这两种写法混写的方式可以去做判断，但是还有一种写法比以上两种更好，就是下面的第三种写法。

### Object.prototype.toString
Object的原型有toString方法，调用该方法，可以统一返回格式为 ‘[object Xxx]’ 的字符串，其中 Xxx 就是对象的类型，Xxx第一个首字母要大写（注意：使用 typeof 返回的是小写）。对于 Object 对象，直接调用 toString() 就能返回 [object Object]；而对于其他对象，则需要通过 call 来调用，才能返回正确的类型信息，如下所示。

```js
Object.prototype.toString.call({})            // "[object Object]"
Object.prototype.toString.call(1)             // "[object Number]"
Object.prototype.toString.call('1')           // "[object String]"
Object.prototype.toString.call(true)          // "[object Boolean]"
Object.prototype.toString.call(function(){})  // "[object Function]"
Object.prototype.toString.call(null)          // "[object Null]"
Object.prototype.toString.call(undefined)     // "[object Undefined]"
Object.prototype.toString.call(/123/g)        // "[object RegExp]"
Object.prototype.toString.call(new Date())    // "[object Date]"
Object.prototype.toString.call([])            // "[object Array]"
Object.prototype.toString.call(document)      // "[object HTMLDocument]"
Object.prototype.toString.call(window)        // "[object Window]"
```

实现一个数据类型判断方法是如何编写呢？可以看一下

```js
function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {    
    return type;
  }
  // 对于typeof返回结果是object的，进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1'); 
}

getType([])              // "Array" 
getType('123')           // "string" 
getType(window)          // "Window" 
getType(null)            // "Null"
getType(undefined)       // "undefined" 
getType()                // "undefined" 
getType(function(){})    // "function" 
getType(/123/g)          // "RegExp" 
```

## 数据类型转换
数据类型转换主要分为强制类型转换和隐式类型转换，其中隐式类型转换最需要重点记忆一下。

###  强制类型转换
强制类型转换方式包括 Number()、parseInt()、parseFloat()、Boolean()等。

Number() 方法的强制转换规则：
* 如果是布尔值，true 和 false 分别被转换为 1 和 0。
* 如果是数字，返回自身。
* 如果是 null，返回 0。
* 如果是 undefined，返回 NaN。
* 如果是字符串，遵循以下规则：如果字符串中只包含数字（或者是 0X / 0x 开头的十六进制数字字符串，允许包含正负号），则将其转换为十进制；如果字符串中包含有效的浮点格式，将其转换为浮点数值；如果是空字符串，将其转换为 0；如果不是以上格式的字符串，均返回 NaN。
* 如果是 Symbol，抛出错误。
* 如果是对象，并且部署了 [Symbol.toPrimitive] ，那么调用此方法，否则调用对象的 valueOf() 方法，然后依据前面的规则转换返回的值；如果转换的结果是 NaN ，则调用对象的 toString() 方法，再次依照前面的顺序转换返回对应的值。

parseInt() 方法的强制转换规则：

这个方法的规则是：除了字符串参数的第一个字符为数字返回的结果为数字外，其他都是NAN。

parseFloat()

这个方法的规则和parseInt类似，如果给定值能被解析成浮点数，则返回浮点数。如果给定值不能被转换成数值，则会返回 NAN。

Boolean() 方法的强制转换规则：

这个方法的规则是：除了 undefined、 null、 false、 ”、 0（包括 +0，-0）、 NaN 转换出来是 false，其他都是 true。

### 隐式类型转换
凡是通过逻辑运算符 (&&、 ||、 !)、运算符 (+、-、*、/)、关系操作符 (>、 <、 <= 、>=)、相等运算符 (==) 或者 if/while 条件的操作，如果遇到两个数据类型不一样的情况，都会出现隐式类型转换。

以“==”和“+”为例重点讲解一下隐式转换的规则。

‘==’ 的隐式类型转换规则：

* 如果其中一个操作值是 null 或者 undefined，那么另一个操作符必须为 null 或者 undefined，才会返回 true，否则都返回 false。
* 如果其中一个是 Symbol 类型，那么返回 false。
* 两个操作值如果为 string 和 number 类型，那么就会将字符串转换为 number。
* 如果一个操作值是 boolean，那么转换成 number。
* 如果一个操作值为 object 且另一方为 string、number 或者 symbol，就会把 object 转为原始类型再进行判断（调用 object 的 valueOf/toString 方法进行转换）。

‘+’ 的隐式类型转换规则：

‘+’ 号操作符，不仅可以用作数字相加，还可以用作字符串拼接。仅当 ‘+’ 号两边都是数字时，进行的是加法运算；如果两边都是字符串，则直接拼接，无须进行隐式类型转换。当然除了数字和字符串外，还有一些其他的类型规则，如下所示：

* 如果其中有一个是字符串，另外一个是 undefined、null 或布尔型，则调用 toString() 方法进行字符串拼接。
* 如果其中有一个是数字，另外一个是 undefined、null、布尔型或数字，则会将其转换成数字进行加法运算。
* 如果其中一个是字符串、一个是数字，则按照字符串规则进行拼接。
* 如果其中有一个是字符串，另外一个是对象的话，对象转换的规则，1、如果部署了 Symbol.toPrimitive 方法，优先调用再返回。2、调用 valueOf()，如果转换为基础类型，则返回。3、调用 toString()，如果转换为基础类型，则返回。4、如果都没有返回基础类型，会报错。