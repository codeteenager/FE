# 函数式编程
函数式编程是非常古老的一个概念，早于第一台计算机的诞生，那我们为什么现在还要学习函数式编程呢？
 * 函数式编程是随着React的流行受到越来越多的关注，React的高阶组件使用了高阶函数来实现，高阶函数就是函数式编程的一大特性
 * Vue 3也开始拥抱函数式编程
 * 函数式编程可以抛弃this
 * 打包过程中可以更好的利用tree shaking过滤无用代码
 * 方便测试、方便并行处理
 * 有很多库可以帮助我们进行函数式开发：lodash、underscore、ramda

## 什么是函数式编程？
函数式编程(Functional Programming, FP)，FP 是编程范式之一，我们常听说的编程范式还有面向过程编程、面向对象编程。

* 面向对象编程的思维方式：把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承和多态来演示事物事件的联系
* 函数式编程的思维方式：把现实世界的事物和事物之间的联系抽象到程序世界（对运算过程进行抽象）
    + 程序的本质：根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多有输入和输出的函数
    + x -> f(联系、映射) -> y，y=f(x)
    + 函数式编程中的函数指的不是程序中的函数(方法)，而是数学中的函数即映射关系，例如：y= sin(x)，x和y的关系
    + 相同的输入始终要得到相同的输出(纯函数)
    + 函数式编程用来描述数据(函数)之间的映射

举个例子：
```js
// 非函数式
let num1 = 2
let num2 = 3
let sum = num1 + num2
console.log(sum)

// 函数式
function add (n1, n2) {
return n1 + n2
}
let sum = add(2, 3)
console.log(sum)
```

