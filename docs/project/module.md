# 模块化

## 模块化的背景
* 前端模块化是一种标准，不是实现
* 理解模块化是理解前端工程化的前提
* 前端模块化是前端项目规模化的必然结果

## 什么是前端模块化?
前端模块化就是将复杂程序根据规范拆分成若干模块，一个模块包括输入和输出。而且模块的内部实现是私有的，它通过对外暴露接口与其他模块通信，而不是直接调用。现在在HTML文件中可以引用的script包括脚本和模块，其中模块具有更高的开发效率(可读性强、复用性高)，而脚本具有更高的页面性能，因为模块相对文件多，加载速度慢。需要注意的是模块在浏览器中运行会存在兼容性的问题，在script声明type="module"即可使用ES Module模块化规范。

## 模块化的进化过程
1. 全局function模式，将不同的功能封装成不同的函数，缺陷是容易引发全局命名冲突。比如刚开始在一个js文件中中定义一个一个的函数作为模块，但是这些函数挂载windows上的，污染全局作用域，我在另一个js文件中定义同名的函数就会导致命名冲突，而且无法管理模块依赖关系，进而早起模块化完全依靠约定。

```js
    function api(){
        return {
            data:{
                a:1,
                b:2
            }
        }
    }
```
2. 全局namespace模式，约定每个模块暴露一个全局对象，所有的模块成员暴露在对象下，缺点是外部能够修改模块内部数据。将函数放在对象模块中挂载到window上，但是这样外部也能修改对象内部的属性。

```js
var __Module={
    api(){
        return {
            data:{
                a:1,
                b:2
            }
        }
    }
}
```
那么我们可以通过函数作用域加闭包的特性来解决。
3. IIFE模式，将模块成员放在函数私有作用域中，通过自执行函数创建闭包，对于暴露给外部的成员通过挂载到全局对象这种方式实现。这种方式实现了私有成员的概念，缺陷是无法解决模块间相互依赖问题。
```js
(function(){
    var a =1;
    function getA(){
        return a;
    }
    function setA(a){
        window.__module.a = a;
    }
    window.__module = {
        a,
        getA,
        setA
    }
})();
```

4. IIFE模式增强，支持传入自定义依赖，缺陷是多依赖传入时，代码阅读困难，无法支持大规模的模块化开发，无特定语法支持，代码简陋。

```js
(function(global){
    var a =1;
    function getA(){
        return a;
    }
    function setA(a){
        window.__module.a = a;
    }
    global.__Module_API = {
        a,
        getA,
        setA
    }
})(window)

(function(global,moduleAPI){
    global.__Module = {
        setA:moduleApi.setA
    }
})(window,window.__Module_API)
```
以上就是早期没有工具和规范的情况下对模块化的落地方式。

通过约定的方式去做模块化，不同的开发者和项目会有不同的差异，我们就需要一个标准去规范模块化的实现方式。针对与模块加载的方式，以上方法都是通过script标签手动引入的方式，模块加载不受代码的控制，时间久了维护会非常麻烦。那么久需要一个模块化的标准和自动加载模块的基础库。

## CommonJS规范
### 介绍
CommonJS规范是Node.js默认模块规范，他规定了每个文件就是一个模块，每个模块有自己的作用域，它的模块加载采用同步加载方式，加载模块的时候必须模块加载完成后再执行后续的代码。它通过require来加载模块，通过exports或module.exports输出模块。

### 特点
* 所有代码都运行在模块作用域，不会污染全局作用域
* 模块可以多次加载，第一次加载时会运行模块，模块输出结果会被缓存，再次加载时，会从缓存结果中直接读取模块输出结果
* 模块加载的顺序是按照其在代码中出现的顺序
* 模块输出的值是值得拷贝，类似IIFE方案中的内部变量

![](/project/1.png)

### 打包
CommonJS要想在浏览器中使用的话需要使用browserify来打包。

browserify打包原理主要是：通过自执行函数实现模块化，将每个模块编号，存入一个对象，每个模块标记依赖模块。它内部实现了require方法，核心是通过call方法调用模块，并传入require、module、exports方法，通过module存储模块信息，通过exports存储模块输出信息。

