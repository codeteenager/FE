# 异步编程
目前主流的JavaScript环境都是以单线程模式执行的JavaScript代码，那JavaScript采用单线程模式的原因与其最早的设计初衷有关，最早JavaScript设计就是运行在浏览器端的脚本语言，它的目的是为了实现页面上的动态交互，而实现页面交互的核心就是DOM操作，这也就决定了它必须使用单线程模型，否则会出现很复杂的线程同步问题，假设有两个线程，一个线程修改了某个DOM元素，而另一个线程删除了某个DOM元素，那么浏览器就无法确定以哪个操作结果为准，为了避免线程同步的问题，就设计为单线程模式工作。

这里的单线程指的就是在JavaScript执行环境中负责执行代码的线程只有一个。它的优点就是更安全、简单，同时它的缺点就是耗时任务阻塞。为了解决耗时任务阻塞的问题，JavaScript将任务的执行模式分成了两种：同步模式(Synchronous)和异步模式(Asynchronous)。本文重点讲解异步模式。

## 同步模式
同步模式指的是代码中的任务依次执行，后一个任务要等前一个任务执行完再执行，在JavaScript中大部分的任务都是同步模式，这里不是同步执行而是排队执行。举个例子：
```js
console.log('global begin')
function bar () {
    console.log('bar task')
}
function foo () {
    console.log('foo task')
    bar()
}
foo()
console.log('global end')
```
刚开始执行的时候，JS引擎会将所有的代码加载进来，在调用栈中加入匿名的调用，匿名调用可以理解为将函数的全部代码放入匿名函数中执行，然后再逐行执行代码，执行console.log然后压入调用栈中，输出global begin，然后弹出栈，以此类推。调用栈只是JS引擎维护的一张工作表，记录正在工作的任务。若某一行代码执行时间过长，则后面的任务就会延迟，那么这种延迟就是阻塞，对用户而言会卡顿，这时候需要异步模式来解决这种耗时操作，比如浏览器环境的ajax操作和Node.js的大文件读写。

## 异步模式
异步模式不会等待这个任务的结束才开始下一个任务，对于耗时操作开启过后就立即往后执行下一个任务，耗时操作的后续逻辑一般会通过回调函数的方式去定义。如果没有异步模式，单线程的JavaScript语言就无法同时处理大量耗时任务。而对于开发者而言，异步的代码执行顺序是混乱的，例如：
```js
console.log('global begin')
setTimeout(function timer1 () {
    console.log('timer1 invoke')
}, 1800)
setTimeout(function timer2 () {
    console.log('timer2 invoke')
    setTimeout(function inner () {
        console.log('inner invoke')
    }, 1000)
}, 1000)
console.log('global end')
```
刚开始执行的时候，JS引擎会将所有的代码加载进来，在调用栈中加入匿名的调用，匿名调用可以理解为将函数的全部代码放入匿名函数中执行，然后再逐行执行代码，执行console.log然后压入调用栈中，输出global begin，然后弹出栈。执行到setTimeout timer1时，会在web apis中执行，然后继续往下执行JS代码，执行到setTimeout timer2时也是一样，接着执行到console.log打印global end，然后再web apis中会有两个setTimeout，timer2触发的时间短，先执行，将timer2压入消息队列中，然后将timer1压入消息队列，然后EventLoop循环将timer2放入执行栈中开始执行输出timer2 invoke，然后遇到setTimeout inner，将其放入web apis中，然后执行timer1，输出timer1 invoke，循环往复。
![](/web/26.png)

这里的同步模式和异步模式不是指写代码的方式，而是运行环境提供的api。常用的异步编程语法有promise、Generator、Async/await。

## Promise
回调函数可以说是JavaScript中所有异步编程的根基，但是直接使用传统回调则无法避免大量的回调函数嵌套，也就是回调地狱问题。为了避免回调低于问题，CommonJS提出了Promise的规范，在ES2015中被标准化，成为语言规范。Promise就是一个对象，用来表示异步任务。

其中注意的是Promise对象的then方法会返回一个全新的Promise对象，后面的then方法就是在为上一个then返回的Promise注册回调，前面的then方法中回调函数的返回值会作为后面then方法回调的参数，如果回调中返回的是Promise，那后面的then方法的回调会等待它的结束。

### 核心逻辑
1. 首先Promise是一个类，在实例化这个类的时候传入一个回调函数，这个回调函数称之为执行器，这个执行器会立即执行，当我们new Promise的时候，这个回调函数会立即调用。
2. 这个回调函数有两个参数分别是resolve和reject，这两个参数是两个函数，调用这两个函数的时候就是更改promise的状态。promise中有三种状态，分别是成功(fulfilled)、失败(rejected)、等待(pending)，它的状态只能是从pending=>fulfilled或者pending=>rejected，一旦状态确定就不可更改。resolve和reject函数是用来更改状态的，resolve将状态更改为fulfilled，而reject将状态更改为rejected。
3. then方法内部做的事情就判断状态，如果状态是成功，调用成功的回调函数，如果状态是失败，则调用失败回调函数，而且then方法是被定义在原型对象中。
4. then成功回调有一个参数，表示成功之后的值，then失败回调有一个参数，表示失败的原因。如果不传递参数，则内部设置默认值。

#### then方法的链式调用实现逻辑
then方法是promise对象下的，每一个then方法都要返回promise对象，这样才能实现链式调用。然后将上一个then的回调函数返回值传递给下一个then方法的成功回调。其次在then方法回调函数中可以返回普通值，也可以返回promise对象，如果是普通值则直接传递给下一个promise2对象即可。如果是promise对象的话，则需要判断该promise的状态，如果是成功的则在promise2中调用resolve传入结果，如果是失败的则调用reject传入失败的原因即可。

