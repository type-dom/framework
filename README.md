# TypeDom 一种完全面向对象的typescript前端框架,完全基于抽象类/具体类/实例的方式组织的前端框架.

## 基于虚拟DOM技术，参考Ext.js框架，创建的面向对象的前端框架。

    在开发开发流式编辑器、ofd编辑器和动态表单编辑器的过程中，发现Vue、Extjs这些框架无法满足需求。
    
    需要js对象能存储为json或xml数据文件，同时还要支持将json或xml数据转化为我们定义好的js类。而现有的前端框架无法支持、或支持有限制。
    而用纯原生js的方式开发，费时、费力。

    优点：
    1、完全面向对象的方式进行前端开发；
    2、可以积累需要的js类库，面向业务需要自定义的类库，不仅仅是需要的UI组件库；
    3、简单、便捷的开发具有复杂业务规范的开发

## 框架介绍

    1、技术栈
        –	虚拟DOM：虚拟树TypeDom,虚拟节点TypeNode，虚拟根节点TypeRoot
        –	webpack
        –	typescript
        –	抽象类
        –	实体类
        –	rxjs
    2、项目结构
        –	build
        –	public
        –	src
            –	element 元素具体类，节点名称固定
            - parser dom解析类
            - style 样式枚举、样式接口
            - text-node 文本具体类
            - type-element 元素抽象类
            - type-node 节点抽象类，最基础的类，其它抽象类或具体类的母类
            - type-root 根节点抽象类，项目根节点必须继承这个抽象类
            - x-element 元素具体类，可指定节点名称


## Introduction

TypeDom is a lightweight typescript front-end framework based on abstract classes, concrete classes, and instances.

#### Browser Compatibility

TypeDom supports all browsers that are [ES5-compliant](https://kangax.github.io/compat-table/es5/) .

## Ecosystem

| Project               | Status                                       | Description             |
|-----------------------|----------------------------------------------|-------------------------|
| [type-svgs]           | [![type-svgs-status]][type-svgs-package]     | Svgs based on TypeDom   |
| [type-ui]             | [![type-ui-status]][type-ui-package]         | Ui component management |
| [form-editor]         | [![form-editor-status]][form-editor-package] | Dynamic Form project    |

[type-svgs]: https://github.com/xjf7711/type-svgs
[type-ui]: https://github.com/xjf7711/type-ui
[form-editor]: https://github.com/xjf7711/form-editor
[type-svgs-status]: https://img.shields.io/npm/v/vue-router.svg
[type-ui-status]: https://img.shields.io/npm/v/vuex.svg
[form-editor-status]: https://img.shields.io/npm/v/@vue/cli.svg
[type-svgs-package]: https://npmjs.com/package/type-svgs
[type-ui-package]: https://npmjs.com/package/type-ui
[form-editor-package]: https://npmjs.com/package/form-editor


## Installation

```bash
# or pnpm or yarn
npm install type-dom.ts
```

## Usage

### Install the framework

Create a hello world page to app:

```ts
// Typescript Webpack
import {Br, Division, TypeRoot, TextNode} from 'type-dom.ts';
// app-root.ts 项目根节点
export class AppRoot extends TypeRoot {
  className: 'AppRoot';
  constructor(editorEl: HTMLElement) {
    super(editorEl);
    this.className = 'AppRoot'; 
    this.addAttrObj({ // 设置根节点的属性
      name: 'app-root'
    })
    this.addStyleObj({ // 设置根节点样式
      padding: '30px',
      border: '20px solid #dddddd'
    });
    this.createItems(this, [ // 添加子节点
      {
        TypeClass: Division, // 具体类
        childNodes: [
          {
            TypeClass: TextNode, // 文本类
            config: {
              title: ' hello world ! ' // 文本
            }
          },
        ]
      },
      {
        TypeClass: Br // 换行
      }
    ]);
    this.render(); // 渲染
  }
}

// main.ts 项目主程序
import {fromEvent} from 'rxjs';
import {AppRoot} from "./app-root";
fromEvent(document, 'DOMContentLoaded').subscribe(() => {
  const uiEl = document.querySelector('#example-ref') as HTMLElement;
  if (uiEl) {
    const view = new AppRoot(uiEl);
  }
});
```
```html
// index.html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>type dom example</title>
  </head>
  <body>
    <div id="example-ref"></div>
  </body> 
</html>
```


## Documentation

To check out [live examples](https://type-dom.org/examples/) and docs, visit [type-dom.org](https://type-dom.org).

## Questions

For questions and support please use [the official forum](https://forum.***.org) or [community chat](https://chat.***.org/). The issue list of this repo is **exclusively** for bug reports and feature requests.

## Issues

Please make sure to read the [Issue Reporting Checklist](https://github.com/xjf7711/type-dom/blob/dev/.github/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/xjf7711/type-dom/releases).

## Stay In Touch

- [Blog](https://www.cnblogs.com/Xu7711/comments)

## Contribution

Please make sure to read the [Contributing Guide](https://github.com/xjf7711/type-dom/blob/dev/.github/CONTRIBUTING.md) before making a pull request. If you have a TypeDom-related project/component/tool, add it with a pull request to [this curated list](https://github.com/xfj7711/awesome-type-dom)!

Thank you to all the people who already contributed to Vue!

<a href="https://github.com/vuejs/vue/graphs/contributors"><img src="" /></a>

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2013-present, xjf7711
