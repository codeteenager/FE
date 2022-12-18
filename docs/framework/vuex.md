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

## 组件间通信方式
大多数场景下的组件都并不是独立存在的，而是相互协作共同构成了一个复杂的业务功能。在 Vue 中为 不同的组件关系提供了不同的通信规则。

常见组件间通信方式分为三类：
* 父组件给子组件传值
* 子组件给父组件传值
* 不相关组件之间传值

![](/framework/6.png)

### [父组件给子组件传值](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE)
子组件中通过props接收数据，父组件中给子组件通过相应属性传值。
```html
<blog-post title="My journey with Vue"></blog-post>
```
```js
Vue.component('blog-post', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
})
```

### [子组件给父组件传值 (Event Up)](https://cn.vuejs.org/v2/guide/components.html#%E7%9B%91%E5%90%AC%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BA%8B%E4%BB%B6)
在子组件中使用 $emit 发布一个自定义事件：
```html
<button v-on:click="$emit('enlargeText', 0.1)">
Enlarge text
</button>
```
在使用这个组件的时候，使用 v-on 监听这个自定义事件
```js
<blog-post v-on:enlargeText="hFontSize += $event"></blog-post>
```

### [不相关组件传值 Event Bus](https://v2.cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2)
我们可以使用一个非常简单的 Event Bus 来解决这个问题：
```js
//eventbus.js
export default new Vue()
```

然后在需要通信的两端：
使用 $on 订阅：
```js
// 没有参数
bus.$on('自定义事件名称', () => {
// 执行操作
})
// 有参数
bus.$on('自定义事件名称', data => {
// 执行操作
})
```
使用 $emit 发布：
```js
// 没有自定义传参
bus.$emit('自定义事件名称');
// 有自定义传参
bus.$emit('自定义事件名称', 数据);
```

除了上述常见的传值之外，还有其他常见的方式：
* $root
* $parent
* $children
* $refs
  
通过这些相关的属性获取父子组件，调用组件上对应的成员，实现组件间的通信。只是这些都是不被推荐的使用方式，只有当项目非常小，或者开发自定义组件时才会使用。如果是大型项目还是推荐使用vuex来管理状态。

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