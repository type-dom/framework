# TypeDom

## 一种完全面向对象的typescript前端框架,完全基于抽象类/具体类/实例的方式组织的前端框架.

    基于虚拟DOM技术，参考Ext.js框架，创建的面向对象的前端框架。
    在开发流式编辑器、ofd编辑器和动态表单编辑器的过程中，发现Vue、Extjs这些框架无法满足需求。
    
    需要js对象能存储为json或xml数据文件，同时还要支持将json或xml数据转化为相关标准规定的数据结构的js类。而现有的前端框架无法支持、或支持有限制。
    而用纯原生js的方式开发则更加费时、费力。

    1、完全面向对象的方式进行前端开发；
    2、简单、便捷的开发具有复杂业务规范和流程的项目；
    3、构建面向有数据结构标准的js类库；
    4、构建面向业务需要的类库；
    5、构建UI组件库；

## 框架介绍

    1、技术栈
        –	虚拟DOM：虚拟树TypeDom,虚拟节点TypeNode，虚拟根节点TypeRoot
        –	webpack
        –	typescript
        –	抽象类
        –	实体类
        –	类实例

    2、项目结构
        – build
        – public
        – src
            – element 元素具体类，节点名称固定
                - html-element html标签类
                - svg-element svg标签类
                - x-element 通用元素具体类，需指定节点名称
            - parser 解析类，解析模板字符串
            - root-node 根节点类，创建APP的根节点，挂载在index.html的标签上
            - router 路由管理类，挂载路由
            - style 样式枚举、样式接口
            - text-node 文本具体类
            - type-element 元素抽象类
                - type-component 组件抽象类
                - type-container 容器抽象类
                - type-html html标签抽象类
                - type-svg svg标签抽象类
            - type-node 节点抽象类，最基础的类，其它抽象类或具体类的母类
            - type-root 根节点抽象类，项目根节点必须继承这个抽象类
            - x-node 通用节点类，创建虚拟节点
            - utils.ts 工具类
        - test 测试类

## Introduction

TypeDom is a lightweight typescript front-end framework based on abstract classes, concrete classes, and instances.

#### Browser Compatibility