#### then方法识别Promise对象自返回
promise的then链式调用如果在回调函数中返回自身，那么会主动报异常。

```js
var promise = new Promise(function(resolve,reject){
    resolve(100);
});
var p1 = promise.then(function(value){
    return p1;
});
p1.then(function(){

},function(reason){
    console.log(reason);
});
```

#### 捕获错误
错误捕获主要包括执行器的错误捕获，并reject掉。其次是then的回调函数报错，在下一个then错误处理函数中获取到。

#### Promise.all
Promise.all方法是为了解决异步并发问题而生，它允许我们通过异步并发调用的顺序获取异步对应的结果。Promise.all返回值是一个promise对象,它是一个静态方法。如果它的所有Promise对象状态都是成功的，则返回Promise状态是成功，有一个是失败的则返回Promise对象就是失败的。

#### finally方法
无论promise最终执行的状态是成功的还是失败的，finally方法的回调函数都会执行一次，在finally后面可以链式调用then拿到promise最终返回的结果。

#### catch方法
该方法用来处理当前promise对象状态为失败的情况，then方法可以不传失败的回调，从而被catch方法所捕获。

#### 代码演示
```js
new Promise((resolve,reject)=>{
    resolve('成功');
});
```
实现：
```js
const PENDING = "pending";     //等待
const FULFILLED = "fulfilled"; //成功
const REJECTED = "rejected";   //失败

class MyPromise{
    //promise的状态
    status = PENDING;
    //成功的值
    value = undefined;
    //失败的原因
    reason = undefined;
    //成功回调
    successCallback = [];
    //失败回调
    failCallback = [];
    constructor(executor){
        try{
            executor(this.resolve,this.reject);
        }catch(e){
            this.reject(e);
        }
    }
    resolve = value=>{
        //如果状态不是等待，则阻止程序向下执行
        if(this.status!== PENDING) return;
        //将状态更改为成功
        this.status = FULFILLED:
        //保存成功之后的值
        this.value = value;
        //判断成功回调是否存在，存在则调用
        //this.successCallback && this.successCallback(this.value);
        while(this.successCallback.length){
            this.successCallback.shift()();
        }
    }
    reject = reason=>{
        //如果状态不是等待，则阻止程序向下执行
        if(this.status!== PENDING) return;
        //将状态更改为失败
        this.status = REJECTED;
        //保存失败的原因
        this.reason = reason;
        //判断失败回调是否存在，存在则调用
        //this.failCallback && this.failCallback(this.reason);
         while(this.failCallback.length){
            this.failCallback.shift()();
        }
    }   
    then(successCallback,failCallback){
        successCallback = successCallback ? successCallback : value = value;
        failCallback = failCallback ? failCallback : reason =>{ throw reason };
        let promise2 = new Promise((resolve,reject)=>{
            //判断状态
            if(this.status === FULFILLED){
                //这里用异步执行，等待同步执行完后才能获取到promise2，否则resolvePromise传递的promise2有问题
                setTimeout(()=>{
                    try{
                        let x = successCallback(this.value);
                        //判断x的值是普通值还是promise对象
                        //如果是普通值，直接调用resolve
                        //如果是Promise对象，查看promise对象返回的结果
                        //再根据promise对象返回的结果，决定调用resolve还是调用reject
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                });
                
            }else if(this.status === REJECTED){
                setTimeout(()=>{
                    try{
                        let x = failCallback(this.reason);;
                        //判断x的值是普通值还是promise对象
                        //如果是普通值，直接调用resolve
                        //如果是Promise对象，查看promise对象返回的结果
                        //再根据promise对象返回的结果，决定调用resolve还是调用reject
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                });
                
            }else{
                //等待
                //将成功回调和失败回调存储
                this.successCallback.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = successCallback(this.value);
                            //判断x的值是普通值还是promise对象
                            //如果是普通值，直接调用resolve
                            //如果是Promise对象，查看promise对象返回的结果
                            //再根据promise对象返回的结果，决定调用resolve还是调用reject
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    });
                });
                this.failCallback.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = failCallback(this.reason);;
                            //判断x的值是普通值还是promise对象
                            //如果是普通值，直接调用resolve
                            //如果是Promise对象，查看promise对象返回的结果
                            //再根据promise对象返回的结果，决定调用resolve还是调用reject
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    });
                });
            }
        });
        
        return promise2;
    }
    static all(array){
        let result = [];
        let index = 0;
        return new MyPromise((resolve,reject)=>{
            function addData(key,value){
                result[key] = value;
                index++;
                if(index === array.length){
                    resolve(result);
                }
            }
            for(let i = 0;i<array.length;i++){
                let current = array[i];
                //判断是普通值还是promise对象
                if(current instanceof MyPromise){
                    //promise对象
                    current.then(value=>addData(i,value),reason=>reject(reason));
                }else{
                    //普通值
                    addData(i,array[i]);
                }
            }
        });
    }
    static resolve(value){
        if(value instanceof MyPromise) return value;
        return new MyPromise(resolve=>resolve(value));
    }
    finally(callback){
        return this.then((value)=>{
            return MyPromise.resolve(callback()).then(()=>value);
        },()=>{
            return MyPromise.resolve(callback()).then(()=>{throw reason;});
        })
    }
    catch(failCallback){
        return this.then(undefined,failCallback);
    }
}
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    //判断x是否是MyPromise的实例
    if(x instanceof MyPromise){
        //promise对象
        x.then(resolve,reject);
    }else{
        //普通值
        resolve(x);
    }
}
```