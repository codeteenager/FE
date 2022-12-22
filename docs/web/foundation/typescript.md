# TypeScript
TypeScript是一门基于JavaScript之上的编程语言，它重点解决了JavaScript的自有类型系统的不足，通过TypeScript可以大大提高代码的可靠程度。

## 强类型和弱类型
从类型安全的角度，编程语言分为强类型和弱类型， 这种强弱类型的概念最早是1974年的时候美国两个计算机专家Liskov,Zilles提出的。当时对强类型定义的概念就是在语言层面限制函数的实参类型必须与形参类型相同。例如有一个foo函数，它需要接收一个整型的参数，当我们调用的时候不允许传入其他类型的值。
```java
class Main{
    static void foo(int num){
        System.out.println(num);
    }
    public static void main(String[] args){
        Main.foo(100);  //ok
        Main.foo("100"); //error "100" is a string
        Main.foo(Integer.parseInt("100")); //ok
    }
}
```
而弱类型完全相反，在语言层面不会限制实参的类型，即便参数为整型的，在调用时可以传入任意类型的数据，语法上不会报错，运行上可能会有点问题。
```js
function foo(num){
    console.log(num);
}
foo(100);  //ok
foo('100');  //ok
foo(parseInt('100'));   // ok
```

由于这种强弱之分根本不是某一个权威机构的定义，而且当时两位专家也未给出具体的规则，这就导致后人对这种界定方式的细节出现了一些不一样的理解，但是整体上大家界定方式都是强类型有更强的类型约束，而弱类型几乎没有什么约束。那么个人的理解就是强类型语言中不允许任意的隐式类型转换，而弱类型语言则允许任意的数据隐式类型转换。变量类型允许随时改变的特点，不是强弱类型的差异。例如python是强类型的语言。

## 静态类型与动态类型
从类型检查的角度，将编程语言分为静态类型和动态类型。对于静态类型语言它的表现就是一个变量声明时它的类型就是明确的，而且在声明过后，它的类型就不允许再修改。相反，动态类型语言的特点就是在运行阶段才能够明确变量类型，而且变量的类型能够随时发生变化，也可以说在动态语言中它的变量没有类型，变量中存放的值是有类型的。那么JavaScript就是一门动态类型的语言。

## JavaScript类型系统特征
由于JavaScript是一门弱类型而且是动态类型的语言，语言本身的类型系统是薄弱的，甚至可以说JavaScript根本没有类型系统，所以说它是极其灵活多变的。同时它也丢掉了类型系统的可靠性，我们在代码中的每一个变量都要去担心是不是想要的类型。

那么为什么JavaScript不是一门强类型/静态类型的语言呢？首先，早期的JavaScript应用非常简单，很多时候几百行代码，甚至几十行代码就搞定了，这个时候类型系统就很麻烦。其次，JavaScript是一门脚本语言，脚本语言的特点是不需要编译，直接在运行环境当中去运行，换句话说JavaScript是没有编译环节的，即便把它设计成静态类型语言也没有意义。因为静态类型语言需要在编译阶段进行类型检查，而JavaScript根本没有这样的环节。所以JavaScript就形成了灵活多变的弱类型/动态类型语言。

这在以前那个时候是没有什么问题的，而现如今前端都是大规模的应用，JavaScript代码越来越复杂，开发周期越来越长，在大规模应用下，JavaScript这种优势就变成了短板。

## 弱类型的问题
例如我们调用了obj不存在的foo方法，在语法层面这么写是没有问题的，而在运行的时候就会报错。而且有时候它在某个时间运行。例如放在setTimeout回调函数中，延迟一段时间执行。
```js
const obj = {};
obj.foo()
```
如果是强类型的话，会在语法上报错误。

第二个例子，我们定义了一个计算两个数和的函数，如果我们传入两个数字的话，这个函数调用正常。如果我们传入其中一个参数为字符串，这个时候，该函数的作用完全发生了变化，它会返回两个字符串连接过后的结果。这就是类型不确定造成的典型问题。
```js
function sum(a,b){
    return a + b;
}
console.log(sum(100,100));
console.log(sum(100,'100'));
```
第三个例子，我们给对象添加属性，对象的属性名只能是字符串或者ES6中的Symbol，但是由于JavaScript是弱类型的，所以我们索引器的时候使用任意类型的值作为属性，而在它的内部会自动转换成字符串。强类型则不会有这种问题。
```js
const obj = {};
obj[true] = 100;
console.log(obj['true']);
```
所以弱类型的弊端是十分明显的，在代码上可以通过约定来规避，但是大项目则会有问题。强类型语言的优势就体现出来了。

## 强类型的优势
强类型的优势可以总结四个方面：
* 错误更早暴露，也就是在编码方面可以消灭一大部分的类型异常问题，不用等到运行阶段再去查找错误。
* 强类型的代码更加智能，编码更准确。因为弱类型的无法推断出对象有哪些成员，导致获取对象的成员属性没有提示，导致编写错误。而强类型的可以。
* 重构更牢靠。在对象的属性名发生变化，在重新编译时就会检查出问题，可以轻松定位所有使用该成员属性的地方。
* 减少代码层面不必要的类型判断，JavaScript是弱类型，我们在使用方法参数的时候，不可避免的去判断参数类型。如果是强类型，则不需要这种判断。