## 函数是一等公民
在MDN中对函数的描述为头等函数 [https://developer.mozilla.org/zh-CN/docs/Glossary/First-class_Function](https://developer.mozilla.org/zh-CN/docs/Glossary/First-class_Function)，它从下面三个点进行解释：

* 函数可以存储在变量中
* 函数作为参数
* 函数作为返回值

我们来解释一下，在 JavaScript 中函数就是一个普通的对象 (可以通过 new Function() )，因为函数是一个普通的对象，我们可以把函数存储到变量/数组中，它还可以作为另一个函数的参数和返回值，甚至我们可以在程序运行的时候通过 new Function('alert(1)') 来构造一个新的函数。

例如：

把函数赋值给变量

```js
// 把函数赋值给变量
let fn = function () {
console.log('Hello First-class Function')
}
fn()
// 一个示例
const BlogController = {
index (posts) { return Views.index(posts) },
show (post) { return Views.show(post) },
create (attrs) { return Db.create(attrs) },
update (post, attrs) { return Db.update(post, attrs) },
destroy (post) { return Db.destroy(post) }
}
// 优化
const BlogController = {
index: Views.index,
show: Views.show,
create: Db.create,
update: Db.update,
destroy: Db.destroy
}
```

函数是一等公民是学习的高阶函数、柯里化等的基础。

## 高阶函数
高阶函数(Higher-order function)，它可以把函数作为参数传递给另一个函数，还可以把函数作为另一个函数的返回结果。

1. 函数作为参数，例如：
```js
// forEach
function forEach (array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i])
    }
}
// filter
function filter (array, fn) {
    let results = []
    for (let i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            results.push(array[i])
        }
    }
    return results
}
```

2. 函数作为返回值，例如
```js
function makeFn () {
    let msg = 'Hello function'
    return function () {
        console.log(msg)
    }
}
const fn = makeFn()
fn()

// once
function once (fn) {
    let done = false
    return function () {
        if (!done) {
            done = true
            return fn.apply(this, arguments)
        }
    }
}

let pay = once(function (money) {
    console.log(`支付：${money} RMB`)
})
// 只会支付一次
pay(5)
pay(5)
pay(5)
```

函数式编程的核心思想是对运算过程进行抽象，把运算过程抽象成函数，在任何地方都可以重用这些函数，抽象可以帮我们屏蔽细节，调用函数只需要关注目标即可。而高阶函数则是用来抽象通用的问题。例如：循环打印数组，for循环会关注循环的所有细节，对循环变量的控制，而forEach把循环的过程抽象成函数，不用关注循环的细节。

```js
// 面向过程的方式
let array = [1, 2, 3, 4]
for (let i = 0; i < array.length; i++) {
    console.log(array[i])
}

// 高阶高阶函数
let array = [1, 2, 3, 4]
forEach(array, item => {
    console.log(item)
})
let r = filter(array, item => {
    return item % 2 === 0
})
```

使用函数式编程可以让代码更简洁灵活。

## 常用高阶函数
以下方法都是数据的方法，这些方法都是需要函数作为参数，所以他们都是高阶函数。
* forEach
* map
* filter
* every
* some
* find/findIndex
* reduce
* sort
* ...

```js
const map = (array, fn) => {
    let results = []
    for (const value of array) {
        results.push(fn(value))
    }
    return results
}

const every = (array, fn) => {
    let result = true
    for (const value of array) {
        result = fn(value)
        if (!result) {
            break
        }
    }
    return result
}

const some = (array, fn) => {
    let result = false
    for (const value of array) {
        result = fn(value)
        if (result) {
            break
        }
    }
    return result
}
```
## 闭包
闭包 (Closure)：函数和其周围的状态(词法环境)的引用捆绑在一起形成闭包。它可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域中的成员，例如：

```js
// 函数作为返回值
function makeFn () {
    let msg = 'Hello function'
    return function () {
        console.log(msg)
    }
}
const fn = makeFn()
fn()

// once
function once (fn) {
    let done = false
    return function () {
        if (!done) {
            done = true
            return fn.apply(this, arguments)
        }
    }
}
let pay = once(function (money) {
    console.log(`支付：${money} RMB`)
})
// 只会支付一次
pay(5)
pay(5)
```

闭包的本质：函数在执行的时候会放到一个执行栈上当函数执行完毕之后会从执行栈上移除，但是堆上的作用域成员因为被外部引用不能释放，因此内部函数依然可以访问外部函数的成员。

闭包案例：
```js
// 生成计算数字的多少次幂的函数
function makePower (power) {
    return function (x) {
        return Math.pow(x, power)
    }
}
let power2 = makePower(2)
let power3 = makePower(3)
console.log(power2(4));
console.log(power3(4));
```

```js
// 第一个数是基本工资，第二个数是绩效工资
function makeSalary (x) {
    return function (y) {
        return x + y
    }
}
let salaryLevel1 = makeSalary(1500)
let salaryLevel2 = makeSalary(2500)
console.log(salaryLevel1(2000))
console.log(salaryLevel1(3000))
```

## 纯函数
函数式编程中的函数指的是纯函数，纯函数的概念就是相同的输入永远会得到相同的输出，而且没有任何可观察的副作用，纯函数就类似数学中的函数(用来描述输入和输出之间的关系)，y = f(x)。

[lodash](https://github.com/lodash/lodash) 是一个纯函数的功能库，提供了对数组、数字、对象、字符串、函数等操作的一些方法。

那么什么是纯函数，什么是不纯的函数，举个例子，以数组的slice和splice为例：
* slice 返回数组中的指定部分，不会改变原数组
* splice 对数组进行操作返回该数组，会改变原数组

进而想纯函数的定义是相同的输入永远会得到相同的输出，所以slice是纯函数。而splice每次调用都会改变原数组，所以每次输出不同不是纯函数。
```js
let numbers = [1, 2, 3, 4, 5]
// 纯函数
numbers.slice(0, 3)
// => [1, 2, 3]
numbers.slice(0, 3)
// => [1, 2, 3]
numbers.slice(0, 3)
// => [1, 2, 3]
// 不纯的函数
numbers.splice(0, 3)
// => [1, 2, 3]
numbers.splice(0, 3)
// => [4, 5]
numbers.splice(0, 3)
// => []
```

在函数式编程不会保留计算中间的结果，所以变量是不可变的（无状态的），我们可以把一个函数的执行结果交给另一个函数去处理。

### 纯函数的好处
1. 可缓存：因为纯函数对相同的输入始终有相同的结果，所以可以把纯函数的结果缓存起来，进而提高性能，例如：
```js
const _ = require('lodash')
function getArea (r) {
    return Math.PI * r * r
}
let getAreaWithMemory = _.memoize(getArea)
console.log(getAreaWithMemory(4))
```
使用lodash的memoize方法将getArea函数的结果缓存起来，自定义memoize函数如下：
```js
function memoize (f) {
    let cache = {}
    return function () {
        let arg_str = JSON.stringify(arguments)
        cache[arg_str] = cache[arg_str] || f.apply(f, arguments)
        return cache[arg_str]
    }
}
```

2. 可测试：纯函数让测试更方便
3. 并行处理：在多线程环境下并行操作共享的内存数据很可能会出现意外情况，而纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数 (Web Worker)。

### 副作用
副作用让一个函数变的不纯(如上例)，纯函数的根据相同的输入返回相同的输出，如果函数依赖于外部的状态就无法保证输出相同，就会带来副作用。例如：
```js
// 不纯的
let mini = 18
function checkAge (age) {
    return age >= mini
}

// 纯的(有硬编码，后续可以通过柯里化解决)
function checkAge (age) {
    let mini = 18
    return age >= mini
}
```

副作用来源：
* 配置文件
* 数据库
* 获取用户的输入
* ...

所有的外部交互都有可能带来副作用，副作用也使得方法通用性下降不适合扩展和可重用性，同时副作用会给程序中带来安全隐患给程序带来不确定性，但是副作用不可能完全禁止，尽可能控制它们在可控范围内发生。

## 柯里化 (Haskell Brooks Curry)
当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变），然后返回一个新的函数接收剩余的参数，返回结果。例如：
```js
function checkAge (age) {
    let min = 18
    return age >= min
}
// 普通纯函数
function checkAge (min, age) {
    return age >= min
}
checkAge(18, 24)
checkAge(18, 20)
checkAge(20, 30)
// 柯里化
function checkAge (min) {
    return function (age) {
        return age >= min
    }
}
// ES6 写法
let checkAge = min => (age => age >= min)
let checkAge18 = checkAge(18)
let checkAge20 = checkAge(20)
checkAge18(24)
checkAge18(20)
```
### lodash柯里化
我们看一下lodash中柯里化的实现函数_.curry(func)，它的功能是创建一个函数，该函数接收一个或多个 func 的参数，如果 func 所需要的参数都被提供则执行 func 并返回执行的结果。否则继续返回该函数并等待接收剩余的参数。
```js
const _ = require('lodash')
// 要柯里化的函数
function getSum (a, b, c) {
    return a + b + c
}
// 柯里化后的函数
let curried = _.curry(getSum)
// 测试
curried(1, 2, 3)
curried(1)(2)(3)
curried(1, 2)(3)
```

#### 实现原理
```js
function curry (func) {
    return function curriedFn (...args) {
        // 判断实参和形参的个数
        if (args.length < func.length) {
            return function () {
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        // 实参和形参个数相同，调用 func，返回结果
        return func(...args)
    }
}
```

柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数，这是一种对函数参数的'缓存'，让函数变的更灵活，让函数的粒度更小，可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能。

## 函数组合
使用纯函数和柯里化很容易写出洋葱代码 h(g(f(x)))，什么是洋葱代码呢？例如f(x)的结果传给g()获取到结果再传给h()，像下图洋葱一样一层包一层。
![](/web/25.png)

举个例子：获取数组的最后一个元素再转换成大写字母，` _.toUpper(_.first(_.reverse(array)))`，我们可以看出方法的调用这样一层包裹一层。使用函数的组合可以避免这样的代码出现，函数组合可以让我们把细粒度的函数重新组合生成一个新的函数，来实现相同的功能。

函数组合 (compose)的概念就是如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数，函数就像是数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终结果。其次函数组合默认是从右到左执行。

```js
// 组合函数
function compose (f, g) {
    return function (x) {
        return f(g(x))
    }
}
function first (arr) {
    return arr[0]
}
function reverse (arr) {
    return arr.reverse()
}
// 从右到左运行
let last = compose(first, reverse)
console.log(last([1, 2, 3, 4]))
```

lodash中提供了两个组合函数flow()和flowRight()，他们都可以组合多个函数。flow() 是从左到右运行，而flowRight() 是从右到左运行，使用的更多一些。例如：
```js
const _ = require('lodash')
const toUpper = s => s.toUpperCase()
const reverse = arr => arr.reverse()
const first = arr => arr[0]
const f = _.flowRight(toUpper, first, reverse)
console.log(f(['one', 'two', 'three']))
```

接下来模拟实现 lodash 的 flowRight 方法
```js
// 多函数组合
function compose (...fns) {
    return function (value) {
        return fns.reverse().reduce(function (acc, fn) {
            return fn(acc)
        }, value)
    }
}
// ES6
const compose = (...fns) => value => fns.reverse().reduce((acc, fn) =>
fn(acc), value)
```

### 结合律
函数的组合要满足结合律 (associativity)：结合律是指我们既可以把 g 和 h 组合，还可以把 f 和 g 组合，结果都是一样的。例如：
```js
// 结合律（associativity）
let f = compose(f, g, h)
let associative = compose(compose(f, g), h) == compose(f, compose(g, h))
// true
```

以lodash为例：
```js
const _ = require('lodash')
// const f = _.flowRight(_.toUpper, _.first, _.reverse)
// const f = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)
const f = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse))
console.log(f(['one', 'two', 'three']))
// => THREE
```

### 调试
```js
const f = _.flowRight(_.toUpper, _.first, _.reverse)
console.log(f(['one', 'two', 'three']))
```
如果组合函数的结果和我们预期的不一致，想分别去看first的结果和reverse的结果，那么我们如何去调试组合函数呢？

```js
//函数组合 调试
//NEVER SAY DIE => never-say-die
const _ = require('lodash')
const trace = _.curry((tag, v) => {
    console.log(tag, v)
    return v
})
const split = _.curry((sep, str) => _.split(str, sep))
const join = _.curry((sep, array) => _.join(array, sep))
const map = _.curry((fn, array) => _.map(array, fn))
const f = _.flowRight(join('-'), trace('map 之后'), map(_.toLower),
trace('split 之后'), split(' '))
console.log(f('NEVER SAY DIE'))
```

我们可以去编写上述的trace函数作为辅助函数，打印中间的结果。


## 相关资料
* [函数式编程指北](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch1.html)
* [函数式编程入门](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)
* [Pointfree 编程风格指南](http://www.ruanyifeng.com/blog/2017/03/pointfree.html)
* [图解 Monad](http://www.ruanyifeng.com/blog/2015/07/monad.html)
* [Functors, Applicatives, And Monads In Pictures](https://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)