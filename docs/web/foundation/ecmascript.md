# ECMAScript
ECMAScript也是一门脚本语言，一般缩写为ES，通常看做JavaScript的标准化规范，但实际上JavaScript是ECMAScript的扩展语言。因为在ECMAScript当中只是提供了基础的语法，例如变量、函数等语言层面的语法。而JavaScript实现了ECMAScript的标准，并且在基础上做扩展，可以让开发者在浏览器上操作DOM和BOM，在Node环境中可以做读写文件这些操作。

在浏览器环境中JavaScript等于ECMAScript+浏览器的API：DOM和BOM
![](/web/23.png)

在浏览器环境中JavaScript等于ECMAScript+Node的API
![](/web/24.png)

所以JavaScript本身指的就是ECMAScript，从2015年开始ES每年保持一个新版本的迭代，每次版本的迭代都有一些新特性。以下表格是ES的版本号和发行时间。

|  名称   |   标准版本  |  发行时间  |
| ------ |  -------| --------|
|ECMAScript 2019 (ES2019) | 10 | 2019年6月 |
|ECMAScript 2018 (ES2018) | 9 | 2018年6月 |
|ECMAScript 2017 (ES2017) | 8 | 2017年6月 |
|ECMAScript 2016 (ES2016) | 7 | 2016年6月 |
|ECMAScript 2015 (ES2015) | 6 | 2015年6月 |
|ECMAScript 5.1 (ES5.1) | 5.1 | 2011年6月 |
|ECMAScript 5 (ES5) | 5 | 2009年12月 |
|ECMAScript 4 (ES4) | 4 | 被放弃 |
|ECMAScript 3 (ES3) | 3 | 1999年12月 |
|ECMAScript 2 (ES2) | 2 | 1998年6月 |
|ECMAScript 1 (ES1) | 1 | 1997年6月 |

在ES2015开始按照年份命名，也把ES2015称之为ES6.

## ECMAScript概述
ES2015也称为ES6，它相比于ES5.1的变化比较大，自此命名规则发生变化。现在有用ES6泛指所有的新特性变化，而async函数是ES2017中制定的标准。
ES2015新增的变化简单的分为四大类：
1. 解决原有语法上的一些问题和不足，例如let和const
2. 对原有语法进行增强，例如解构、展开、模板字符串等
3. 全新的对象、全新的方法、全新的功能，例如promise
4. 全新的数据类型和数据结构，例如symbol、set和map等


具体的可以查看阮一峰老师写的 [ES6入门](https://es6.ruanyifeng.com/)