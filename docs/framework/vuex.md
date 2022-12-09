# Vuex
>Vuex官网地址：https://vuex.vuejs.org/zh/

在官网上对Vuex有一个说明，Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。

这个状态管理主要包含以下三个部分：
* 状态，驱动应用的数据源；
* 视图，以声明方式将状态映射到视图；
* 操作，响应在视图上的用户输入导致的状态变化。

![](/framework/1.png)

从图中可以看到整个系统的运行是一个单向的，我们的数据驱动视图的更新，用户在视图上进行一些操作，然后触发action，通过action的方式去更改state，而不是视图直接更改state，

然后看一下Vuex的运行机制，它不和组件进行强关联，可以独立的提供响应式数据。在图中可以看到Vuex提供的state数据驱动Vue Components视图，视图通过Dispatch派发action，我们在action中可以进行一些异步的操作，比如通过ajax请求接口获取后端数据，然后通过commit方式提交到Mutation，然后由mutation最终更改state。那么为什么要经过一层mutation呢？主要是为了在Devtools中记录数据的变化，这样我们可以通过插件来调试。所以说mutation是一个纯同步的操作，如果你有异步的操作需要在action中处理。如果没有异步的操作，可以从组件直接commit到mutation的。

![](/framework/2.png)

## 核心概念
核心概念共分为以下五个部分：
* State：this.$store.state.xxx 取值
* Getter：this.$store.getters.xxx 取值，有一个缓存的效果
* Mutation：this.$store.commit("xxx") 赋值
* Action：this.$store.dispatch("xxx") 赋值，经过commit
* Module

## 底层原理
* State：最核心的提供了一个响应式数据
* Getter：借助Vue的计算属性computed来实现缓存
* Mutation：更改state方法
* Action：触发mutation方法
* Module：Vue.set动态添加state到响应式数据中

## 最佳实践

#### 使用常量替代Mutation事件类型
通过使用常量来替代Mutation事件类型，这样可以把事件类型单独放在一个文件中，使用起来很方便，有助于团队协作。
```js
//mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION';
```

```js
//store.js
import Vuex from 'vuex';
import {SOME_MUTATION} from './mutation-types';
const store = new Vuex.Store({
    state: {...},
    mutations:{
        //计算属性命名功能：使用一个常量作为函数名
        [SOME_MUTATION](state){
            //mutate state
        }
    }
});
```

#### 开启命名空间
随着项目的扩大，我们有很多的状态需要管理，这里建议对所有的模块开始命名空间namespaced:true，嵌套模块不要太深，尽量扁平化，灵活应用createNamespacedHelpers。