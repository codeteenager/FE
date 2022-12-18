# vue-router
>地址：https://router.vuejs.org/zh/

早先我们不用router的时代，我们通常一个url对应一个html文件或者jsp文件之类的，例如：www.xxx.com=>index.html、www.xxx.com/about=>about.html，每次切换url都需要我们的页面重新加载，这样很影响我们的用户体验。

后来出现了SPA(单页面)开发模式，所有的url对应同一个html文件，切换url不需要页面重新加载，即可执行相对应的逻辑，数据也从接口的形式获取。那么Vue Router就是解决这样的问题：

* 监听URL的变化，并在变化前后执行相应的逻辑
* 不同的URL对应不同的组件
* 提供多种方式改变URL的API(URL的改变不能导致浏览器的刷新)

## 基本使用
1. 创建 router 对象，提供一个路由配置表，不同的URL对应不同组件的配置，router/index.js
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由组件
import index from '@/views/index'
// 组成插件
Vue.use(VueRouter)
// 路由规则
const routes = [
    {
        name: 'index',
        path: '/',
        component: index
    }
]
// 路由对象，初始化路由实例new VueRouter()，挂载到Vue实例上
const router = new VueRouter({
routes
})
export default router
```
2. 注册 router 对象，main.js
```js
import router from './router'
new Vue({
    render: h => h(App),
    router
}).$mount('#app')
```
3. 创建路由组建的占位，用来挂载URL匹配到的组件，App.vue
```html
<router-view></router-view>
```
4. 创建链接
```html
<router-link to="./">首页</router-link>
<router-link :to="{name: 'index'}">首页</router-link>
```
### 动态路由传参
在路径中携带参数，`在组件中通过$route.params.id接收路由参数`，
```js
const routes = [
{
name: 'detail',
// 路径中携带参数
path: '/detail/:id',
component: detail
}
]
// detail 组件中接收路由参数
$route.params.id
```
还有一种方式，在路由配置中声明props为true，在组件中通过props方式来接收参数，比较推荐这种方式。
```js
const routes = [
    {
        name: 'detail',
        // 路径中携带参数
        path: '/detail/:id',
        component: detail,
        props: true
    }
]
// detail 组件中接收路由参数
const detail = {
    props: ['id'],
    temp
}
```
### 嵌套路由
```js
{
    path: '/',
    component: layout,
    children: [
        {
            name: 'index',
            path: '/',
            component: index
        },
        {
            name: 'details',
            path: '/details/:id',
            component: details
        }
    ]
}
```
### 编程式导航
```js
// 跳转到指定路径
router.push('/login')
// 命名的路由
router.push({ name: 'user', params: { id: '5' }})
router.replace()
router.go()
```


## 路由类型
### Hash模式
`https://music.163.com/#/playlist?id=3102961863` Hash模式路径中携带#，后面的内容作为地址，官方说很丑，路径中携带着与数据无关的符号。

Vue Router 默认使用的是 hash 模式，hash模式是基于锚点，以及onhashchange事件，通过锚点的值作为路由地址，当路由地址值放生变化的时候触发onhashchange事件，根据当前路由地址找到对应组件重新渲染。如果仅更改了路径中#后面的内容，浏览器不会向服务器请求这个地址，但是他会把这个地址存放到浏览器的访问历史中。
### History模式
History模式是基于HTML5中的[History API](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)，需要后端配合，IE9不兼容(可使用强制刷新处理)
```js
history.pushState() //IE10之后才支持
history.replaceState()
history.go()
```
调用history.push方法之后，浏览器路径会发生变化，这时候会向服务器发送请求。而调用history.pushState的时候，它不会向浏览器发送请求，只会改变浏览器地址栏中的地址，并且把地址记录到历史记录中去，所以通过pushState可以实现客户端路由。通过监听popstate事件，可以监听到浏览器历史操作的变化，在popstate处理函数中可以记录改变后的地址，当调用pushState和replaceState时不会触发该事件，当点击浏览器的前进或后退按钮时，或者调用history的back或forward的时候才会被触发，当地址修改后根据路由地址找到对应的组件进行渲染。
#### History模式的使用
History需要服务器的支持，在单页应用中，只有一个页面index.html，服务端不存在`http://www.testurl.com/login`这样的地址会返回404找不到该页面。所以在服务器端应配置除了静态资源外，都返回单页应用的index.html。

首先需要设置mode为history，因为默认是hash模式。
```js
const router = new VueRouter({
    // mode: 'hash',
    mode: 'history',
    routes
})
```