## Flow
[Flow](https://flow.org/)是JavaScript静态类型检查器，它是2014年由facebook推出的一款工具，使用它可以弥补JavaScript弱类型所带来的弊端，可以说它给JavaScript提供了更完善的类型系统，目前在React、Vue项目中都可以看到Flow的使用。它的工作原理就是在代码中添加类型注解的方式，来去标记变量或者是参数是什么类型的，然后Flow就会根据这些类型注解检查代码当中是否会存在类型使用上的异常，从而实现开发阶段类型的检查。
```js
function sum(a:number,b:number){
    return a + b;
}
```
例如上述在a后面加上:number这种方式就叫做类型注解，表示该成员必须要接收number类型的值。在代码中添加的这种额外类型注解可以在运行之前通过babel或Flow官方提供的模块自动去除，所以在生产环境不会有影响。Flow只是一个小工具，而TypeScript则是一门语言。

## TypeScript
[TypeScript](https://www.tslang.cn/docs/home.html)是基于JavaScript基础之上的编程语言，很多时候我们都说它是JavaScript的超集或扩展集，那多出来的就是更强大的类型系统以及ECMAScript新特性的支持，它最终会编译为原始的JavaScript。
![](/web/34.png)

另外，因为TypeScript最终会编译成JavaScript，所以任何一种JavaScript运行环境下的应用程序都可以使用TypeScript来开发，例如浏览器应用、Node应用、React Native以及Electron应用。

它作为一门编程语言，功能更加强大，生态也更健全、更完善。目前很多大型开源项目都采用TypeScript来开发，例如Angular、Vue.js3.0。TypeScript可以说是前端领域的第二语言，如果是小项目可以采用JavaScript灵活使用，如果是长周期的大项目，那么建议采用TypeScript来进行开发。

有优点也会有缺点，TypeScript的缺点就是这门语言相比较JavaScript多了很多概念，例如接口、泛型、枚举等等。这些概念会提高学习成本，但是TypeScript是渐进式的，即便我们不明白这些特性，依旧可以当做JavaScript来使用。其次在项目初期，TypeScript会增加一些项目成本，因为在项目初期我们会编写很多的类型声明，比如对象和函数有很多类型声明去编写。但是对大型项目则编写这些是一劳永逸的，这些成本也不算什么。TypeScript在前端发展过程中是必要的一门编程语言。

## TS配置文件
我们可以使用`tsc --init`来初始化ts的配置文件tsconfig.json，该配置中有compilerOptions属性，这个属性就是TypeScript编译器对应的配置选项。其中绝大多数配置都被注释掉了，而且附有一些说明。例如：
* target：设置编译后的ECMAScript的标准
* module：输出的代码采用什么样的模块化方式
* outDir：设置输出结果的文件夹目录
* rootDir：设置源代码即TypeScript的文件夹目录
* sourceMap：开启源代码映射，调试的时候可以调试TypeScript源代码
* strict：严格模式，开启所有严格类型检查，要为每一个成员指定明确的类型，不允许不写类型而隐式推断为any这种情况
* lib：编译过程所需要的标准库，标准库即内置对象所应用的声明文件，在代码中使用内置对象必须要引用对应的标准库，否则TypeScript找不到对应的类型，会报错

当我们使用tsc编译某一个文件的时候，配置文件是不生效的，而当我们使用tsc编译整个项目的时候tsc才生效。

## TypeScript原始类型
* string，存放字符串，非严格模式下允许设置null
* number，存放数字，包括Nan、Infinity，非严格模式下允许设置null
* boolean，存放true或false，非严格模式下允许设置null
* void，空值，一般是在函数没有返回值的时候，标记函数返回值类型，存放undefined，非严格模式下允许设置null
* null，存放null
* undefined，存放undefined
* symbol，存放symbol类型的值 

## TypeScript其他类型
### Object类型
TypeScript中的Object类型并不单指普通的对象类型，而是泛指所有的非原始类型，即对象、数组和函数。例如：
```ts
export {} //确保跟其他示例没有冲突

// const foo: object = {};  
// const foo: object = [];
const foo: object = function(){};
```
如果限制类型为普通对象的话，可以使用对象字面量的语法去标记类型，并且赋值的对象结构与类型完全一致。
```ts
const obj: {foo:number} = {foo:123}
```

### 数组类型
TypeScript创建数组有两种方式，一种是使用Array泛型
```ts
const arr1 : Array<number> = [1,2,3];
```
第二种是使用元素类型+方括号的形式
```ts
const arr2 : number[] = [1,2,3];
```

### 元组类型
元组类型是一种特殊的数据结构，元组其实就是一个明确元素数量和元素类型的数组。各个元素类型可以不完全相同，在TypeScript中可以使用类似字面量的方式来定义。可以通过数组下标和解构的方式获取内容，在React的useState中就是返回元组的方式。
```ts
const tuple: [number,string] = [18,'test'];
const age = tuple[0];
```

### 枚举类型
枚举类型有两个特点，一个是给一组数值取上很好的名字，另一个是一个枚举中只存在一组固定的值，不会有超出范围的可能性。在其他语言中枚举是很常见的数据结构，而在JavaScript中没有。很多时候我们都是用对象模拟实现枚举。
```js
const PostStatus = {
    Draft: 0,
    Unpublished: 1,
    Published: 2
}
```
而在TypeScript中有专门的枚举类型，使用enum关键词来声明
```ts
enum PostStatus {
    Draft = 0,
    Unpublished = 1,
    Published = 2
}
```
枚举在编译后会生成双向的键值对对象。双向指的是可以通过键获取值，也可以通过值获取键。也就是说在代码中可以通过索引器的方式获取索引名称，如果我们确认代码中不会通过索引器的方式访问，那么建议使用常量枚举。在编译后枚举内容从代码中移除，而使用枚举的地方被具体数值替换。
```ts
const enum PostStatus {
    Draft = 0,
    Unpublished = 1,
    Published = 2
}
```
### 函数类型
函数类型约束即对函数的输入输出进行类型限制，输入即参数，输出即返回值。JavaScript有两种函数定义的方式，分别是函数声明和函数表达式。
```ts
//函数声明
function fun1(a:number,b?:number ,...rest:number[]): string{
    return 'fun1';
}

//函数表达式
const fun2:(a:number,b:number) => string = function(a:number,b:number): string{
    return 'fun2';
}
```
### 任意类型
由于JavaScript自身是弱类型的关系，很多内置api本身就支持接收任意类型的参数，而TypeScript又是基于JavaScript基础之上的，所以我们难免要用一个变量去接收任意类型的数据。any就是用来接收任意类型数据的一种类型，它是不安全的尽量少用。
```ts
function stringify(value:any){
    return JSON.stringify(value);
}
```

## 隐式类型推断
在TypeScript中，如果我们没有通过明确类型注解去标记一个变量的类型，那TypeScript会根据变量的使用情况去推断这个变量的类型，这样的特性称为隐式类型推断。如果它无法推断该变量的类型，则会标记成any。虽然有隐式类型推断，但还是建议给每个变量添加明确的类型。

## 类型断言
类型断言有两种，一种是as关键词，另一种的方式是在前面添加<>方式断言
```ts
const num1 = res as number;
const num2 = <number>res;
```
## 接口
在TypeScript中接口最直观的体现就是约定一个对象当中具体有哪些成员，以及成员的类型是什么样的。
```ts
interface Post {
    title: string
    content: string
}

function printPost(post:Post){
    console.log(post.title);
    console.log(post.content);
}
```
在接口成员后面添加?，表示接口成员可有可无。在接口成员前添加readonly表示只读成员不可修改。
```ts
interface Post {
    title: string
    content: string
    subtitle?: string
    readonly summary: string
}
```
当我们定义接口的时候不知道具体有哪些成员，这时候无法定义具体的成员名称。而是使用`[属性名称:成员名类型]:string`作为动态属性。
```ts
interface Cache{
    [prop:string]: string
}
const cache:Cache ={}
cache.foo = "value1"
cache.bar = "value2"
```

## 类
在TypeScript中，我们除了可以使用ECMAScript的类的相关功能，还添加了一些额外的功能和用法，例如类成员的访问修饰符、抽象类等概念。
```ts
class Person{
    public name: string;
    private age: number;
    protected gender: boolean;

    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
        this.gender = true;
    }

    sayHi(msg:string): void{
        console.log(`I am ${this.name}，${msg}`);
    }
}

class Student extends Person{
    constructor(name: string,age:number){
        super(name,age)
        console.log(this.gender);
    }
}

const tom = new Person('tom',18);
console.log(tom.name);
```
类的访问修饰符可以使用public、private、protected，它的作用是控制类成员的可访问级别。默认为public，private不能在声明它的类的外部访问，public可以在类的外部访问，protected成员可以在派生类中访问。

除了类的访问修饰符，还可以使用readonly只读属性来限制属性的修改。

其余的像抽象类、泛型等等的使用可以参考TypeScript中文网来学习使用。

## 类型声明
在实际开发过程中，我们难免会用到第三方的Npm模块，而这些npm模块并不一定都是由TypeScript编写的，所以它提供的成员不会有强类型的体验。

例如我们使用lodash缺少类型声明没有任何的提示，那么我们可以写上单独类型声明。有了声明之后就会发现使用函数就有类型限制了。这种用法存在的原因就是为了兼容一些JS模块。
```ts
import { camelCase } from 'lodash'

declare function camelCase(input:string): string

const res = camelCase('hello typed')
```

由于TypeScript社区很强大，现在很多JS模块提供了类型声明模块库。例如lodash对应的@types/lodash，这些模块中都是.d.ts文件，这种文件就是TypeScript专门做类型声明的文件。