TypeDom supports all browsers that are [ES5-compliant](https://kangax.github.io/compat-table/es5/) .

## Ecosystem

| Project                   | Status                                                              | Description             |
|---------------------------|---------------------------------------------------------------------|-------------------------|
| [@type-dom/svgs]          | [![@type-dom/svgs-status]][type-dom/svgs-package]                   | Svgs based on TypeDom   |
| [@type-dom/ui]            | [![@type-dom/ui-status]][type-dom/ui-package]                       | Ui component management |
| [@type-dom/form-designer] | [![@type-dom/form-designer-status]][type-dom/form-designer-package] | Dynamic Form project    |

[@type-dom/svgs]: https://github.com/type-dom/svgs

[@type-dom/ui]: https://github.com/type-dom/ui

[@type-dom/form-designer]: https://github.com/type-dom/form-designer

[@type-dom/svgs-status]: https://img.shields.io/npm/v/vue-router.svg

[@type-dom/ui-status]: https://img.shields.io/npm/v/vuex.svg

[@type-dom/form-designer-status]: https://img.shields.io/npm/v/@vue/cli.svg

[type-dom/svgs-package]: https://npmjs.com/package/type-dom/svgs

[type-dom-ui-package]: https://npmjs.com/package/type-dom/ui

[type-form-designer-package]: https://npmjs.com/package/type-dom/form-designer

## Installation

```bash
# or pnpm or yarn
npm install @type-dom/framework
```

## Usage

### Install the framework

Create a hello world page to app:

```ts
// Typescript
// Br,Division,TypeRoot,TextNode等都是框架定义好的类
import { Br, Division, TypeRoot, TextNode } from '@type-dom/framework';
import { TypeRoot, RouterViewClass } from '@type-dom/framework';
import type { ITypeNode } from '@type-dom/framework';
import { router } from '../router';
import { MenusClass } from '../layout/menus';
import { TdAside, TdContainer, TdFooter, TdHeader, TdMain } from '@type-dom/ui';

/**
 * AppRoot.ts
 * 应用类，挂载全局属性和方法。
 * 根节点，继承 TypeRoot;
 * 因为属性和方法要全局调用，所以全部设置为静态 static; 包括get也设置为静态
 */
export class AppRoot extends TypeRoot {
  className: 'AppRoot';
  static el: HTMLElement | string;

  constructor(option?: ITypeNode) {
    super(option);
    this.className = 'AppRoot';
    this.addAttrName('app-root');
    this.addStyleObj({
      display: 'flex',
      flexDirection: 'column',
      // padding: '10px',
      // border: '10px solid #dddddd',
    });
    this.events = [];
    this.createItems(this, [
      {
        TypeClass: TdContainer,
        childNodes: [
          {
            TypeClass: TdAside,
            config: {
              width: 250,
              name: 'td-aside'
            },
            childNodes: [
              {
                TypeClass: MenusClass,
                propObj: {
                  attrObj: {
                    name: 'menus'
                  },
                  styleObj: {
                    backgroundColor: '#eee',
                    // width: '250px',
                  },
                },
              },
            ],
          },
          {
            TypeClass: TdContainer,
            propObj: {
              attrObj: {
                name: 'container'
              },
              styleObj: {
                flexDirection: 'column',
              },
            },
            childNodes: [
              {
                TypeClass: TdHeader,
                childNodes: [
                  {
                    nodeValue: 'header',
                  },
                ],
              },
              {
                TypeClass: TdMain,
                childNodes: [
                  {
                    TypeClass: RouterViewClass,
                    propObj: {
                      attrObj: {},
                      styleObj: {
                        display: 'block',
                        boxSizing: 'border-box',
                        margin: '0',
                        padding: '0',
                        // width: 'calc(100% - ' + menusWidth + 'px)',
                      }
                    }
                  }
                ],
              },
              {
                TypeClass: TdFooter,
                childNodes: [
                  {
                    nodeValue: 'footer',
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
    this.routerView = this.childNodes[0].childNodes[1].childNodes[1].childNodes[0] as RouterViewClass;
  }

  useRouter() {
    // 路由器初始化，并挂载到当前页
    router.init(this);
    return this;
  }
}

// app.element.ts
import './app.element.scss';
import { AppRoot } from './app-root';

/**
 * 这个类其实就是一个真实DOM
 */
export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  /**
   * connectedCallback会在 custom element 首次被插入到文档 DOM 节点上时被调用，
   * 而 attributeChangedCallback则会在 custom element 增加、删除或者修改某个属性时被调用。
   */
  connectedCallback() { // 省去了监听document加载完毕
    const title = 'type-app';
    const appRoot = new AppRoot();
    appRoot.setAttrName(title);
    // 使用路由
    appRoot.useRouter();
    const shadowRoot = this.attachShadow({ mode: 'open' }); // mode "closed" | "open"
    // 挂载
    appRoot.mount(shadowRoot);
    // 渲染
    appRoot.render();
    console.log('appRoot is ', appRoot);
    const buff = [];
    appRoot.dump(buff);
    console.log('appRoot.dump() buff.join("") is ', buff.join(''));
  }
}

customElements.define('app-root', AppElement);


// main.ts 项目主程序
import { fromEvent } from 'rxjs';
import { AppElement } from "./app-root";

fromEvent(document, 'DOMContentLoaded').subscribe(() => {
  const uiEl = document.querySelector('#example-ref') as HTMLElement;
  if (uiEl) {
    const view = new AppElement(uiEl);
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

To check out [live examples](https://) and docs, visit [type-dom.org](https://).

## Questions

For questions and support please use [the official forum](https://forum.***.org)
or [community chat](https://chat.***.org/). The issue list of this repo is **exclusively** for bug reports and feature
requests.

## Issues

Please make sure to read
the [Issue Reporting Checklist](https://github.com/type-dom/framework/blob/dev/.github/CONTRIBUTING.md#issue-reporting-guidelines)
before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/type-dom/framework/releases).

## Stay In Touch

- [Blog](https://www.cnblogs.com/Xu7711/comments)

## Contribution

Please make sure to read
the [Contributing Guide](https://github.com/type-dom/framework/blob/dev/.github/CONTRIBUTING.md) before making a pull
request. If you have a TypeDom-related project/component/tool, add it with a pull request
to [this curated list](https://github.com/type-dom/awesome-type-dom)!

Thank you to all the people who already contributed to Vue!

<a href="https://github.com/type-dom/framework/graphs/contributors"><img src="" /></a>

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2013-present, xjf7711
