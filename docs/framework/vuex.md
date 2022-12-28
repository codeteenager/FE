# Vuex
>Vuex官网地址：https://vuex.vuejs.org/zh/

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

### [通过ref访问子组件](https://cn.vuejs.org/v2/guide/components-edge-cases.html#访问子组件实例或子元素)
ref有两个作用
* 如果你把它作用到普通 HTML 标签上，则获取到的是 DOM
* 如果你把它作用到组件标签上，则获取到的是组件实例

创建 base-input 组件
```vue
<template>
    <input ref="input">
</template>
<script>
export default {
    methods: {
        // 用来从父级组件聚焦输入框
        focus: function () {
            this.$refs.input.focus()
        }
    }
}
</script>
```
在使用子组件的时候，添加 ref 属性：
```vue
<base-input ref="usernameInput"></base-input>
```
然后在父组件等渲染完毕后使用 $refs 访问：
```vue
mounted () {
    this.$refs.usernameInput.focus()
}
```
::: tip 注意
$refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组
件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs 。
:::
这种方式不到万不得已不要使用，这种方式会导致数据管理的混乱

## 简易状态管理方案
如果多个组件之间要共享状态(数据)，使用上面的方式虽然可以实现，但是比较麻烦，而且多个组件之间互相传值很难跟踪数据的变化，如果出现问题很难定位问题。

当遇到多个组件需要共享状态的时候，典型的场景：购物车。我们如果使用上述的方案都不合适，我们会遇到以下的问题
* 多个视图依赖于同一状态。
* 来自不同视图的行为需要变更同一状态。
对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。

对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

我们可以把多个组件的状态，或者整个程序的状态放到一个集中的位置存储，并且可以检测到数据的更改。你可能已经想到了 Vuex。

这里我们先以一种简单的方式来实现：
1. 首先创建一个共享的仓库 store 对象
```js
export default {
    debug: true,
    state: {
        user: {
            name: 'xiaomao',
            age: 18,
            sex: '男'
        }
    },
    setUserNameAction (name) {
        if (this.debug) {
            console.log('setUserNameAction triggered：', name)
        }
        this.state.user.name = name
    }
}
```
2. 把共享的仓库 store 对象，存储到需要共享状态的组件的 data 中
```js
import store from './store'
export default {
    methods: {
        // 点击按钮的时候通过 action 修改状态
        change () {
            store.setUserNameAction('componentB')
        }
    },
    data () {
        return {
            privateState: {},
            sharedState: store.state
        }
    }
}
```
接着我们继续延伸约定，组件不允许直接变更属于 store 对象的 state，而应执行 action 来分发(dispatch) 事件通知 store 去改变，这样最终的样子跟 Vuex 的结构就类似了。这样约定的好处是，我们能够记录所有 store 中发生的 state 变更，同时实现能做到记录变更、保存状态快照、历史回滚/时光旅行的先进的调试工具。

## Vuex回顾
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
* Vuex 是专门为 Vue.js 设计的状态管理库
* 它采用集中式的方式存储需要共享的数据
* 从使用角度，它就是一个 JavaScript 库
* 它的作用是进行状态管理，解决复杂组件通信，数据共享
### 什么情况下使用
Vuex 可以帮助我们管理共享状态，并附带了更多的概念和框架。这需要对短期和长期效益进行权衡。

如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 store 模式就足够您所需了。但是，如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。引用 Redux 的作者 Dan Abramov 的话说就是：Flux 架构就像眼镜：您自会知道什么时候需要它。

当你的应用中具有以下需求场景的时候：
* 多个视图依赖于同一状态
* 来自不同视图的行为需要变更同一状态

建议符合这种场景的业务使用 Vuex 来进行数据管理，例如非常典型的场景：购物车。

注意：Vuex 不要滥用，不符合以上需求的业务不要使用，反而会让你的应用变得更麻烦。

### 核心概念
在官网上对Vuex有一个说明，Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。

