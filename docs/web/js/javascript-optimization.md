# JavaScript性能优化
随着软件开发行业的发展，性能优化是一个不可避免的话题，那么什么样的行为才能算作性能优化呢？本质上来说，任何能提高运行效率，降低运行开销的行为，都可以算作性能优化的操作。那么JavaScript语言的优化从理解内存空间的使用，再到垃圾回收帮助我们去编写高质量的JavaScript代码。

## 内存管理
内存管理流程分为三步：申请内存空间、使用内存空间和释放内存空间，在JavaScript中并没有提供内存响应的api，所以JavaScript不能像c或java那样调用api去做内存响应的管理，但是我们依然能够在JavaScript脚本中进行内存声明周期的管理。 

```js
//申请
let obj = {};
//使用
obj.name="name";
//释放
obj = null;
```

在JavaScript中内存管理是自动的，我们在创建对象、数组的时候会自动分配内存空间，后续在代码执行过程中无法找到引用关系，这些对象就会被看做垃圾。另外代码中对象存在，而由于代码错误导致找不到该对象了，这也是垃圾。知道了有哪些垃圾，JavaScript执行引擎就会出来回收，这个过程就是JavaScript的垃圾回收。在JavaScript中可以访问到的对象就是可达对象(引用、作用域链)，可达的标准就是从全局变量出发是否能找到。

## GC的定义与作用
GC就是垃圾回收机制的简写，当GC工作的时候可以找到内存中的垃圾对象，然后对对象空间进行释放和回收，方便后续代码进行使用。那么GC中的垃圾是什么呢？
1. 程序中不再需要使用的对象
```js
function func(){
    name = "test";
    return `${name} is a developer`
}
func(); //当函数调用完后，不再需要使用name
```
2. 程序中不能再访问到的对象
```js
function func(){
    const name = "test";
    return `${name} is a developer`
}
func(); //当函数调用完后，外部空间访问不到name了
```

## GC算法是什么
GC算法就是GC工作时查找和回收所遵循的规则，例如如何查找空间，如何释放空间，回收空间的过程中如何去分配。

常见的GC算法：
* 引用计数
* 标记清除
* 标记整理
* 分代回收

### 引用计数算法实现原理
它的核心思想是内部通过一个引用计数器来维护当前对象的引用数，从而去判断对象的引用数是否为0来判断对象是不是一个垃圾对象。如果为0则GC开始工作进行对象空间的回收。

它的优点是发现垃圾时立即回收，因为它根据当前对象的引用数为0来判断是不是一个垃圾，如果是0则立即进行释放。引用计数算法能够最大限度的减少程序暂停，因为引用计数算法时刻监控着那些引用计数为0的对象，当内存占满的时候就会去找那些引用计数为0的对象进行释放，这样就能保证内存不会有占满的时候。

它的缺点是无法将那些循环引用的对象进行回收，而且它所消耗的时间长。什么是循环引用呢？

```js
function fn(){
    const obj1 = {};
    const obj2 = {};
    obj1.name = obj2;
    obj2.name = obj1;
}
fn();
```

### 标记清除算法实现原理
标记清除算法将整个垃圾回收分为两个阶段：一是遍历所有的对象找到活动对象进行标记，二是遍历所有的对象将没有标记的对象进行清除，同时把第一阶段做的标记给抹掉。经过这两次方便将垃圾空间进行回收。

它的优点是可以解决循环引用的对象进行回收，它的缺点是产生空间碎片化，当前所回收的垃圾对象在内存空间地址上不连续，由于不连续导致回收之后分散到各个角落，后续使用的时候如果新的申请空间大小匹配则可以直接使用，否大过大或过小就不适合使用。其次它也不会立即回收对象。

### 标记整理算法实现原理
标记整理算法可以看做是标记清除算法的增强版，它的第一阶段遍历所有的对象找到可达对象进行标记，它的第二阶段会在清除之前先去进行整理的操作，移动对象的位置让他们在地址上产生连续，然后再做清除的操作。

它的优点是解决了标记清除的空间碎片化，它的缺点是不会立即回收对象。

## V8引擎
V8引擎是一款主流的JavaScript执行引擎，目前Chorme浏览器和Node.js都在使用V8引擎执行JavaScript代码，它的速度很快，采用即时编译，将JavaScript代码转成直接执行机器码。他还有一大特点是内存是有上限的，在64位操作系统中内存的上限是不超过1.5G，在32位操作系统中内存的上限是不超过800M的。

### 垃圾回收策略
V8垃圾回收策略采用分代回收的思想，将内存空间按照规则分成两类，一类是新生代存储区，另一类是老生代存储区。它会根据不同代采用高效的GC算法，从而针对不同的对象进行回收的操作。

### V8中常用的GC算法
* 分代回收
* 空间复制
* 标记清除
* 标记整理
* 标记增量

### V8内存分配
V8把内存空间分成了两部分，左侧小空间用于存储新生代对象(32M(64位操作系统)|16M(32位操作系统))，这里新生代对象指的是存活时间较短的对象，比如局部作用域的变量。

