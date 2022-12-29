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
* $parent/$children，它们用来获取父组件或子组件调用其成员，绝大多数用的很少。
* $refs，通过$refs可以访问子组件，在开发自定义组件中会用到。
* 依赖注入provide/inject，针对组件嵌套比较多的情况

## $attrs/$listeners
$attrs的作用是把父组件中非prop属性绑定到内部组件

$listeners的作用是把父组件中的DOM对象的原生事件绑定到内部组件

## 组件的分类
* 第三方组件：例如Element-UI、iView等
* 基础组件：例如文本框、按钮等
* 业务组件：指的是结合特定行业使用场景的组件，可以根据用户的行为输出特定的界面展示给用户。

如果我们开发的应用对界面要求不高，这时我们可以直接使用第三方组件，如果对组件的样式有很高的要求，或者有一套自己的使用标准，这个时候需要开发自己的组件库。开发一套方便团队内部使用的基础组件，或者说通用组件。如果针对特定的行业，比如财务、餐饮或者人力系统，会有针对特定业务抽象出来的组件，我们可以把这些组件抽象出来方便未来去重用。开发业务组件一般可以基于现有的组件，比如第三方组件，在第三方组件的基础上进行开发。

## Monorepo
假设我们要开发一个组件库，这个组件库有很多个组件，当我们开发完组件库后，我们还要把它发布到npm或私有仓库上，让其他人使用。在使用Element-UI的时候，我们可以完整的引用Element-UI，如果只使用到其中的部分组件，减少打包的体积，我们会选择按需引用的方式，要安装babel的插件，然后配置babel比较麻烦。我们开发的组件库为了使用方便，我们把组件作为衣蛾单独的包发布到npm上，其他人使用的时候只需要下载它需要的组件，当然你也可以把组件打包到一起发布。这时候我们有两种开发方式：
* Multirepo(Multiple Repository)，每一个包对应一个项目，即每个组件对应一个仓库也就是多仓库，每个组件需要脚手架，都要下载自己的依赖，都需要单独进行发布，而且我们多个组件可能会有相同的依赖，避免不了下载重复依赖。
* Monorepo(Monolithic Repository)，一个项目仓库中管理多个模块/包，即只创建一个项目，根目录下存放脚手架，所有的组件都放在根目录下统一的目录下，这个目录可以叫做packages，每一个组件在该目录中设置一个子文件夹，叫做包。所有的组件的配置都类似，因此可以放在根目录下。相同的依赖可以下载一份，打包测试都可以统一的管理。这种方式管理项目很方便，很多知名开源库都是这样管理项目的。例如vue3、react、babel等等。

