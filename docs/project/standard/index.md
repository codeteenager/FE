# 规范化
规范化是我们践行前端工程化中重要的一部分。

## 为什么要有规范化标准
俗话说，无规矩不成方圆，尤其是在开发行业中，更是要有严谨的工作态度，我们都知道大多数软件开发都不是一个人的工作，都是需要多人协同的，而不同的开发者有不同的编码习惯和喜好，这些个人的喜好并没有什么不好的地方，只是说同一个项目中，每一个人的喜好都不相同，那么就会导致项目的维护成本大大增加，所以说我们需要为每个项目或者团队需要明确统一的标准，让项目或团队中的成员按照统一的标准去完成工作，从而避免各种不统一而带来的麻烦。那么知道了为什么规范化标准之后，那么看一下在开发过程中，哪些地方用到规范化标准的。

* 代码、文档、甚至是提交的日志
* 开发过程中人为编写的内容
* 其中代码的标准化规范最为重要，因为代码的规范很大程度上决定着代码的质量以及可维护性，为了便于后期维护以及其他成员的阅读，一般情况下我们都对代码的风格进行统一的要求。


## 实现规范化的方法
我们在落实规范化的标准的时候也很简单，只需要提前约定好一个执行的标准，然后按照标准各自执行各自的开发工作。最后在Code Review环节按照之前约定的标准去检查各自相应的代码，但是按照人为约定的方式执行规范化会有很多的问题，一来人为约束不可靠，二来开发者也很难记住规则。所以我们就需要相对应的工具做保障，相比人为的检查，工具的检查更为可靠，同时配合自动化的工具进行自动化检查，这样就能得到质量化的保证。将工具检查代码规范的过程称为lint，例如前端常见的eslint、stylelint等。

## 常见的规范化实现方式
* ESLint工具使用
* 定制ESLint校验规则
* ESLint对TypeScript的支持
* ESLint结合自动化工具或者Webpack进行项目自动化校验
* 基于ESLint的衍生工具
* Stylelint工具的使用

## ESLint介绍
EsLint是目前最为主流的JavaScript Lint工具，专门用于检测JS代码质量，通过ESLint很容易统一开发者的编码风格，例如：缩进、换行、分号以及空格之类的使用。不仅如此，EsLint还能帮助我们找到代码中不合理的地方，例如我们定义了一个从未使用的变量，或者在变量使用之后才去做声明等等，而这些不合理的操作就是代码中潜在的问题，通过EsLint能有效避免这些问题，从而提高代码的质量。

## ESLint安装
首先我们需要创建一个项目，并在项目中安装ESLint模块为开发依赖，然后初始化配置文件。
```shell
mkdir test-eslint && cd test-eslint
npm init
npm install eslint -D //安装
npm init @eslint/config //初始化配置文件
```
然后提示，给出了三个选项
![](/project/39.png)
* To check syntax only：只检查语法的错误
* To check syntax and find problems：检查语法错误并发现问题代码
* To check syntax, find problems, and enforce code style：第三个在前两个基础上校验代码风格
  
其中语法错误比较好理解，问题代码指的是代码不合理的地方，例如未被使用的变量或者不存在的函数。代码风格指的是在代码风格上存在的问题，例如缩进不统一。在实际开发中建议选择第三种。

然后再选择项目的模块化，根据项目的实际情况选择即可。
![](/project/40.png)

等等一些基础配置，包括项目用的什么框架，React、Vue还是啥也没用，是否用TypeScript，你的项目运行在什么环境是浏览器还是Node，你想要在你的项目中怎样定义代码风格，使用市面上主流的风格、通过询问问题形成风格、根据JS代码文件推断出风格？
![](/project/41.png)
那么我们选择市面上主流的风格后，又提示让你选择具体市面上哪个风格。
![](/project/42.png)
最后提示配置文件以何种方式存放，这里选择JS的方式即可，方便后续做条件判断。
![](/project/43.png)
之后会提示安装项目需要的插件，确定安装即可，在项目根目录下会看到.eslintrc.js文件。

