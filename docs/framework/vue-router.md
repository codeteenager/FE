# vue-router
>地址：https://router.vuejs.org/zh/

早先我们不用router的时代，我们通常一个url对应一个html文件或者jsp文件之类的，例如：www.xxx.com=>index.html、www.xxx.com/about=>about.html，每次切换url都需要我们的页面重新加载，这样很影响我们的用户体验。

后来出现了SPA(单页面)开发模式，所有的url对应同一个html文件，切换url不需要页面重新加载，即可执行相对应的逻辑，数据也从接口的形式获取。那么Vue Router就是解决这样的问题：

* 监听URL的变化，并在变化前后执行相应的逻辑
* 不同的URL对应不同的组件
* 提供多种方式改变URL的API(URL的改变不能导致浏览器的刷新)

## 使用方式
* 提供一个路由配置表，不同的URL对应不同组件的配置
* 初始化路由实例new VueRouter()
* 挂载到Vue实例上
* 提供一个路由占位，用来挂载URL匹配到的组件

## 路由类型
* Hash模式：丑，无法使用锚点定位
* History模式：需要后端配合，IE9不兼容(可使用强制刷新处理)

## 底层原理
通过使用Vue.util.defineReactive将路由信息设置成响应式，然后通过router-link、$router.push、a href、浏览器前进、后退、手动更改URL等会触发Vue Router源码中的updateRoute方法，在updateRoute方法中去更改路由的响应式数据，数据更改后会自动触发router-view的更新，router-view会根据url匹配到渲染组件，
![](/framework/3.png)
