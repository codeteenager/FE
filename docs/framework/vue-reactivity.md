# Vue响应式原理
学习Vue响应式之前我们先了解数据响应式、双向绑定和数据驱动的概念。

* 数据响应式：数据模型仅仅是普通的 JavaScript 对象，而当我们修改数据时，视图会进行更新，避免了繁琐的 DOM 操作，提高开发效率。
* 双向绑定：数据改变，视图改变，视图改变，数据也随之改变。我们可以使用 v-model 在表单元素上创建双向数据绑定。
* 数据驱动是 Vue 最独特的特性之一，开发过程中仅需要关注数据本身，不需要关心数据是如何渲染到视图。

## 数据响应式的核心原理
在Vue中2.x和3.x的数据响应式原理是不一样的，为此做一个区分。

### Vue 2.x

```js
// 模拟 Vue 中的 data 选项
let data = {
    msg: 'hello'
}
// 模拟 Vue 的实例
let vm = {}
// 数据劫持：当访问或者设置 vm 中的成员的时候，做一些干预操作
Object.defineProperty(vm, 'msg', {
    // 可枚举（可遍历）
    enumerable: true,
    // 可配置（可以使用 delete 删除，可以通过 defineProperty 重新定义）
    configurable: true,
    // 当获取值的时候执行
    get () {
        console.log('get: ', data.msg)
        return data.msg
    },
    // 当设置值的时候执行
    set (newValue) {
        console.log('set: ', newValue)
        if (newValue === data.msg) {
            return
        }
        data.msg = newValue
        // 数据更改，更新 DOM 的值
        document.querySelector('#app').textContent = data.msg
    }
})
// 测试
vm.msg = 'Hello World'
console.log(vm.msg)
```

* [Vue 2.x深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)
* [MDN Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

### Vue 3.x
Vue 3.x采用proxy来实现，直接监听对象，而非属性。它是ES6中新增，IE 不支持，性能由浏览器优化。
```js
// 模拟 Vue 中的 data 选项
let data = {
    msg: 'hello',
    count: 0
}
// 模拟 Vue 实例
let vm = new Proxy(data, {
    // 当访问 vm 的成员会执行
    get (target, key) {
        console.log('get, key: ', key, target[key])
        return target[key]
    },
    // 当设置 vm 的成员会执行
    set (target, key, newValue) {
        console.log('set, key: ', key, newValue)
        if (target[key] === newValue) {
            return
        }
        target[key] = newValue
        document.querySelector('#app').textContent = target[key]
    }
})
// 测试
vm.msg = 'Hello World'
console.log(vm.msg)
```

* [MDN-Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## 发布/订阅模式
我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"(publish)一个信号，其他任务可以向信号中心"订阅"(subscribe)这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"(publish-subscribe pattern)

* 订阅者
* 发布者
* 信号中心

### Vue自定义事件
```js
let vm = new Vue()
vm.$on('dataChange', () => {
    console.log('dataChange')
})

vm.$on('dataChange', () => {
    console.log('dataChange1')
})

vm.$emit('dataChange')
```

### 兄弟组件通信过程
```js
// eventBus.js
// 事件中心
let eventHub = new Vue()

// ComponentA.vue
// 发布者
addTodo: function () {
    // 发布消息(事件)
    eventHub.$emit('add-todo', { text: this.newTodoText })
    this.newTodoText = ''
}
// ComponentB.vue
// 订阅者
created: function () {
    // 订阅消息(事件)
    eventHub.$on('add-todo', this.addTodo)
}
```

### 模拟 Vue 自定义事件的实现
```js
class EventEmitter {
    constructor () {
        // { eventType: [ handler1, handler2 ] }
        this.subs = {}
    }
    // 订阅通知
    $on (eventType, handler) {
        this.subs[eventType] = this.subs[eventType] || []
        this.subs[eventType].push(handler)
    }
    // 发布通知
    $emit (eventType) {
        if (this.subs[eventType]) {
            this.subs[eventType].forEach(handler => {
                handler()
            })
        }
    }
}
// 测试
var bus = new EventEmitter()
// 注册事件
bus.$on('click', function () {
    console.log('click')
})
bus.$on('click', function () {
    console.log('click1')
})
// 触发事件
bus.$emit('click')
```

## 观察者模式
观察者(订阅者) -- Watcher
* update()：当事件发生时，具体要做的事情

目标(发布者) -- Dep
* subs 数组：存储所有的观察者
* addSub()：添加观察者
* notify()：当事件发生，调用所有观察者的 update() 方法

```js
// 目标(发布者)
// Dependency
class Dep {
    constructor () {
        // 存储所有的观察者
        this.subs = []
    }
    // 添加观察者
    addSub (sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }
    // 通知所有观察者
    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
// 观察者(订阅者)
class Watcher {
    update () {
        console.log('update')
    }
}
// 测试
let dep = new Dep()
let watcher = new Watcher()
dep.addSub(watcher)
dep.notify()
```
观察者和发布订阅的区别是：
* 观察者模式是由具体目标调度，比如当事件触发，Dep 就会去调用观察者的方法，所以观察者模式的订阅者与发布者之间是存在依赖的。
* 发布/订阅模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在。

![](/framework/7.png)