#### 新生代对象回收实现
新生代对象回收过程采用复制算法+标记整理，它将内存区分为两个等大的空间，使用空间为From状态，空闲空间为To状态。在代码执行过程中，如果需要申请空间的话，会将活动对象分配存储于From空间，当From空间应用到一定的程度之后，就会触发GC操作，这时候会采用标记整理操作来将From空间进行活动对象的标记，找到活动对象之后会进行整理操作将位置变得连续，便于后续不会产生碎片化的空间，做完之后将活动对象拷贝到To空间，拷贝完成之后就可以将From空间进行回收释放操作了，然后将From和To进行空间交换即可。

![](/web/2.png)

#### 老生代对象回收实现

老生代对象存放在右侧老生代区域，它是指存活时间较长的对象，例如在全局对象下的变量、闭包中的变量数据等。它在内存管理中同样有限制，在64为操作系统中为1.4G，在32位操作系统中为700M。

它的垃圾回收过程采用标记清除、标记整理、增量标记算法。首先它采用标记清除算法来进行垃圾空间的回收，然后当新生代对象往老生代存储区进行迁移的时候采用标记整理进行空间优化，最后采用增量标记算法进行效率优化。

## performance内存监控
使用步骤如下：
1. 打开chrome浏览器输入目标网址
2. 进入开发人员工具面板，选择性能选项
3. 开启录制功能，访问具体页面
4. 执行用户行为，一段时间后停止录制，从而得到报告
5. 从报告中分析界面中记录的内存信息

### 内存问题的表现有哪些？
1. 当网络没问题的时候，页面出现延迟加载或经常性暂停，则内部可能出现频繁的垃圾回收
2. 页面出现持续性的糟糕的性能，则内部可能出现性能膨胀
3. 如果感受到页面的性能随着时间的延长越来越差，则内部可能出现内存泄露

有以上表现则通过performance进行内存分析，查找有问题的代码进行修改。

### 内存监控的几种方式
首先看一下内存问题的标准有哪些：
1. 内存泄露：指的是内存使用持续升高，但是没有下降的节点
2. 内存膨胀：指的是当前应用程序为了达到某个效果而需要庞大的内存空降。在大多数设备上都存在性能问题。
3. 频繁垃圾回收：通过内存变化图来分析

内存监控的几种方式有哪些？
1. 浏览器任务管理器
2. Timeline时序图记录
3. 堆快照查找分离DOM
4. 判断是否存在频繁的垃圾回收

#### 浏览器任务管理器
打开浏览器任务管理找到JavaScript使用的内存这一栏，查看打开页面的使用的内存如果一直增长则判断内存出现问题。它只能判断不能定位。
![](/web/3.png)

#### Timeline记录内存
打开performance，勾选memory内存选项，然后可以看到新增了一个区域，里面有JS Heap、Documents、Nodes、Listeners、GPU Memory。
![](/web/4.png)

#### 堆快照查找分离DOM
分离DOM指的是DOM从DOM树上分离了，但是在代码中引用了。这种DOM在界面上看不见，但是在内存中占据空间，所以这是一种内存泄露，那么可以从堆快照中查找这种分离DOM。

打开浏览器的开发者工具，找到内存选项卡，点击Take snapshot即可拍快照。
![](/web/5.png)

输入deta筛选条件即可查看哪些是分离DOM
![](/web/6.png)

#### 判断是否频繁的垃圾回收
* 使用Timeline查看是否频繁的上升下降
* 浏览器任务管理器中数据频繁的增加减小

## V8引擎执行流程
V8引擎本身也是一个应用程序，它是JavaScript的运行环境，V8引擎主要用来解析和编译JavaScript代码，它的内部也有很多的子模块，如图所示：
![](/web/7.png)
V8引擎是渲染引擎中执行JavaScript代码的一部分，Scanner是一个扫描器，他可以扫码JavaScript代码进行词法的分析，把JavaScript分析成tokens，parser是一个解析器，解析的过程就是语法分析的过程，它可以将tokens转换成抽象语法树，Ignition是V8提供的一个解释器，负责把抽象语法树AST转换成字节码。TurboFan是V8提供的编译器模块，把上一步提供的字节码编译成汇编代码去执行。

