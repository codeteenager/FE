# 组件库建设

::: tip
组件化，又或者组件抽离的目的是为了功能共享方便维护，其能够带来的好处是少写代码，统一管理、统一维护。一套基础组件代码千锤百炼精而又精，从而起到快速支撑业务迭代，提升开发效率的目的。
:::

## 前言
去年我们平台为客户提供了一套企业级前端组件方案，收集了一下客户的需求，同时也做了一部分调研工作，由于我们是为金融机构服务的，所以也发现了同业中广发所做的GFDesign也是这样的思路，大家可以看[广发移动端统一组件库GFDesign来了](https://mp.weixin.qq.com/s/p5MRiftFzK1iVARqdtnQkw)这篇文章，同时像蚂蚁的[Ant Design](https://ant.design/index-cn/)、字节的[Arco Design](https://arco.design/)和[Semi Design](https://semi.design/zh-CN/)以及腾讯的[TDesign](https://tdesign.tencent.com/)，都是类似的企业级设计系统以及组件库。那么提到了组件库不得不说一下组件化。

组件化是一种非常优雅的提效率、保质量的解决方案，可以帮助研发人员实现功能复用，降低代码重复率，提高研发效率。帮助设计师快速构建UI设计稿，保证风格的一致性，为用户带来视觉和交互的一致性，例如颜色、字体、大小等。所以组件化不仅仅是前端代码的组件化，同时也包含了UI设计稿的组件化，帮助产品经理或者UI设计师快速绘制原型图以及UI设计图。

前端组件建设作为前端基础设施建设中的一环，它在很大程度上直接决定了前端工程代码的复用率。组件建设的目的就是复用性、灵活性，从而提供开发效率和质量。组件建设能有效解决许多代码层面的问题，帮助开发人员提升研发质量和效率。

## 组件规范
### 设计语言规范
设计语言规范主要用于明确组件的表达方式、偏好或风格，例如颜色、布局、字体等。明确设计语言规范有两大好处：对内而言，统一设计规范会在最大程度上避免业务中出现各种个性化的设计，保证界面风格的一致性，使页面井然有序；对外而言，明确设计语言可以帮助企业建立统一的品牌符号、品牌特征，有助于加深产品在用户心中的印象，统一的颜色和交互形式能增强用户对产品的熟悉感和信任感，好的设计语言可以在体验上为产品加分。设计语言主要包括7部分。

第一，设计价值观。设计原则是指导设计师进行设计的准则，它确定了一个设计语言的基调。例如，国内比较著名的设计语言Ant Design，它的核心设计价值观就是自然、确定性、意义感、生长性。

第二，色彩体系。设计语言需要在一开始就定义好整个系统的色彩体系，色彩体系一旦建立，后面所有的设计都将围绕这一体系展开，包括品牌色、辅助色、字体黑白灰颜色、不可用颜色、超链接颜色、成功或失败颜色等。从设计角度来看，设计师们会维护一套主色盘和辅助色盘用于后续的设计工作；从研发角度来看，开发人员在实现组件时也会用变量存储关键色彩数值，便于统一维护和替换主题色。

第三，图形。图形是设计语言中不可缺少的一部分，它能够将某个概念转换成清晰易读的图形，从而降低用户的理解成本，提升界面的美观度。例如，图标、背景图、插画等，它们都属于图形的一部分。

第四，布局。布局是页面设计中至关重要的环节，它直接确定了页面中内容的区域划分，一个合理的布局方案能够让页面的内容展示得更为友好。例如，设计语言Ant Design采用的就是24栅格体系，在不同像素的显示设备下呈现的形式不同。

第五，字体。字体是体系化界面设计中最基本的构成之一，字体系统包括字体种类、字间距、行间距、字重、字体颜色等内容。一个科学合理的字体系统能够大大提升用户的阅读体验及效率。

第六，阴影。阴影来源于现实生活，由两个不同阶层的平面产生，且强度由两者之间的距离决定。物体的高度直接影响物体的阴影，物体离地面越远，阴影越大，模糊值越高。通过合理利用阴影，可以使得界面具有层次感，从而将用户注意力有效聚焦在需要突出展示的地方。

第七，图文关系。图文关系用于定义图片和文字之间的协同关系，保证两者之间不出现冲突。例如，当文字出现在图片上时，应该如何该搭配图文的色彩，文字应该展示在什么位置。

业界比较有名的设计语言有谷歌的Material Design、微软的Metro，以及蚂蚁金服的Ant Design等，其实不同的企业都有自己设计规范。从零到一搭建一套设计语言是一件烦琐、困难且成本极高的工作，所以我们一般选择一套成熟的设计语言作为基准语言，在它的基础上进行个性化改造。比如我们可以基于Ant Design设计规范修改全局的色彩、字体等，改造成我们自己企业的设计风格。

### 研发设计规范
按照组件的功能颗粒度对组件进行划分，可以得到原子组件和分子组件，其实这里的原子组件和分子组件是Design System（设计系统）中的理论，相关内容可以参考 [https://www.uisdc.com/atomic-design-theory](https://www.uisdc.com/atomic-design-theory)。明确组件的颗粒度可以帮助开发人员避免重复开发组件，最大程度实现组件的功能复用，不仅便于维护，而且能够提高研发效率。不可再拆分或者没有必要再拆分的组件被称为原子组件。如果组件至少包含一个原子组件，同时添加了功能代码片段进行功能扩展，就被称为分子组件。举个例子，当前有一个下拉框组件，能够根据传入的配置信息提供下拉选项，返回选择的对应信息。如果系统中频繁用到某个配置信息的下拉框组件，就可以基于下拉框组件进行封装，将需要外部传入的配置项直接内置，这样就能得到一个新的分子组件。

明确组件颗粒度后就需要制定原子组件的研发设计规范，可以分为以下5部分。

第一，KISS（Keep It Simple And Stupid）原则。它的核心理念是让代码尽可能简单，并且保持代码的可读性。开发人员判断组件是否符合KISS原则的关键并不是代码量，而是代码的可读性。如果代码可读性很好，使用者能在短时间内看懂，就说明该组件符合KISS原则。在大多数情况下，开发人员可以通过遵守代码规范、对函数进行清晰易懂的命名，以及添加说明性注释等方法来提高代码可读性。

第二，YAGNI（You Ain’t Gonna Need It）原则。它的核心理念是不要过度设计。例如，开发人员不要设计当前用不到的功能；不要编写当前用不到的代码。代码可以根据业务情况预留扩展点，但是不需要提前实现这些功能。

第三，DRY（Don’t Repeat Yourself）原则。它的核心理念是提高组件的复用性。同样功能的代码逻辑，只应该被实现一次。开发人员应该将公共部分抽象出来作为工具函数，从而提高代码的复用性和可维护性。例如，在大多数情况下，分子组件中的原子组件可以作为公共部分进行抽象，从而有效提高组件复用性。

第四，LOD（Law Of Demeter）原则。它的核心理念是降低组件之间的耦合性，尽量做到能不依赖就不依赖。如果需要依赖，那么也应该尽可能依赖抽象部分，保持依赖关系上的松耦合。如果能够保持松耦合，当依赖部分发生变更时就能够将影响降至最低。即便是不兼容式改动，开发人员也能以最低成本迁移。

第五，SRP（Single Responsibility Principle）原则。它的核心理念是一个组件应该只关注一个功能点。如果违反了该原则，就会导致组件内部出现大量的逻辑分支，从而使得逻辑混乱，组件难以拓展和维护。

以上设计原则并不需要在同一时间内全部遵守，开发人员应该灵活运用以上设计原则。例如，在实际业务开发中，如果不能确定某一个功能将被复用，却为了这个暂时用不到的复用需求投入大量的时间、精力，从而导致开发成本上升，就不是很好的做法。同时，这也违反YAGNI原则。因此，在第一次编写代码时，开发人员不需要投入太多精力去考虑复用性。如果遇到复用场景，就应该遵循DRY原则，对代码进行重构，从而使其能够被复用。

## 组件化的目标
* 代码复用，提升开发效率 根据业务特点，横向和纵向划分组件，以组件为单位承接业务需求。虽然以 UI 组件为主，但对于相对独立的功能，也进行了纵向的组件抽取。
* 组件独立开发维护，与各项目解耦 组件单独开发、调试、发布，供业务方调用，业务方只需专注业务本身。
* 更方便的组件调用，更合理的路由跳转 组件调用需明确输入、输出参数，并对参数进行校验并给出合理错误提示。
* 组件文档化，降低组件使用门槛 组件库需要有完善的使用说明文档，使业务方更加容易、便捷的使用。

## 组件的分类
在前端开发中，我们经常把组件按类别分为：基础组件和业务组件。

### 基础组件
基础组件是我们最底层的基础视图组件，它是上层建筑的基石，像我们常用的 [Element UI](https://element.eleme.io/#/zh-CN)、[Ant Design](https://ant.design/index-cn/)、[View Design](https://www.iviewui.com/)、[Vant](https://vant-contrib.gitee.io/vant/#/zh-CN) 等基础组件库。其中基础组件可分为：基础 UI 组件、基础工具组件。

* 基础 UI 组件：包含了：文本、图片、按钮、布局、loading 加载、toast 提示等常用的 UI 组件。
* 基础工具库：这是一组 JS 库，无 UI 界面，包含项目所使用的基础功能，如：网络请求、页面埋点、异常上报、与 Native 交互的 CallNative，以及一些常用 utility 工具等等。

### 业务组件
>业务场景：项目多且独立、又要保持产品一致性。

不同模块或者子系统之间很多业务往往是相通的或者相似的，如果这个时候我们每个页面对于实现类似的业务场景都去重复去写一遍业务代码，那完全是没必要的。我们可以把功能或者需求类似的有机体封装成一个业务组件，并对外暴露接口来实现灵活的可定制性，这样就封装成业务组件。比如商品模块,ui 和交互都一样,就抽取出来, 商品信息作为属性传递进来, 根据需求去展示商品信息, 内部交互自己处理,有的交互需要通知父组件时通过事件向外传递。

## 组件设计原则
* 需要统一技术栈，保证组件在同一技术生态。
* 单一职责，一个组件只专注做一件事，且把这件事做好。
* 追求无副作用，输入一但确定，输出就是固定的。
* 可配置，一个组件要明确它的输入和输出分别是什么，同时入口处检查参数的有效性。
* 粒度适中，划分粒度的大小需要根据实际情况权衡，太小会提升维护成本，太大又不够灵活和高复用性。每一个组件都应该有其独特的划分目的的，有的是为了实现复用，有的是为了封装复杂度，实现业务清晰的目的。
* 适当的包体大小，便于页面快速加载。
* 完善的使用说明文档。

## 组件的划分
在项目中我们经常会面临组件的提取，那么我们如何知道该提取哪些组件，在这里有两个建议，第一个是你项目中复用程度比较高，即不同页面或同一页面使用相对频繁的可以作为组件提取。第二个是项目中使用相对较少，但是复杂度和难度较大，业务属性很高，只有类似业务才会用到的组件。这就需要划分人员有足够的项目和业务经验去做组件的拆分。

对于组件我们去划分基础组件以及业务组件，由于业务组件具有业务属性，属于特定场景，所以我们这里基于基础组件去做一些类型的划分，当我们辨别哪些是基础组件的时候可以根据对应类型去做判断。这里以Ant Design为例：

* 通用型组件: 比如 Button, Icon 等
* 布局型组件: 比如 Grid, Layout 布局等
* 导航型组件: 比如面包屑 Breadcrumb, 下拉菜单 Dropdown, 菜单 Menu 等
* 数据录入型组件: 比如 form 表单, Switch 开关, Upload 文件上传等
* 数据展示型组件: 比如 Avator 头像, Table 表格, List 列表等
* 反馈型组件: 比如 Progress 进度条, Drawer 抽屉, Modal 对话框等
* 其他组件：比如Anchor 锚点, BackTop 回到顶部等

## 目录结构
我们以Element UI为例，分析一下工程的目录结构。

![](/project/28.png)

* build：打包工具的配置文件
* examples：存放组件示例以及文档
* packages：存放组件源码
* src：存放入口文件以及主要辅助文件
* src/directives：放置自定义指令
* src/locale：放置语言的配置文件
* src/mixins：放置组件用的混合文件
* src/transitions：放置动画配置文件
* src/utils：放置用到的工具函数文件
* src/index：组件注册的入口文件
* test：存放单元测试文件
* types：存放声明文件，方便引入typescript写的项目中，需要在package.json中指定typing字段的值为声明的入口文件才生效
* commonents.json：配置文件，标注了组件的文件路径，方便webpack打包时获取组件的文件路径

清晰可靠的目录结构可以有效提高开发效率。例如，每次在开发组件前，都需要进行创建组件目录、创建组件文件、初始化组件模板、创建测试目录/文件等一系列烦琐又重复的工作。在明确目录结构后，开发人员可以在scripts目录中添加脚本。当开发人员需要新增组件时，可以通过脚本在components目录下快速创建组件，提高开发效率。

## 样式主题
样式主题指组件的UI风格。组件在设计规范和技术上支持灵活的样式定制，从而满足业务和品牌多样化的视觉需求，包括但不限于全局样式（主色、圆角、边框）和指定组件的视觉定制。

样式主题通常会借助CSS扩展语言的变量能力。例如，Element UI的样式使用Sass作为开发语言，并定义了一系列全局/组件的样式变量，开发人员可以根据需求进行相应调整。在Element UI中我们找到packages/theme-chalk/src/common/var.scss，我们可以看到样式主题配置变量如下。

![](/project/29.png)

当开发人员需要进行样式定制时，可以通过变量覆盖的形式自定义相关参数值。除此之外Element UI也提供了在线主题编辑器，能够修改定制 Element 全部全局和组件的 Design Tokens，并能够方便地实时预览样式改变后的视觉。同时它还能够基于新的定制样式生成完整的样式文件包，供直接下载使用。

![](/project/30.png)

## 国际化
国际化（Internationalization）是一种设计和制造方式，它可以帮助产品快速适应不同国家和区域的要求。它规定开发人员应该从产品中抽离所有与地域语言、国家/地区和文化相关的元素，并能通过配置等手段快速替换这些元素。以界面文字为例，不同的国家和地区需要使用不同的语言。

开发人员在开发组件时，应该有意识地将通用词汇维护起来，例如交互反馈（确定、取消等）。除了词汇，时间也是国际化需要关注的部分，例如时区、日期展示等。

组件库应该提供全局设置国际化方案的方法。例如，Element UI中默认提供了locale来实现国际化的功能，默认为中文，我们引入组件库的时候可以设置。

```js
// 完整引入 Element
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
```

当然我们也可以使用vue-i18n插件来提供国际化的能力。国际化方案的底层都是通过维护多套配置信息实现的，其原理大同小异。

## 组件测试

组件是抽象的基础公共模块，因此对其进行单元测试是非常必要的。一方面，单元测试能够覆盖到一些端到端测试覆盖不到的点；另一方面，它也能提高组件代码的可维护性，保证代码质量。

组件测试推荐使用Jest框架，它是Facebook开源的一个前端测试框架，自带断言库，配置简易，提供了mock系统、快照测试、异步代码测试、静态分析结果等功能。

在组件测试中，被应用次数最多的通常是快照测试。快照测试会在测试文件目录下生成快照文件目录snapshots/**.test.js.snap。开发人员每次执行测试命令时，Jest都会先执行测试用例，然后将结果与该目录下的快照文件进行比对。如果两个快照的内容不匹配，测试用例就不会通过。生成的快照只有在第一次执行时才会自动变更，后续依赖开发人员手动更新。开发人员需要确认本次生成的快照内容通过，Jest才会将快照更新为当前执行结果。

在Element UI中使用Karma+Mocha来做单元测试，Karma是一个基于Node.js的JavaScript测试执行过程管理工具（Test Runner）。该工具在Vue中的主要作用是将项目运行在各种主流Web浏览器进行测试。Mocha是一个测试框架，在vue-cli中配合chai断言库实现单元测试。后续针对单元测试单独作为一个章节说明。

## 文档管理

组件编写完成是组件建设的第一步，只有当组件被实际运用到业务中，能够取得实质性研发提效成果，组件建设才有意义。组件使用的文档是否足够清晰、完善，是决定组件能否被有效运用的关键。一份优秀的组件文档必须满足以下两个条件。

* 组件属性描述齐全：文档应该包括组件的属性名、参数类型、功能描述、默认值、是否必填等内容，开发人员可以通过阅读组件文档快速了解组件的所有功能，不需要花费大量时间阅读源码。
* 主要使用场景全覆盖：丰富的功能示例可以帮助开发人员快速找到对应的使用场景，提高其使用组件的积极性和正确性。

Element UI 的 demo 源码都在 examples 目录中维护，当我们在 Element UI 工程下运行 npm run dev 的时候，会启动它的开发调试模式，并且运行官方文档和 demo。

对于开发人员来讲我们经常使用Markdown来编写开发文档，社区也有开源的文档生成工具，像[VuePress](https://vuepress.vuejs.org/zh/)和[dumi](https://d.umijs.org/)帮助开发人员快速生成组件文档。

## 构建打包

组件开发完成后，需要构建打包并输出编译后的文件，便于作为第三方依赖被其他模块使用。在一般情况下，开发人员会将打包结果输出在工程根目录下的build或lib文件夹下，并把该目录添加到.gitignore文件中，避免打包结果被Git记录后提交到代码仓库中。

在构建打包时需要考虑两个内容，一是模块规范，二是组件的实际使用场景。模块规范有CommonJS、AMD、CMD、UMD和ES6 Module，组件的使用场景主要有全量引入和按需引入两种。

全量引入指将所有组件都引入工程，按需加载不会将所有组件作为一个整体打包，而是通过编译的手段对每个文件进行单独处理。

以Element UI为例，为实现按需引入，需要借助 babel-plugin-component 这个 webpack 插件，并且配置 .babelrc。

```js
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

将下面这段代码

```js
import { Button } from 'element-ui'
```

转换成

```js
var button = require('element-ui/lib/button')
require('element-ui/lib/theme-chalk/button.css')
```

## 发布规范

当所有组件研发工作都完成后，开发人员需要使用npm publish发布组件的模块。每次发布模块都会涉及版本号的更新，同样应该遵守开源社区统一约定的语义化版本（Semantic Versioning）规范。

语义化版本规范是一套版本变化的规范，其结构是标准的版本格式：X.Y.Z，每个字母的含义如下。

* X：主版本号。当进行了不兼容式改动或者有重大更新时，会修改此版本号进行发版。一般对于该版本号的修改极其慎重，因为这种修改对使用方造成的冲击会很大。
* Y：次版本号。当进行了小功能的更新或升级时，会修改此版本号进行发版。
* Z：补丁版本号。当进行了低版本的缺陷修复时，会修改此版本号进行发版。

在大多数情况下，版本号都以0.1.0开始，并在每次发布时按照改动情况对相应版本号进行修改。当发布的模块被用于正式环境时，应该已经达到了1.0.0版本。

在发布模块的正式版本之前，还存在其他测试版本：

* Alpha：希腊字母 α 的谐音，指内测版。一般是用于内部交流或者提供给专业测试人员测试用的版本，通常存在大量功能或逻辑缺陷，不适合正式使用。
* Beta：希腊字母 β 的谐音，指公测版。一般是用于抢先测试体验的版本，该版本也会存在一些缺陷，不适合正式使用。
* Gamma：希腊字母 λ 的谐音，公测版的增强版本，通常来说与即将发行的正式版相差无几。
* RC：Release Candidate的缩写，指候选版本，依然处于Gamma阶段，但该版本已经完成全部功能并修复了大部分Bug。到了这个阶段只会修复Bug，不会再对软件做任何大的更改。


## 参考内容

* [闲鱼组件库的建设](https://blog.csdn.net/weixin_38912070/article/details/122571828)
* [爱奇艺知识WEB前端组件化实践](https://blog.csdn.net/weixin_38753262/article/details/113409819)
* [从0到1教你搭建前端团队的组件系统](https://juejin.cn/post/6844904068431740936)
* [前端基础设施怎么搞？看腾讯TDesign跨技术栈组件库的最佳实践！](https://view.inews.qq.com/a/20220708A05VIK00?refer=wx_hot&ft=0)
* [广发移动端统一组件库GFDesign来了](https://mp.weixin.qq.com/s/p5MRiftFzK1iVARqdtnQkw)
* [腾讯开源企业级设计体系 TDesign](https://mp.weixin.qq.com/s/sv9HufSjjpCrgA3Puy9QUw)
* [你好，ArcoDesign](https://mp.weixin.qq.com/s/h1OdcTdn9O2fj0NM-mY5OQ)
* [抖音企业级应用设计系统Semi Design正式开源](https://www.chinaz.com/2021/1029/1322354.shtml)
* [北汽(华夏出行)自研组件库《Essential》开源啦！](https://mp.weixin.qq.com/s/X7nYxYEGrU_foFvD--bHwg)
* [Vue DevUI 1.0 正式发布](https://zhuanlan.zhihu.com/p/560029630)