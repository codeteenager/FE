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

Vue Router 默认使用的是 hash 模式，hash模式是基于锚点，以及onhashchange事件，通过锚点的值作为路由地址，当路由地址值放生变化的时候触发onhashchange事件，根据路径决定页面呈现的内容。
### History模式
History模式是基于HTML5中的[History API](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)，需要后端配合，IE9不兼容(可使用强制刷新处理)
```js
history.pushState() //IE10之后才支持
history.replaceState()
history.go()
```
调用history.push方法之后，浏览器路径会发生变化，这时候会向服务器发送请求。而调用history.pushState的时候，它不会向浏览器发送请求，只会改变浏览器地址栏中的地址，并且把地址记录到历史记录中去，所以通过pushState可以实现客户端路由。
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
## 底层原理
通过使用Vue.util.defineReactive将路由信息设置成响应式，然后通过router-link、$router.push、a href、浏览器前进、后退、手动更改URL等会触发Vue Router源码中的updateRoute方法，在updateRoute方法中去更改路由的响应式数据，数据更改后会自动触发router-view的更新，router-view会根据url匹配到渲染组件。
![](/framework/3.png)