## Storybook
[Storybook](https://storybook.js.org/docs/react/get-started/introduction)翻译过来是故事书，我们可以把每个组件想象成一个故事，Storybook就好像在讲一个一个的故事。Storybook是一个可视化的组件展示平台，可以使用Storybook在独立的环境中创建组件，在隔离的开发环境中，以交互式的方式展示组件。Storybook在主程序之外运行，因此用户可以独立开发组件库，而不必担心应用程序特定的依赖关系，也就是它把程序的开发和组件的开发分离，在Storybook中开发组件并预览测试。组件开发完毕可以直接在主程序中或者让其他人使用我们开发好的组件。Storybook支持非常多的框架，它可以开发下面这些框架的组件，例如：
* React、React Native、Vue、Angular
* Ember、HTML、Svelte、Mithril、Riot

另外，Storybook还支持很多插件，提供灵活的api，可以根据需要自定义Storybook，还可以构建Storybook的静态版本，并将其部署到HTTP服务器。

### Storybook安装
自动安装方式：
```shell
npx -p @storybook/cli sb init --type vue
yarn add vue
yarn add vue-loader vue-template-compiler --dev
```
整体目录结构如下：
![](/project/64.png)
看一下package.json的scripts命令
```js
{
    "scripts": {
        "storybook": "start-storybook -p 6006",
        "build-storybook": "build-storybook"
    },
}
```
storybook命令为启动storybook，build-storybook命令用来打包生成静态网站。

.storybook中main.js相当于是storybook的配置文件，这里设置了storybook的路径stories，storybook就是stories的集合，stories就是用来创建界面上呈现的内容。addons是插件，actions是用来快速注册事件的，links是用来设置链接。
```js
//.storybook/main.js
module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/vue"
}
```

stories中有Butoon、Header组件，stories引用对应的组件并呈现到界面上。
![](/project/65.png)

export default导出的组件，title就是界面上对应的大组，
```js
//stories/Button.stories.js

export default {
  title: 'Example/Button',
  component: MyButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};
```

export const是一些函数也就是导出一个个的故事
```js
export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};
```

我们在这个项目中可以先开发组件，等组件开发完成后，我们就可以写stories来查看组件渲染的结果。

## yarn workspaces
workspaces是工作区的意思，我们先看一下Monorepo的工作结构
```js
|-package.json
|_packages
  |-button
  | |_package.json
  |-form
  | |_package.json
  |-input
  | |_package.json
  |_steps
    |_package.json
```
最外层的文件夹中是脚手架，因为所有的包都有相似的行为，所以这里存放所有的包的开发依赖，比如babel、storybook以及测试工具jest等，packages目录下有很多包，每个包对应着一个或多个组件，不同的包可能有不同的运行依赖，每个包的package.json记录自己的依赖，常规情况下我们需要给每个包安装各自的依赖。两个包如果有相同的依赖则会重复下载，占用硬盘的情况。开启yarn workspaces之后可以让我们在根目录中使用yarn install给所有的包统一安装依赖，如果不同的包中引用相同的第三方包，这时只会下载一次，并把相同依赖提升到根目录下node_modules中减少重复。如果不同的包引用同一个包但是版本不同，这时候会把相同的包提升到根目录下，版本不同的会单独在包中下载。

### 开启yarn的工作区
在项目根目录的package.json中设置：private设置为true，这样根目录就不会发布出去，然后设置workspaces工作区的子目录，可以使用*指定packages下的任意包。
```js
{
  "private":true,
  "workspaces":[
    "packages/*"
  ]
}
```

### yarn workspaces使用
把工作区的开发依赖安装到根目录下的node_modules中，-D是开发依赖，-W是工作区指的是安装到工作区的根目录。
```shell
yarn add jest -D -W
```

我们可以给指定的包安装单独的依赖，通过yarn workspace 包名 add 第三方包名，注意包名指的是工作区下包的package.json的包名。
```shell
yarn workspace lg-button add lodash@4
```

如果我们的包中都有各自的依赖，可以使用yarn install安装所有包的依赖，不需要一个包一个包来安装，如果多个包有相同的依赖，会自动的将其提升到工作区下的node_modules中，防止重复下载。
```shell
yarn install
```

## Lerna
当我们组件库开发完毕后，想要把所有组件提交到Github或npm上，这时我们可以使用Lerna，方便我们把项目中的组件统一发布。

Lerna是babel自己维护自己的Monorepo而开源的项目，它是用来优化使用git和npm管理多包仓库的工作流工具，用于管理具有多个包的JavaScript项目，它可以一键把代码提交到git和npm仓库。Lerna也可以管理包的依赖，它可以选择使用npm还是yarn来管理包的依赖，它需要单独配置，如果使用yarn也可以开启yarn workspaces。一般我们会把Lerna和yarn workspaces结合使用，使用Lerna发布，使用yarn workspaces管理依赖。

### Lerna使用
全局安装
```shell
yarn global add lerna
```
初始化
```shell
lerna init
```
初始化后如果当前项目没有git管理的话，它会初始化git。在项目根目录创建lerna.json的配置文件，在package.json中添加开发依赖，初始化完毕我们就可以使用Lerna发布项目。
```shell
lerna publish
```
我们需要连接到git仓库，并登录npm，发布时就可以提交到git仓库并发布到npm上。

## Vue组件的单元测试
单元测试就是使用断言的方式对函数的输入、输出进行测试，根据输入判断输出和预测的输出是否相同。使用单元测试的目的是为了判断模块内部可能存在的错误，组件的单元测试指的是使用单元测试工具对组件的各种状态和行为进行测试，确保在组件发布之后在项目使用组件的过程中不会导致程序出现错误。

### 组件单元测试的好处
* 提供描述组件行为的文档
* 节省手动测试的时间
* 减少研发新特性时产生的bug
* 改进设计
* 促进重构

### 安装依赖
* Vue Test Utils：Vue官方提供的单元测试库
* Jest
* vue-jest
* babel-jest

```shell
yarn add jest @vue/test-utils vue-jest babel-jest -D -W
```

### 配置测试脚本
在package.json中配置单元测试的脚本
```js
//package.json
{
  "scripts":{
    "test": "jest"
  }
}
```

Jest配置文件
```js
//jest.config.js
module.exports = {
  "testMatch": ["**/__tests__/**/*.[jt]s?(x)"]
  "moduleFileExtensions":[
    "js",
    "json",
    //告诉Jest处理`*.vue`文件
    "vue"
  ],
  "transform":{
    //用`vue-jest`处理`*.vue`文件
    ".*\\.(vue)$":"vue-jest",
    //用`babel-jest`处理js
    ".*\\.(js)$":"babel-jest"
  }
}
```
Babel配置文件
```js
//babel.config.js
module.exports = {
  presets:[
    [
      '@babel/preset-env'
    ]
  ]
}
```
如果提示找不到babel可以安装Babel桥接
```shell
yarn add babel-core@bridge -D -W
```

### Jest常用API
全局函数 
* describe(name,fn)   创建代码块，把相关测试组合在一起
* test(name,fn)    测试方法
* expect(value)    断言，一般测试函数或者方法返回值
  
匹配器
* toBe(value)     判断值是否相等
* toEqual(obj)    判断对象是否相等
* toContain(value)  判断数组或者字符串中是否包含

快照
* toMatchSnapshot()

### Vue Test Utils常用API
mount()：创建一个包含被挂载和渲染的Vue组件的Wrapper。

Wrapper：
* vm        wrapper包裹的组件实例
* props()   返回Vue实例选项中的props对象
* html()    组件生成的HTML标签
* find()    通过选择器返回匹配到的组件中的DOM元素
* trigger() 触发DOM原生事件，自定义事件wrapper.vm.$emit()

## Rollup
在项目发布之前还需要打包处理，我们选择Rollup打包。Rollup是一个模块打包器，很多开源项目都采用Rollup打包，比如Vue、React等，Rollup支持Tree-shaking，可以静态分析代码中的import，然后排除未使用的代码，它打包的结果比Webpack要小，开发框架/组件库的时候使用Rollup更合适。

### 安装依赖
由于打包属于开发依赖，所以将其安装在工作区的根目录下。
* Rollup
* rollup-plugin-terser，对代码进行压缩
* rollup-plugin-vue，将单文件组件编译成JS代码
* vue-template-compiler

### 配置rollup
安装好rollup和相关插件后，配置rollup.config.js配置文件。
```js
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'
module.exports = [
  {
    input: 'index.js',
    output:[
      {
        file: 'dist/index.js',
        format:'es'
      }
    ],
    plugins:[
      vue({
        css:true,
        compileTemplate:true
      }),
      terser()
    ]
  }
]
```

## 设置环境变量
通过使用cross-env来设置环境变量
```shell
yarn add cross-env -D -W
```
在scripts脚本中
```js
{
  scripts:{
    "build:prod": "cross-env NODE_ENV=production rollup -c",
    "build:dev": "cross-env NODE_ENV=development rollup -c",
  }
}
```
## 清理
清理做两件事，清理所有包中的node_modules和dist。清理node_modules使用lerna的clean命令即可。
```shell
lerna clean
```
清理dist使用rimraf，先安装rimraf，然后使用其删除指定文件夹
```shell
yarn add rimraf -D -W
```
```js
{
  "scripts":{
    "del": "rimraf dist"
  }
}
```
每个包中都有del命令，但是我们不可能进入每个包去执行这个命令，因此使用yarn workspaces来执行所有包中的命令。
```shell
yarn workspaces run del
```

## 基于模板生成组件基本结构
如果我要创建一个新的组件，由于每个组件都是相同的目录结构，所以我们可以把相同的部分提取出来作为一个模板，基于模板快速生成一个新的组件结构，这时候我们可以使用plop或者自定义模板下载到本地。

## 发布
发布之前先打包，然后登录npm，使用lerna publish来发布即可。