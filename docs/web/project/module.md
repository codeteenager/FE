# 模块化

## 模块化的背景
* 前端模块化是一种标准，不是实现
* 理解模块化是理解前端工程化的前提
* 前端模块化是前端项目规模化的必然结果

## 什么是前端模块化?
前端模块化就是将复杂程序根据规范拆分成若干模块，一个模块包括输入和输出。而且模块的内部实现是私有的，它通过对外暴露接口与其他模块通信，而不是直接调用。现在在HTML文件中可以引用的script包括脚本和模块，其中模块具有更高的开发效率(可读性强、复用性高)，而脚本具有更高的页面性能，因为模块相对文件多，加载速度慢。需要注意的是模块在浏览器中运行会存在兼容性的问题，在script声明type="module"即可使用ES Module模块化规范。

## 模块化的进化过程
1. 全局function模式，将不同的功能封装成不同的函数，缺陷是容易引发全局命名冲突。比如刚开始在一个js文件中中定义一个一个的函数作为模块，但是这些函数挂载windows上的，我在另一个js文件中定义同名的函数就会导致冲突。

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
2. 全局namespace模式，通过对象封装模块，缺点是外部能够修改模块内部数据。将函数放在对象模块中挂载到window上，但是这样外部也能修改对象内部的属性。

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
3. IIFE模式，通过自执行函数创建闭包，缺陷是无法解决模块间相互依赖问题
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

## CommonJS规范
### 介绍
CommonJS规范是Node.js默认模块规范，他规定了每个文件就是一个模块，每个模块有自己的作用域，它的模块加载采用同步加载方式，加载模块的时候必须模块加载完成后再执行后续的代码。它通过require来加载模块，通过exports或module.exports输出模块。
### 特点
* 所有代码都运行在模块作用域，不会污染全局作用域
* 模块可以多次加载，第一次加载时会运行模块，模块输出结果会被缓存，再次加载时，会从缓存结果中直接读取模块输出结果
* 模块加载的顺序是按照其在代码中出现的顺序
* 模块输出的值是值得拷贝，类似IIFE方案中的内部变量

### 打包
CommonJS要想在浏览器中使用的话需要使用browserify来打包。

browserify打包原理主要是：通过自执行函数实现模块化，将每个模块编号，存入一个对象，每个模块标记依赖模块。它内部实现了require方法，核心是通过call方法调用模块，并传入require、module、exports方法，通过module存储模块信息，通过exports存储模块输出信息。

## AMD规范介绍
AMD规范采用异步加载模块，允许指定回调函数。Node模块通常都位于本地，加载速度快，所以适用于同步加载，但是在浏览器运行环境中，用同步加载会阻塞浏览器渲染，所以在浏览器环境中，模块需要请求获取，适用于异步加载。因此就诞生了AMD规范，用于异步加载，其中require.js就是AMD的一个具体实现库。目前不管是CMD或是AMD用的都很少，在Node开发中通常用CommonJS规范，在浏览器中用ES Module规范。

## CMD规范介绍
CMD规范整合了CommonJS和AMD的优点，通过异步加载模块。CMD专门用于浏览器端，其中sea.js就是CMD规范的一个具体实现库。

## ESModule规范介绍
ESModule规范是目前应用最为广泛的模块化规范，它的设计理念是在编译时就确定模块依赖关系及输入输出。而CommonJS和AMD由于采用闭包的形式必须在运行时才能确定依赖和输入、输出。ESM通过import加载模块，通过export输出模块。

## CommonJS和ESModule规范对比
* CommonJS模块输出的是值得拷贝，ES6模块输出的是值得引用
* CommonJS模块是运行时加载，ES6模块是编译时输出接口
* CommonJS是单个值导出，ES6 Module可以导出多个
* CommonJS是同步加载，ES6 Module是支持异步加载，通过import()来实现
* CommonJS的this是当前模块，ES6 Module的this是undefined
* CommonJS和ES6 Module的语法不同
* CommonJS是Node.js默认采用的模块化规范，Node14后默认支持ESM。ESM是浏览器默认采用的模块化规范。



 