## AMD规范
AMD(Asynchronous Module Definition)规范采用异步加载模块，允许指定回调函数。Node模块通常都位于本地，加载速度快，所以适用于同步加载，但是在浏览器运行环境中，用同步加载会阻塞浏览器渲染，所以在浏览器环境中，模块需要请求获取，适用于异步加载。因此就诞生了AMD规范，用于异步加载，其中[require.js](https://requirejs.org/)就是AMD的一个具体实现库。目前不管是CMD或是AMD用的都很少，在Node开发中通常用CommonJS规范，在浏览器中用ES Module规范。

引用了require.js之后，它会全局定义一个define函数和require函数，所有的模块要用define去定义。define有三个参数：第一个模块名，第二个是数组用于声明模块依赖项，第三个是一个函数，函数参数与第二个参数依赖项一一对应，每一个参数为依赖项导出的成员。函数的作用可以理解为当前模块提供私有的空间，如果要向外导出成员可以通过return来实现。
```js
define('module1',['jquery','./module2'],function($,module2){
    return {

    }
});
```

而require函数则用来加载模块，当调用require函数的时候，其内部会自动创建script标签来发送脚本文件的请求，并执行相对应的模块代码。
```js
require(['./module1'],function (module1){
    module1.start();
})
```
目前绝大部分第三方库都支持AMD规范，但是因为要使用频繁使用require、define导致AMD使用起来相对复杂。另外如果模块代码划分的很细致，那么在同一个页面中，JS文件的请求次数相对多，导致页面效率低下。

## CMD规范
CMD规范整合了CommonJS和AMD的优点，通过异步加载模块。CMD专门用于浏览器端，其中淘宝的sea.js就是CMD规范的一个具体实现库。

```js
//CMD规范，类似CommonJS规范
define(function(require,exports,module){
    //通过require引入依赖
    var $ = require('jquery')
    //通过exports 或者module.exports对外暴露成员
    module.exports = function(){

    }
})
```

## ESModule规范
目前模块化标准规范已经非常成熟统一了，在Node.js中遵循CommonJS组织模块，在浏览器端使用ESModule规范。目前前端模块化基本统一为CommonJS + ESModule规范。

ESModule规范是目前应用最为广泛的模块化规范，它的设计理念是在编译时就确定模块依赖关系及输入输出。而CommonJS和AMD由于采用闭包的形式必须在运行时才能确定依赖和输入、输出。ESM通过import加载模块，通过export输出模块。

使用ESModule，通过给script标签添加type=module属性，就可以以ESModule的标准执行JS代码。
```html
<script type="module"></script>
```
ESModule有如下几个特性：
* ESM自动采用严格模式，忽略'use strict'
* 每个ESM都是运行在单独的私有作用域中
* 在ESM中外部的JS模块是通过CORS的方式请求的
* ESM的script标签会延迟执行脚本，等同于defer属性

### 注意
在ESM中 `export {}`它只是导出成员的语法，不是导出字面量对象，`import {} from 'xxx'`，也是语法，不是解构对象，如果想导出对象可以使用`export default {}`，使用`import xxx from 'xxx'`获取对象。其次通过`export {name}`导出的name值是引用的不是拷贝，它的值会受到导出模块内部修改的影响，而且name只是可读不能修改。

### 导入模块的用法

1. 引用路径必须是完整的文件名称不能省略`.js`扩展名，相对路径要是用`./`，可以使用绝对路径和url的方式。
```js
import {name} from './module.js';
import {name} from '/xxx/module.js';
import {name} from 'http://localhost:3000/module.js';
```
2. 加载模块，并不导出成员
```js
import './xxx.js';
```
3. 使用 * 的方式提取所有的模块，使用as存放在对象中
```js
import * as mod from './xxx.js';
```
4. 使用import函数，在运行阶段动态导入模块
```js
import('./xxx.js').then((module)=>{
    console.log(module);
});
```
5. 同时导出命名成员和默认成员
```js
//a.js
...
export {name,age}
export default 'title'

//b.js
import {name,age,default as title} from './a.js';
//或者
import title,{name,age} from './a.js';
```

### 导出模块的用法
通过export将目录下散落的模块在index文件中导出，方便外部使用
```js
export {name,age} from './module.js';
```
如果要使用commonjs规范的话就要将对应的js文件改为`.cjs`后缀名。

### Node.js新版本支持
在Node.js新版本中，在package.json中添加`type="module"`字段就可以使用ESModule规范了。

## CommonJS和ESModule规范对比
* CommonJS模块输出的是值得拷贝，ES6模块输出的是值得引用
* CommonJS模块是运行时加载，ES6模块是编译时输出接口
* CommonJS是单个值导出，ES6 Module可以导出多个
* CommonJS是同步加载，ES6 Module是支持异步加载，通过import()来实现
* CommonJS的this是当前模块，ES6 Module的this是undefined
* CommonJS和ES6 Module的语法不同
* CommonJS是Node.js默认采用的模块化规范，Node14后默认支持ESM。ESM是浏览器默认采用的模块化规范。

## 模块打包工具
模块化解决了我们在复杂应用当中的代码组织问题，但是随着引入模块化，又产生了新的问题。例如以下问题：
* ES Modules存在环境兼容问题
* 通过模块化的方式划分的模块文件比较多，且网络请求频繁
* 所有的前端资源都需要模块化，不仅仅是JS需要模块化，像html和css都需要模块化

针对第一个问题，我们需要一个工具将代码进行编译，在开发阶段将新特性的代码转换为兼容绝大多数环境的代码。
![](/project/32.png)

针对第二个问题，将模块化的文件打包到一块。
![](/project/33.png)

针对第三个问题，将其他资源通过代码的方式进行控制，统一去维护。
![](/project/34.png)

针对以上问题就需要模块打包工具来解决，例如webpack、parcel和rollup。

通过使用webpack就可以将零散的代码打包到js文件中，对于那些有环境兼容问题的代码就可以通过模块加载器loader去做兼容转换，他还具有代码拆分的能力，可以按我们的需要去打包，不用担心将所有的代码打包到一块，导致文件比较大的问题。我们可以将应用加载过程中初次运行所必须的模块打包到一起，其他的模块单独存放，等到应用运行过程中需要某个模块，再异步加载这个模块，从而实现增量加载或者渐进式加载。

对于资源文件webpack支持在JS中以模块化的方式去载入任意类型的资源文件。打包工具解决的是前端整体的模块化，并不单指JavaScript模块化。




 






