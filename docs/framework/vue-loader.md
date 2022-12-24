# vue-loader
我们都知道loader是webpack最为复杂的部分，vue-loader又是应用了各种loader的高级特性，所以它更加复杂。为了理解vue-loader的源码，我们首先需要理解以下知识点：
* webpack loader执行流程
* loader循环解析
* 手动干预loader执行

## webpack loader执行流程
在webpack中loader的执行流程是从右向左被调用的，有些情况下，loader 只关心 request 后面的 元数据(metadata)，并且忽略前一个 loader 的结果。在实际（从右到左）执行 loader 之前，会先 从左到右 调用 loader 上的 pitch 方法，这就是Pitching Loader。

## loader循环解析
我们都知道vue模板文件是下面这样的格式
```vue
<template>
    <div>111</div>
</template>
<script>
    export default {
        data(){
            return {
                value: 1
            }
        }
    }
</script>
<style lang="css">
</style>
```
那么这样的vue模板文件是如何在浏览器中运行起来的呢？这就涉及到将源码进行转换，不知转换一次，而是转换多次。具体它是怎么转换的呢？
首先他要将template部分其变成`import './App.vue?vue&type=template&id=123456'`这样的import结构，然后webpack会对其重新解析，相当于产生了一个新的依赖，每个模块依赖会进行build，编译的话又会找到App.vue，这就是循环编译的概念。

在vue中会把.vue文件拆分成新的import，然后loader会重新执行一轮。
```js
import './App.vue?vue&type=template'
import './App.vue?vue&type=script'
import './App.vue?vue&type=style&id=1'
import './App.vue?vue&type=style&id=2'
```

## 手动干预loader执行
在我们拆分成import新的模块之后，我们可以决定这个模块的loader该如何执行。例如我们把vue模板拆分成一个一个的import，它仍然把所有的loader执行了一遍，是因为遵循了我们webpack的配置。那么我们如何去干预loader的执行呢，webpack提供了这样的能力。首先在import导入模块前加入-!，加上之后所有的loader都不会执行，如果想要执行则加上loader的路径。
```js
import '-!./App.vue?vue&type=template'
import '-!loader2.js!./App.vue?vue&type=template'
```

## VueLoaderPlugin
vue-loader分为两部分，vue-loader-plugin和vue-loader，vue-loader-plugin会在webpack执行过程中运行，在执行过程中的compilation也就是编译阶段做一些事情。插件执行完后就会在loader阶段执行vue-loader核心源码。

## 相关参考
* [https://github.com/xixizhangfe/vue-loader](https://github.com/xixizhangfe/vue-loader)
