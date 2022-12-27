# 组件化开发
我们平时开发业务系统的时候，可能只关注如何把功能实现，并没有把精力关注在代码或组件在最大程度上可以被重用，这样导致每次开发不同项目的时候都会有不同程度重复性的工作。而一些持续运营的项目，或者一些业务相似的项目在开发过程中，为了提高开发效率，避免重复工作，可能会有专人来开发相应的组件库。很多的开源组件库都是为了提高公司内部的开发效率，在公司内部孵化出来的，比如我们常用的Element-UI就是饿了么内部使用的、以及iView是其公司内部创新的产物，最终都开源被更多人使用。实际在公司内部也会有满足自己业务需求的组件库。

其实还有一种组件优先的开发方式叫做CDD(Component-Driven Development)组件驱动开发。
* 是一种自下而上构建UI的过程
* 从组件级别开始，到页面级别结束。也就是先从相对完善的设计中抽象出组件，先隔离开发组件，然后再开发页面。

使用CDD开发的好处主要有：
* 可以让组件在最大程度被重用
* 并行开发，对单个组件的开发使用CDD可以让你页面级开发无法实现的方式在不同团队间共享任务，这个任务就是开发相对隔离的组件。
* 可视化测试，通过一些工具可以直接浏览我们的组件，而不需要到业务系统中测试组件，可以对组件的不同状态进行测试。

## 处理组件边界情况
在开发组件前先回顾vue文档中处理组件边界情况的api。
* $root，通过$root访问到vue的根实例，操作根实例中的成员。只有在小型的少量组件的应用中会在根实例存储共享数据，这样很方便。但是在大型应用还是推荐使用Vuex管理应用的状态。  
* $parent/$children
* $refs
* 依赖注入provide/inject

## Storybook
Storybook翻译过来是故事书，我们可以把每个组件想象成一个故事，Storybook就好像在讲一个一个的故事。Storybook是一个可视化的组件展示平台，可以使用Storybook在独立的环境中创建组件，在隔离的开发环境中，以交互式的方式展示组件。Storybook在主程序之外运行，因此用户可以独立开发组件库，而不必担心应用程序特定的依赖关系，也就是它把程序的开发和组件的开发分离，在Storybook中开发组件并预览测试。组件开发完毕可以直接在主程序中或者让其他人使用我们开发好的组件。Storybook支持非常多的框架，它可以开发下面这些框架的组件，例如：
* React、React Native、Vue、Angular
* Ember、HTML、Svelte、Mithril、Riot

另外，Storybook还支持很多插件，提供灵活的api，可以根据需要自定义Storybook，还可以构建Storybook的静态版本，并将其部署到HTTP服务器。

### Storybook安装
自动安装方式：
```shell
npx -p @storybook/cli sb init --type vue
yarn add vue
vue yarn add vue-loader vue-template-compiler --dev
```

storybook命令为启动storybook，build-storybook命令用来打包生成静态网站。

.storybook中main.js相当于是storybook的配置文件，这里设置了storybook的路径stories，storybook就是stories的集合，stories就是用来创建界面上呈现的内容。addons是插件，actions是用来快速注册事件的，links是用来设置链接。

stories中有MyButton、Welcome组件，stories引用对应的组件并呈现到界面上。

export default导出的组件，title就是界面上对应的大组，

export const是一些函数也就是导出一个个的故事，

我们在这个项目中可以先开发组件，等组件开发完成后，我们就可以写stories来查看组件渲染的结果。