然后再执行`npx eslint xxx.js`可以看出校验了很多的问题。
![](/project/44.png)

总结来讲eslint有两个作用：一是可以找出代码的问题，包括语法错误、代码不合理、风格不统一。二是可以修复代码风格上的大多数的问题。例如`npx eslint xxx.js --fix`命令来修复

## ESLint配置文件解析
项目生成的.eslintrc.js文件内容如下：
```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
  }
}

```
该配置项默认有四个配置选项
1. env：JS在不同的环境中有不同的api可以调用，例如在浏览器中可以直接使用widow、document全局成员，这个env就是表明当前代码的运行环境，它会根据环境信息判断全局成员是否可用，为了避免代码中使用不存在的成员。比如browser为true表示代码运行在浏览器中，这里定义的每一个环境对应了一组全局变量，一旦开启了某个环境，这个环境的全局变量则都能被使用。env运行环境配置如下：
* browser：浏览器环境中的全局变量
* node：Node.js全局变量和Node.js作用域
* commonjs：CommonJS全局变量和CommonJS作用域(用于Browserify/Webpack打包的只在浏览器中运行的代码)
* shared-node-browser：Node.js和Browser通用全局变量
* es6：启用除了modules以外的所有ECMAScript6特性(该选项会自动设置ecmaVerison解析器选项为6)
* worker：Web Workers全局变量
* amd：将require()和define()定义为像amd一样的全局变量
* mocha：添加所有的Mocha测试全局变量
* jasmine：添加所有的Jasmine版本1.3和2.0的测试全局变量
* jest：Jest全局变量
* phantomjs：PhantomJS全局变量
* protractor：Protractor全局变量
* qunit：QUnit全局变量
* jquery：jQuery全局变量
* prototypejs：Prototype.js全局变量
* shelljs：ShellJS全局变量
* meteor：Meteor全局变量
* mongo：MongoDB全局变量
* applescript：AppleScript全局变量
* nashorn：Java 8 Nashorn全局变量
* atomtest：Atom测试全局变量
* embertest：Ember测试全局变量
* webextensions：WebExtensions全局变量
* greasemonkey：GreaseMonkey全局变量

2. extends：用于继承一些共享的配置，例如我们使用的standard规范。
3. parserOptions：该选项用于设置语法解析器的配置，它只检测语法，而不是检测哪个全局成员是否可用。
4. rules：用于配置校验规则的开启和关闭。

## ESLint配置注释
ESLint配置注释指的是将配置以注释的方式写在脚本文件中，然后再去执行代码的校验。在实际开发的过程中，难免会遇到一两个违反配置规则的情况，不能因为这一两个点去推翻校验规则的配置，这个时候可以使用ESLint配置注释来解决这样的问题。

```js
const str1 = '${name} is a coder'; //eslint-disable-line no-template-curly-in-string
console.log(str1);
```
例如使用eslint-disable-line选择性忽略这行代码，但是如果一行代码中有多个问题，通过这个注释都不会被检测到了，因此后面加上具体禁用的规则名称，这样就不影响其他的规则。
::: tip 相关文档
http://eslint.cn/docs/user-guide/configuring#configuring-rules
:::

## ESLint结合gulp
如果我们的项目中采用自动化构建工作流，那么我们就把ESLint集成到工作流中。在gulp使用babel编译之前，通过glup-eslint插件来检查代码。使用的时候先调用eslint插件检测，然后调用eslint.format()方法在控制台打印错误信息，然后再使用eslint.failAfterError()方法，在检查到错误之后终止任务管道。

## ESLint结合Webpack
在webpack中使用ESLint需要安装eslint-loader在babel-loader之前调用。
```js
rules:[
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
    },
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enfore: 'pre'
    }
]
```
这里使用一个 enforce 属性配置pre优先处理。它的值如下：
1. pre 优先处理
2. normal 正常处理（默认）
3. inline 其次处理
4. post 最后处理