## 变量局部化
尽可能定义的变量存放在局部作用域中，减少数据访问时查找作用域链的路径，提高代码的执行效率。例如：
```js
//示例一
var i,str="";
function test(){
	for(i=0;i<1000;i++){
		str+=i;
	}
}
test();

//示例二
function test(){
	let str="";
	for(let i=0;i<1000;i++){
		str+=i;
	}
}
test();
```
在[JSBench](https://jsbench.me/)中查看运行速度，示例二要比示例一更快一些。对于数据的存储和读取，希望能够减少作用域的访问层级。
![](/web/8.png)

## 缓存数据
在代码编写的过程中，有一些数据在不同的地方会有多次的使用，这样的数据可以提前保存起来，以便后续使用，核心还是减少访问查询的层级。

## 减少访问层级
比如以下代码：
```js
//示例一
function Person(){
	this.name = "jie";
	this.age = 18;
}
let p = new Person();
console.log(p.age);

//示例二
function Person(){
	this.name = "jie";
	this.age = 18;
	this.getAge = function(){
		return this.age;
	}
}
let p = new Person();
console.log(p.getAge());
```
示例一访问的层数较示例二少，访问的更快一些。
![](/web/9.png)

## 防抖和节流
在一些高频率事件触发的场景下不希望对应的事件处理函数多次执行，例如场景：
1. 滚动事件
2. 输入的模糊匹配
3. 轮播图切换
4. 点击操作
5. ....

出现以上场景的原因是，浏览器默认情况下都会有自己的监听事件间隔，如果检测到多次的事件监听执行，那么就会造成不必要的资源浪费。这时就需要防抖和节流。

### 防抖
防抖指在高频的操作只识别一次点击，可以认为是第一次或最后一次。

```js
/**
 * handle: 最终需要执行的事件监听
 * wait: 事件触发之后多久执行
 * immediate: 控制执行第一次还是最后一次,false是最后一次
 */
function myDebounce(handle,wait,immediate){
    if(typeof handle !== 'function') throw new Error('handle must be an function');
    if(typeof wait === 'undefined') wait = 300;
    if(typeof wait === 'boolean') {
        immediate = wait;
        wait = 300;
    } 
    if(typeof immediate !== 'boolean') immediate = false;
    let timer = null;
    return function proxy(...args){
        let self =this;
        init = immediate&&!timer;
        clearTimeout(timer);
        timer = setTimeout(()=>{
            timer = null;
            !init?handle.call(self,...args):null;
        },wait);
        //立即执行
        init?handle.call(self,...args):null;
    }
}
```

### 节流
节流指在高频的操作下可以自己设置频率，让本来会执行很多次的事件触发，按着定义的频率减少触发的次数。
```js
function myThrottle(handle,wait){
    if(typeof handle !== 'function') throw new Error('handle must be an function');
    if(typeof wait === 'undefined') wait = 400;
    let previous = 0;
    let timer = null;
    return function proxy(...args){
        let now = new Date();
        let self = this;
        let interval = wait - (now - previous);
        if(interval <= 0){
            //是一个非高频的操作，可以执行handle
            clearTimeout(timer);
            timer = null;
            handle.call(self,...args);
            previous = new Date();
        }else if(!timer){
            //此时在定义的频率范围内，则不执行handle，这时候可以定义定时器，在规定时间后执行
            timer = setTimeout(()=>{
                clearTimeout(timer);
                timer = null;
                handle.call(self,...args);
                previous = new Date();
            },interval);
        }
    };
}
```

## 减少判断层级
当有if else多层嵌套的时候，提前用return去减少嵌套层级。if else适合于区间的条件判断，switch case适合于确定枚举值的判断。

```js
//示例一
function doSomething(part, chapter){
    const parts = ['ES2016','工程化','Vue','React','Node'];
    if(part){
        if(parts.includes(part)){
            console.log('属于当前课程');
            if(chapter > 5){
                console.log('您需要提供VIP身份');
            }
        }
    }else{
        console.log('请确认模块信息');
    }
}
doSomething('ES2016',6);

//示例二
function doSomething(part, chapter){
    const parts = ['ES2016','工程化','Vue','React','Node'];
    if(!part){
        console.log('请确认模块信息');
        return;
    }
    if(!parts.includes(part)) return;

    console.log('属于当前课程');
    if(chapter > 5){
        console.log('您需要提供VIP身份');
    }
}
doSomething('ES2016',6);
```
可以看出示例二的ops更多一些。
![](/web/10.png)

## 减少循环体活动
将循环体中经常使用又不变动的数据放到循环体的外部，做一个缓存，这样代码在执行过程中少做一些事情。
```js
//示例一
function test(){
    let i;
    let arr = ['React','Vue','Angular'];
    for(i=0;i<arr.length;i++){
        console.log(arr[i]);
    }       
}
test();

//示例二
function test(){
    let i;
    let arr = ['React','Vue','Angular'];
    let len = arr.length;
    for(i=0;i<len;i++){
        console.log(arr[i]);
    }       
}
test();
```
可以看出示例二的ops更多一些。
![](/web/11.png)

再者可以使用while循环替代for循环，从后往前的循环少做一些判断，从而更快一些。
```js
//示例一
function test(){
    let i;
    let arr = ['React','Vue','Angular'];
    let len = arr.length;
    for(i=0;i<len;i++){
        console.log(arr[i]);
    }       
}
test();

//示例二
function test(){
    let arr = ['React','Vue','Angular'];
    let len = arr.length;
    while(len--){
        console.log(arr[len]);
    }
}
test();
```
![](/web/12.png)

## 字面量与构造式
字面量的比构造式的快一些，字面量创建引用数据类型直接堆区中创建存放内容即可，而构造式创建是调用函数的方式会多做一些操作，所以速度会慢一些。

```js
//示例一
function test(){
    let obj = new Object();
    obj.name = "test";
    obj.age = 20;
    return obj;
}
console.log(test());

//示例二
function test(){
    let obj = {
        name: "test",
        age: 20
    }
    return obj;
}
console.log(test());
```

![](/web/13.png)