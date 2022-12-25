# 自动化构建
自动化构建时前端工程化的一个非常重要的组成部分，自动化就是通过机器代替手工工作，构建就是转换，将一个东西转换成另外一个东西，在开发行业的自动化构建就是将开发过程中编写的源代码自动化的转换成生成环境中可以运行的代码或程序，我们一般把这个转化的过程称为自动化构建工作流。它的作用就是让我们尽可能脱离运行环境兼容带来的问题，在开发阶段使用提高效率的语法、规范和标准。最典型的应用就是我们在开发网页应用程序时使用ECMAScript最新标准来提高编码效率和质量。利用sass增强css的可编程性，利用模板引擎抽象页面中重复的HTML。这些用法大都不被浏览器直接支持。这种情况下自动化构建工具则派上用场，通过自动化构建的方式，构建转换那些不被支持的特性，这样就能在开发过程中提高编码效率。

如何实现自动化构建呢？使用Npm Scripts是实现自动化构建工作流的最简方式。例如：
```js
{
    "scripts":{
        "build": "sass scss/main.scss css/style.css --watch",
        "serve": "browser-sync",
        "start": "run-p build serve"
    },
    "devDependencies":{
        "browser-sync":"^2.26.7",
        "sass":"^1.22.10",
        "npm-run-all": "^4.1.5"
    }
}
```
安装[browser-sync](https://browsersync.bootcss.com/)作为本地服务运行页面，调用build命令使用sass编译成css并使用--watch来监听文件修改，调用start使用npm-run-all并行运行命令，这就形成一个简单的自动化构建工作流。

Npm Scripts能做一些简单的自动化构建任务，但是对于一些复杂的构建过程，Npm Scripts就显得相对吃力。这时我们就需要相对专业的构建工具，这里我们就介绍一些市面上的自动化构建工具。目前市面上使用最多的分别是：
* Grunt
* Gulp
* FIS

可能有人会问webpack去哪了，严格意义上来说，webpack是一个模块化的打包工具，所以说不在自动化构建工具范围内。这些工具都可以帮助解决重复、无聊的工作，实现自动化，用法上都大体相同，都是先通过一些简单代码组织插件的使用，然后就可以使用这些工具去执行重复的工作了。

[Grunt](https://www.gruntjs.net/)可以说是最早的前端构建系统，它的插件生态非常完善，按照官方的话来说Grunt插件可以帮助你去完成任何想要做的事情，但是由于它的工作过程是基于临时文件实现的，所以说它的构建速度相对较慢。例如我们项目中使用它去完成sass文件的构建，它会去先对sass文件进行编译操作，再去自动添加私有属性的前缀，最后再去压缩代码，这样在每一步过程中Grunt都会有磁盘读写操作，比如在sass编译完成后，就会将结果写入一个临时文件，然后下一步插件回去读取临时文件再执行下一步。这样处理的环节越多，文件读写的次数越多。对于超大型项目来说，项目文件越多，构建处理的速度就会越慢。而[Gulp](https://www.gulpjs.com.cn/)很好解决了Grunt构建速度慢的问题。因为它是基于内存去实现的，也就是说他对文件处理的环节都是在内存中实现的，相对磁盘读写就快了很多。另外Gulp支持同时执行多个任务，效率自然大大提高，而且它的使用方式相对于Grunt更加直观易懂，它的生态也同样非常完善，所以说它后来居上非常受欢迎，现在应该是前端最流行的构建系统。

[FIS](http://fis.baidu.com/)是百度前端团队推出的构建系统，最早是在其内部使用，后来开源过后在国内快速流行，相对于前两个构建系统这种微内核的特点，FIS更像是一种捆绑套餐，它把我们在项目中的需求尽可能集成在内部，例如在FIS中很容易的处理资源加载、模块化开发、代码部署甚至是性能优化，正是因为这种大而全，在国内很快就流行开。

总体来说，如果你是初学者的话FIS更适合你，如果你要求灵活多变的话Gulp、Grunt应该是更好的选择。

## Glup基本使用
Glup作为当下最流行的构建系统，其核心特点就是高效、易用，使用Gulp非常简单，在项目中安装Glup的依赖，然后在项目根目录下添加glupfile.js文件，用于去编写Gulp构建执行的自动任务，完成之后就可以通过gulp的cli去运行这些构建任务。

```js
//gulpfile.js
//gulp入口文件
exports.foo = done=>{
    console.log('foo task working');
    done(); //标记任务完成
}

exports.default = done=>{
    console.log('default task working');
    done();
}

const gulp = require('gulp');
gulp.task('bar',done=>{
    console.log('bar working');
    done();
});
```

gulp任务可以通过export导出一个函数，然后使用命令`gulp foo`来调用。也可以使用default默认导出的方式，这种方式不需要指定任务名直接执行`gulp`命令即可。在gulp4.0之前可以通过`gulp.task`函数来定义任务，现如今仍然保留了该方式，但是不推荐使用。

## 组合任务
Gulp 提供了两个强大的组合方法： series() 和 parallel()，series用来组合串行任务，parallel用来组合并行任务。
```js
const {series, parallel} = require('gulp');

const task1 = done =>{
    setTimeout(()=>{
        console.log('task1 working~');
        done()
    },1000)
}

const task2 = done =>{
    setTimeout(()=>{
        console.log('task2 working~');
        done()
    },1000)
}

const task3 = done =>{
    setTimeout(()=>{
        console.log('task3 working~');
        done()
    },1000)
}

exports.foo = series(task1,task2,task3);
exports.bar = parallel(task1,task2,task3);
```
并行任务或者是串行任务在实际创建工作流中是很有用的，例如编译js和编译css他们是互不干扰的，这两个就可以采用并行的方式去执行，这样就能提高效率。再例如部署，部署前要先执行编译任务，这种我们就需要采用串行依次执行。

## 异步任务
Gulp中的任务都是异步任务，也就是在js中的异步函数，我们都知道调用异步函数是没有办法明确异步函数是否完成了，都是在函数内部，通过回调或者事件的方式去通知外部该函数执行完成了。在异步任务中也同样存在通知gulp异步任务完成这个问题，针对这个问题，gulp提供了几种方式。

### 回调函数
该回调函数与node中的回调函数一样，都是错误优先的回调函数，当我们想在任务处理过程中报出错误，阻止剩下任务执行的时候，通过给回调函数第一个参数指定一个错误对象即可。
```js
exports.callback = done=>{
    console.log('callback task-');
    done();
}
exports.callback_error = done=>{
    console.log('callback task-');
    done(new Error('task failed!'));
}
```

### Promise
Promise是相对回调函数比较好的方案，它解决了回调函数嵌套过深的问题。gulp中支持promise的方式，在任务执行函数中return一个Promise对象，一旦返回的Promise resolve了，表示任务结束了。resolve我们可以不返回值，gulp会忽略这个值。当我们reject后，它会阻止后续任务的执行。
```js
exports.promise = ()=>{
    console.log('promise task-');
    return Promise.resolve();
}
exports.promise_error = ()=>{
    console.log('promise task-');
    return Promise.reject(new Error('task failed!'));
}
```
### async/await
async/await是promise语法糖，更容易理解。
```js
const timeout = time =>{
    return new Promise(resolve =>{
        setTimeout(resolve,time)
    })
}

exports.async = async ()=>{
    await timeout(1000)
    console.log('async task-');
}
```

### stream
因为我们使用gulp大多都处理文件，所以stream更多的使用到。它结束的时机是stream end的时候
```js
const fs = require('fs');

exports.stream = ()=>{
    const readStream = fs.createReadStream('package.json');
    const writeStream = fs.createWriteStream('temp.txt');
    readStream.pipe(writeStream);
    return readStream;
}
```

## Gulp构建过程核心工作原理
构建过程大都是将文件读出来做一些转换，最后写入另外的位置。例如压缩文件，没有构建工具的话我们是将代码复制到压缩工具中，压缩完成后复制到对应的文件。通过代码的处理也是类似的，通过Node文件流api去做处理。例如：
```js
const fs = require('fs');
const {Transform} = require('stream');

exports.default = ()=>{
    //文件读取流
    const read = fs.createReadStream('normalize.css')
    //文件写入流
    const write = fs.createWriteStream('normalize.min.css')
    //文件转换流
    const transform = new Transform({
        transform:(chunk,encoding,callback)=>{
            //核心转换过程实现
            //chunk => 读取流中读取到的内容(BUffer)
            const input = chunk.toString();
            const output = input.replace(/\$+/g,'').replace(/\/\*.+?\*\//g,'');
            callback(null,output);
        }
    });
    //把读取出来的文件流导入写入文件流
    read
        .pipe(transform)  //转换
        .pipe(write);  //写入
    return read;
}
```
这就是gulp核心构建任务的工作过程，这个过程有三个核心概念，分别是读取流，转换流和写入流，读取流将需要转换的文件读取出来，经过转换流的转换逻辑转换成我们想要的结果，再通过写入流写入到指定的位置。这样的过程就完成了日常构建过程中所需要的工作。Gulp官方的定义就是The streaming build system，基于流的构建系统。

## Gulp文件操作API
Gulp提供了专门读取流和写入流的API，相比于底层Node的api，Gulp的api更强大更易于使用，至于负责文件加工的转换流，绝大多数情况下都是通过插件来提供的。这样的话我们通过gulp创建任务构建时的流程就是通过src方法去创建一个读取流，然后借助插件的转换流实现加工，最后通过gulp的dest方法创建写入流，写入到目标文件。例如：
```js
const { src, dest} = require('gulp')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')

exports.default = ()=>{
    return src('src/*.css')
        .pipe(cleanCss())
        .pipe(rename({extname: '.min.css'}))
        .pipe(dest('dist'))
}
```