这个状态管理主要包含以下三个部分：
* 状态，驱动应用的数据源；
* 视图，以声明方式将状态映射到视图；
* 操作，响应在视图上的用户输入导致的状态变化。

![](/framework/1.png)

从图中可以看到整个系统的运行是一个单向的，我们的数据驱动视图的更新，用户在视图上进行一些操作，然后触发action，通过action的方式去更改state，而不是视图直接更改state，

然后看一下Vuex的运行机制，它不和组件进行强关联，可以独立的提供响应式数据。在图中可以看到Vuex提供的state数据驱动Vue Components视图，视图通过Dispatch派发action，我们在action中可以进行一些异步的操作，比如通过ajax请求接口获取后端数据，然后通过commit方式提交到Mutation，然后由mutation最终更改state。那么为什么要经过一层mutation呢？主要是为了在Devtools中记录数据的变化，这样我们可以通过插件来调试。所以说mutation是一个纯同步的操作，如果你有异步的操作需要在action中处理。如果没有异步的操作，可以从组件直接commit到mutation的。

![](/framework/2.png)

核心概念共分为以下五个部分：
* State：this.$store.state.xxx 取值
* Getter：this.$store.getters.xxx 取值，有一个缓存的效果
* Mutation：this.$store.commit("xxx") 赋值
* Action：this.$store.dispatch("xxx") 赋值，经过commit
* Module
  
### 基本使用
* 导入 Vuex
* 注册 Vuex
* 注入 $store 到 Vue 实例
```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex); 
export default new Vuex.Store({
    state:{

    },
    mutations:{

    },
    actions: {

    },
    modules:{

    }
})
```
```js
import store from './store'
new Vue({
    router,
    store,
    render: h=>h(App)
}).$mount('#app')
```
### State
State是单一状态树，它里面集中存储所有的的状态数据，并且State是响应式的，我们要获取数据的时候，直接从State中来获取。
```vue
<template>
    <div id="app">
        <h1>Vuex - Demo </h1>
        count:{{$store.state.count}}<br>
        msg: {{$store.state.msg}}
    </div>
</template>
```
当状态数据比较多的时候，总会重复$store.state，Vuex内部提供了简便的用法，它提供了mapstate函数，它会帮我们自动生成状态对应的计算属性，简化 State 在视图中的使用。
```js
// 该方法是 vuex 提供的，所以使用前要先导入
import { mapState } from 'vuex'
// mapState 返回名称为 count 和 msg 的计算属性
// 在模板中直接使用 count 和 msg
computed: {
...mapState(['count', 'msg']),
}
```
mapstate返回一个对象，里面包含两个计算属性的方法。这个计算属性的形式是
```js
computed: {
    count:state=>state.count
}
```
如果当前视图中已经有了 count 和 msg，如果使用上述方式的话会有命名冲突，mapState除了传数组，还可以传对象，传对象可以修改映射计算属性的名字，解决的方式：
```js
// 该方法是 vuex 提供的，所以使用前要先导入
import { mapState } from 'vuex'
// 通过传入对象，可以重命名返回的计算属性
// 在模板中直接使用 num 和 message
computed: {
    ...mapState({
        num: state => state.count,
        message: state => state.msg
    })
}
```
### Getter
Vuex中的Getter类似于组件中的计算属性，
```js
export default new Vuex.Store({
    state:{
        count: 0,
        msg: 'hello world'
    },
    getters:{
        reverseMsg(state){
            return state.msg.split('').reverse().join('');
        }
    },
    mutations:{

    },
    actions: {

    },
    modules:{

    }
})
```
```vue
<template>
    <div>
        reverseMsg:{{$store.getters.reverseMsg}}
    </div>
</template>
```
使用 mapGetter 简化视图中的使用