## Nginx配置History路由模式
通常我们配置Nginx下的某个服务的location是这样的
```js
location /{
    root html;
    index index.html index.htm;
}
```
当我们配置History路由的时候需要加上try_files配置，它的意思是试着访问一下这个文件，这个文件即当前浏览器请求的路径所对应的文件，这里有个变量$uri，这个$uri即当前请求的路径，它会去找当前请求路径所对应的文件，如果找到了就把文件直接返回，如果没找到则将$uri/作为目录下去寻找，如果找到了则返回文件，如果没找到则返回首页index.html。
```js
location /{
    root html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html
}
```
## 底层原理

通过使用Vue.util.defineReactive将路由信息设置成响应式，然后通过router-link、$router.push、a href、浏览器前进、后退、手动更改URL等会触发Vue Router源码中的updateRoute方法，在updateRoute方法中去更改路由的响应式数据，数据更改后会自动触发router-view的更新，router-view会根据url匹配到渲染组件。
![](/framework/3.png)

## 源码分析
### 插件安装
Vue有个全局性的API，就是Vue.use(plugin) 这个方法，插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制，官方提供了5个方面。
* 添加全局方法或者属性
* 添加全局资源：指令/过滤器/过渡等
* 通过全局混入来添加一些组件选项（vue-router就是这种）
* 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现(this.$echart)
* 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

vue-router就是以插件机制和Vue.js的核心深度集成。Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是Vue 构造器，第二个参数是一个可选的选项对象。我们来看一下在vue-router中编写的插件。

首先进入入口文件index.js，下面代码是提炼的骨架：
```js
/* src/index.js */

import { install } from './install'
/* more */

export default class VueRouter {/*...*/}

VueRouter.install = install
VueRouter.version = '__VERSION__'

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter)
}
```
可以看到，入口文件中定义了 VueRouter 类，也实现了 install 的静态方法：VueRouter.install = install，而 install 定义在 src/install.js 中。我们再来看一下install.js文件的内容。
```js
import View from './components/view'
import Link from './components/link'

export let _Vue

export function install (Vue) {
  /**
  * (路由安装）判断是否已安装过
  * 当install.installed为true并且存在Vue实例_Vue 代表已安装 直接return 否则继续执行下面的代码
  */
  if (install.installed && _Vue === Vue) return
  install.installed = true

  //把Vue构造函数记录到全局变量
  _Vue = Vue

  /* 判断变量是否已定义 */
  const isDef = v => v !== undefined

  /* 注册router实例 */
  /* 当组件被初始化后进入 beforeCreate 钩子时，才会有组件实例，这时候才会执行 registerInstance */
  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  /* 定义一个全局混入，混入Vue实例 */
  Vue.mixin({
    /**
    * 在beforeCreate钩子中初始化当前路由的信息 
    *  vue-router流程: 
    *    触发路由跳转 => 执行beforeCreate钩子的init => transitionTo =>  
    *    执行准备离开相关的路由钩子(后置守卫) =>
    *    接受异步组件并解析 => 执行准备进入的路由的钩子(前置守卫) => 
    *    更新视图（触发完组件的所有生命周期）=> 触发beforeRouterEnter的回调
    */
    beforeCreate () {
      /* Vue.options中是否存在根实例router 存在router时进行路由初始化操作 
       否则则直接从父组件_routerRoot中获取 */
      if (isDef(this.$options.router)) {
        /* 将根实例赋值给_routerRoot 保存根实例vm */
        this._routerRoot = this
         /* 给根实例添加_router属性等于router对象 保存router */
        this._router = this.$options.router
         /* VueRouter对象的init方法 执行init方法初始化路由 参数：根实例 */
        this._router.init(this)
         /**
        * Vue内部方法defineProperty响应式
        * 组件实例的$route属性(根实例的_router属性)定义为响应式，每次路由确认导航时会触发setter，
        * 将根实例重新渲染，每次路由切换都会执行回调修改_router(src/index.js:124)
        */
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
         /**
        * 非根组件则直接从父组件_routerRoot中获取
        * (因为是树形结构所以所有的组件的_routerRoot都等于根实例)
        */
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      /* 通过registerRouteInstance方法注册router实例 */
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  /**
  * 定义$router指向根实例的router对象
  * 在Vue的prototype上面绑定$router，这样可以在任意Vue对象中使用this.$router访问，
  * 同时经过Object.defineProperty，访问this.$router即访问this._routerRoot._router
  */
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  /**
  * 定义$router指向当前的路由
  * 指向根实例的 _route 属性，当 router-view 被生成时，会触发 $route 的 getter 函数
  * 同时会给 _route 收集到当前的渲染 watcher，访问this.$route即访问this._routerRoot._route
  */
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  /* 注册touter-view以及router-link组件 */
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

   /* 该对象保存了两个option合并的规则 */
  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```
以上可以用一句话总结就是封装了一个全局混入，定义了两个挂载在原型上的变量，注册了两个组件，两个变量分别是$router、$route，两种组件分别是`<router-link>`、 `<router-view>`。