针对React特殊语法需要安装eslint-plugin-react插件，然后在.eslintrc.js文件中配置插件，编写rules规则即可。
```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2
  },
  plugins:[
    'react'
  ]
}
```
我们也可以直接继承eslint-plugin-react中编写的规则，就可以共享配置中的内容。
```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
  }
}
```

## ESLint检查TypeScript
之前我们检查TypeScript是采用tslint工具，后来tslint官方放弃维护，推荐使用eslint配合typescript插件来做代码校验。注意这里在.eslintrc.js中配置ts的语法解析器。
```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
  ],
  parser: '@typescript-eslint/parser',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
  }
  plugins:[
    '@typescript-eslint'
  ]
}
```
## StyleLint介绍
在前端项目中除了JavaScript代码需要lint之外，css代码也需要lint，css代码的lint一般使用StyleLint来帮助完成。StyleLint默认提供了代码检查规则供开发者使用，我们也可以在配置文件中选择性的开启和关闭规则。StyleLint也同样提供了CLI工具，供开发者在命令行中调用，从而检查css代码。StyleLint也支持通过插件来实现对Sass、Less、PostCSS等衍生语法的检查。最后StyleLint也支持Gulp和Webpack工具的集成。

安装stylelint

```shell
npm install stylelint -D
```
安装stylelint共享配置模块
```shell
npm install stylelint-config-standard
```
创建.stylelintrc.js配置文件
```js
module.exports = {
  extends: [
    'stylelint-config-standard',
  ]
}
```
再通过命令校验css文件
```shell
npx stylelint ./index.css
```
如果你需要使用stylelint校验sass代码，那么就需要安装相对应的模块。
```shell
npm install stylelint-config-sass-guidelines
```
然后再添加配置文件
```js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines'
  ]
}
```

## Prettier的使用
Prettier是一款通用的前端代码格式化工具，它很强大，几乎能完成所有前端代码的格式化工作。在日常工作中，我们可以使用它来完成日常代码的自动格式化，通过使用它可以落实前端项目的规范化标准。

安装prettier
```shell
npm install prettier -D
```

格式化文件
```shell
npx prettier style.css --write
```

使用通配符的方式格式化所有的文件
```shell
npx prettier . --write
```

## Git Hooks介绍
Git Hook也称之为Git钩子，每个钩子都连着一个具体的Git操作，比如commit、push等等，我们可以通过shell脚本来编写钩子任务触发时要具体执行的操作。例如我们可以通过Git Hooks的方式在提交代码之前强制做lint检查，以便后续CI的时候lint失败。

我们打开git项目，在根目录下找到.git隐藏文件夹
![](/project/45.png)
打开hooks目录，可以看到sample钩子文件。我们可以去自定义这些文件。
![](/project/46.png)

由于很多前端开发者并不擅长shell，所以有开发者开发了一个npm模块Husky帮助实现Git Hooks的使用需求。使用Husky就可以在不编写shell脚本的情况下实现Git钩子的需求。

安装Husky
```shell
npm install husky -D
```
然后再package.json中配置husky，husky下有hooks对象，里面可以配置钩子和对应的命令。
```js
{
    "husky":{
        "hooks":{
            "pre-commit": "npm run test"
        }
    }
}
```

如果我们想在代码格式化后提交到暂存区，那么仅使用husky是满足不了需求的，这时候就需要使用lint-staged模块帮助协作。我们先安装lint-staged模块。
```shell
npm install lint-staged -D
```
然后配置package.json
```js
{
    "scripts":{
        "precommit": "lint-staged"
    }
    "husky":{
        "hooks":{
            "pre-commit": "npm run precommit"
        }
    },
    "lint-staged":{
        "*.js":[
            "eslint",
            "git add"
        ]
    }
}
```
这样就能在提交代码前先使用eslint校验，然后执行git add命令。