```js
import { mapGetter } from 'vuex'
computed: {
    ...mapGetter(['reverseMsg']),
    // 改名，在模板中使用 reverse
    ...mapGetter({
        reverse: 'reverseMsg'
    })
}
```
### Mutation
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，Mutation是同步执行的，可以保证在Mutation中收集到所有的状态修改。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。使用 Mutation 改变状态的好处是，集中的一个位置对状态修改，不管在什么地方修改，都可以追踪到状态的修改。可以实现高级的 time-travel 调试功能。
```js
export default new Vuex.Store({
    state:{
        count: 0,
        msg: 'hello world'
    },
    getters:{
        reverseMsg(state){
            return state.msg.split('').reverse().join('');
        }
    },
    mutations:{
        increate(state,payload){
            state.count += payload
        }
    },
    actions: {

    },
    modules:{

    }
})
```
```vue
<template>
    <div>
        <button @click="$store.commit('increate',2)">Mutation</button>
    </div>
</template>
```
使用 mapMutations 简化视图中的使用
```js
import { mapMutations } from 'vuex'
methods: {
    ...mapMutations(['increate']),
    // 传对象解决重名的问题
    ...mapMutations({
        increateMut: 'increate'
    })
}
```
### Action
在Action中可以执行异步操作，当异步操作结束后，如果需要更改状态，需要提交Mutation来修改state。Action的调用要通过dispatch来触发。
```js
export default new Vuex.Store({
    state:{
        count: 0,
        msg: 'hello world'
    },
    getters:{
        reverseMsg(state){
            return state.msg.split('').reverse().join('');
        }
    },
    mutations:{
        increate(state,payload){
            state.count += payload
        }
    },
    actions: {
        increateAsync(context,payload){
            setTimeout(()=>{
                context.commit('increate',payload);
            },2000);
        }
    },
    modules:{

    }
})
```
```vue
<template>
    <div>
        <button @click="$store.dispatch('increateAsync',5)">Action</button>
    </div>
</template>
```
使用mapActions简化操作如下：
```js
import { mapActions } from 'vuex'
    methods: {
    ...mapActions(['increateAsync']),
    // 传对象解决重名的问题
    ...mapActions({
        increateAction: 'increateAsync'
    })
}
```
### Module
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

### 严格模式
在Vuex中所有的状态变更都要提交Mutation，但这仅仅只是一个约定，那么我们可以采用开启严格模式，当我们直接使用$store.state.msg=""赋值的时候会报错。注意不要在生产环境下开启严格模式。它会深度检查状态树，来检查不合规的状态改变，会影响性能。我们可以在开发环境中启用。
```js
export default new Vuex.Store({
    strict: true
})
```


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

## Vuex 模拟实现
### 实现思路
* 实现 install 方法：Vuex 是 Vue 的一个插件，所以和模拟 VueRouter 类似，先实现 Vue 插件约定的 install 方法
* 实现 Store 类：实现构造函数，接收 options，state 的响应化处理，getter 的实现，commit、dispatch 方法

### install方法
```js
let _Vue = null
function install (Vue) {
    _Vue = Vue
    _Vue.mixin({
        beforeCreate () {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

```
### 实现store类
```js
class Store {
    constructor (options) {
        const {
            state = {},
            getters = {},
            mutations = {},
            actions = {}
        } = options
        this.state = _Vue.observable(state)
        // 此处不直接 this.getters = getters，是因为下面的代码中要方法 getters 中的 key
        // 如果这么写的话，会导致 this.getters 和 getters 指向同一个对象
        // 当访问 getters 的 key 的时候，实际上就是访问 this.getters 的 key 会触发 key 属性的 getter
        // 会产生死递归
        this.getters = Object.create(null)
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => getters[key](this.state)
            })
        })
        this.mutations = mutations
        this.actions = actions
    }
    commit (type, payload) {
        this.mutations[type](this.state, payload)
    }
    dispatch (type, payload) {
        this.actions[type](this, payload)
    }
}
// 导出模块
export default {
    Store,
    install
}

```
### 使用自己实现的 Vuex
src/store/index.js 中修改导入 Vuex 的路径，测试
```js
import Vuex from '../myvuex'
// 注册插件
Vue.use(Vuex
```