# TypeDom

## 一种完全以面向对象（OOP）作为设计思路的typescript前端框架,完全基于抽象类/具体类/实例的方式组织的前端框架.

    A typescript front-end framework that is designed entirely based on object-oriented programming (OOP),
    and is organized entirely in the form of abstract classes/concrete classes/instances

## 框架目标

    1、实现完全面向对象的方式进行前端开发；
    2、简单、便捷的开发具有复杂业务规范和流程的项目；
    3、构建面向有数据结构标准的js类库；
    4、构建面向业务需要的类库；
    5、构建UI组件库；
    
## 前端框架现状

    现代前端框架更多地采用了组件化、函数式编程等理念，强调的是组件之间的组合和松散耦合。

    虽然纯以OOP为主要设计思路的前端框架在当今并不占主流地位，但在适当场合下，OOP的确能提供良好的代码组织和复用方案，尤其在结合TypeScript等强类型语言时，更能发挥其优势。

## 适用场合

    1、大型复杂项目：在大型前端应用中，使用面向对象的框架可以有效地组织代码结构，通过类和继承机制，划分不同模块和组件，确保代码的可读性和可维护性。
    
    2、高度复用的组件系统：如果你的项目中有很多相似或相关的组件，通过继承自一个或多个基类，可以简化代码，实现组件的复用和定制化。
    
    3、强类型需求：使用TypeScript等强类型语言进行开发时，面向对象的特性如类、接口、泛型等可以提供强大的类型安全保障，减少运行时错误。
    
    4、严格的模块化设计：当项目需要严格的模块划分和清晰的职责边界时，OOP中的封装和接口设计能够帮助你创建低耦合、高内聚的模块。
    
    5、长期稳定且需要良好维护的历史项目：在已有项目升级或者维护阶段，面向对象的设计可以让代码结构更为稳定，利于新加入团队的开发者快速理解现有代码结构。
    
    6、遵循企业级设计模式：某些项目可能需要遵循特定的企业架构或设计模式，如MVC、MVVM等，这些模式往往基于OOP思想构建。
    
    7、需要实现复杂状态管理：在前端应用中，当有较多的状态需要管理时，可以利用面向对象的封装特性，通过类来封装状态和对应的操作方法，简化状态流转的控制。
    
    8、对接后台服务时采用相同设计模式：如果后端服务采用了面向对象的设计，前端与后端进行数据交互时，采用相似的OOP设计可以更好地对应后端的实体和接口，简化数据模型映射的过程。
    
    9、软件工程规范化要求：在大型企业或项目组中，如果团队已经建立了基于OOP的设计规范和开发流程，采用面向对象的前端框架有助于在整个开发团队内部保持一致的编码风格和设计原则。
    
    10、开发工具或框架集成：某些IDE或构建工具对于OOP代码有更好的支持，如智能提示、自动补全、重构工具等，此时选用面向对象的前端框架可以充分利用这些工具的优点，提升开发效率。
    
    11、游戏开发场景：在游戏开发领域，尤其是基于HTML5的游戏引擎（如Phaser、Three.js等）中，面向对象的设计思路非常关键。游戏中的各种对象（如角色、场景、道具等）都可以作为类进行定义，利用继承、封装和多态等特性来构建复杂的游戏逻辑和交互系统。
    
    12、桌面应用或Electron应用：对于构建跨平台桌面应用的Electron框架，由于其本质上是将Web技术应用于桌面环境，面对更复杂的应用形态和更深层次的系统交互，采用面向对象的编程方式可以帮助开发者更好地管理对象和状态，构建具有良好架构的桌面应用。
    
    13、教育与教学场景：面向对象编程的思想在教学和培训中有较好的普适性和可解释性，初学者通过学习和实践面向对象的前端框架，可以更深入地理解软件设计原则，培养良好的编程习惯。
    
    14、持续集成与自动化测试：面向对象的模块化和封装特性有助于编写可测试性更强的代码。当项目需要进行单元测试、集成测试或自动化测试时，清晰的对象接口和职责划分可以使测试用例编写更为简单和精确。
    
    15、代码重构与升级：面向对象设计强调封装和抽象，使得代码在需要重构或升级时，可以相对独立地对某一类或组件进行更改，而不会对整个项目造成太大影响，降低了改动的风险。
    
    16、多人协同开发：在大型团队开发环境中，面向对象的前端框架可以提供清晰的代码结构和职责分配，各个开发人员可以专注于自己负责的模块，减少冲突，提高协同效率。
    
    17、遗留系统改造或整合：如果需要对现有的基于OOP设计的遗留系统进行前端改造或整合，采用面向对象的前端框架可以更好地延续和利用原有系统的架构和逻辑。

    18、组件生命周期管理：面向对象的前端框架通过类的构造函数、初始化方法、生命周期钩子等特性，能够清晰地管理组件从创建、挂载、更新到卸载的全过程，使得开发者对组件的状态变化有更精细的控制。
    
    19、复用和拓展设计模式：面向对象编程能够轻易实现诸如工厂模式、单例模式、观察者模式等设计模式，这些模式在解决特定前端问题时（如缓存管理、事件驱动的通信机制等）具有重要作用。
    
    20、权限与角色管理：在需要进行细致权限控制的系统中，可以利用面向对象的方式创建用户、角色等实体，通过继承和多态实现不同角色之间的权限差异和功能扩展。
    
    21、模块化组件库开发：面向对象的编程范式非常适合用于开发模块化、可复用的组件库。通过定义基类和抽象类，可以设定一套统一的接口和规范，各具体组件只需继承和扩展这些基类，确保整体组件库的统一性和一致性。
    
    22、数据持久化与序列化：在前端开发中，有时候需要将复杂的数据结构持久化存储或通过网络传输，面向对象的实体类和属性可以方便地进行序列化和反序列化操作，简化数据的保存和恢复过程。
    
    23、状态机和流程控制：对于一些复杂的状态转移和流程控制场景，可以通过面向对象方式定义状态类和转换规则，利用类和实例的属性及方法实现状态机的管理。
    
    24、混合应用开发：在开发需要与原生API紧密集成的混合应用时，如使用Cordova、Ionic等框架，面向对象的设计方式有助于构建结构清晰、易于维护的代码结构，同时能更好地映射原生平台的面向对象特性。

    25、数据驱动应用：在构建高度数据驱动的前端应用时，可以利用面向对象的方式构建数据模型层，通过封装数据对象和相关操作，实现数据状态的集中管理和同步更新，提高应用的数据处理能力。
    
    26、图形界面与可视化应用：在构建包含大量图形元素、图表展示或三维视觉效果的前端应用时，面向对象的设计可以清晰地定义图形对象、图层、渲染器等各种组件，便于管理和维护复杂的图形界面逻辑。
    
    27、游戏引擎与物理模拟：对于需要进行物理模拟或复杂逻辑处理的游戏引擎开发，面向对象的编程方式能够很好地模拟真实世界的实体和交互，通过定义和继承各类游戏对象（如角色、场景、道具等），实现复杂的逻辑运算和状态管理。
    
    28、设计模式实践：面向对象编程是实现许多经典设计模式（如策略模式、装饰器模式、访问者模式等）的基础，通过在前端框架中实践这些设计模式，可以提升代码的可扩展性和灵活性。
    
    29、分层架构设计：面向对象的编程范式有助于实现前端应用的分层架构，如业务逻辑层、数据访问层、视图层等。通过定义清晰的对象层级和接口，可以更好地分离关注点，提高代码的整洁性和可维护性。
    
    30、多态性在组件扩展中的应用：在前端组件开发中，面向对象的多态性使得开发者能够创建一个组件族，基于基础组件通过继承和覆盖方法来实现特定功能的变体，增强组件的灵活性和可定制性。
    
    31、组件间通信与事件处理：通过面向对象的类定义，可以清晰地定义组件间通信的接口和协议，以及事件处理机制，从而实现模块化和低耦合的组件交互。
    
    32、组件树状结构与嵌套：在构建包含嵌套组件的复杂布局时，面向对象的设计可以更好地反映组件之间的层级关系，通过实例化和组合对象，构建出层次分明、易于理解的组件树结构。

    33、领域驱动设计（DDD）在前端应用：面向对象编程有助于实现领域驱动设计，通过对业务领域的建模，将复杂的业务逻辑分解为一个个独立的对象，这些对象反映了真实的业务概念，增强了代码与业务的契合度，使得开发更贴近业务需求。
    
    34、组件状态与副作用管理：在管理组件的内部状态和副作用时，面向对象编程可以将状态和相关的操作封装在对象内部，利用类的方法来控制状态的变化，从而降低代码的复杂性，提高代码的可预测性。
    
    35、模块与模块间的依赖管理：在大型项目中，利用面向对象的类和模块化编程，可以清晰地管理不同模块间的依赖关系，通过合理的抽象和接口设计，减少模块间的耦合度，提高代码的可重用性和可扩展性。
    
    36、Web Workers和Service Workers：在处理并发和离线缓存等高级前端技术时，面向对象的编程方式可以帮助构建结构清晰、职责明确的Web Worker或Service Worker对象，使得多线程处理和后台服务逻辑更为有序和可控。
    
    37、组件级缓存与优化：在进行前端性能优化时，可以利用面向对象的编程方式，为特定组件设计缓存机制，如通过对象属性记录上次渲染结果，判断是否需要重新渲染，从而避免不必要的DOM操作，提高页面性能。
    
    38、错误处理与异常捕获：面向对象编程的异常处理机制可以帮助前端开发者更好地组织错误处理逻辑，通过抛出和捕获自定义异常，使得代码在面对错误和异常情况时能够有更优雅、可控的反馈。
    
    39、组件生命周期的精细化控制：在复杂的前端组件中，通过面向对象的方式可以细化组件生命周期的不同阶段，例如定义专门的初始化、挂载、更新、卸载等方法，实现对组件生命周期的精细化管理。
    
    40、可配置化组件设计：面向对象编程有助于构建高度可配置化的组件，通过在类中定义默认配置项，并允许外部传入配置对象覆盖默认值，使组件能够根据不同场景灵活配置，增强组件的通用性和适应性。

    41、数据验证与校验：在前端表单提交或数据处理过程中，可以利用面向对象的方式创建数据模型类，将数据验证和校验逻辑封装在类的方法中，使得数据处理过程更加规范和易于管理。
    
    42、前端国际化与本地化：面向对象编程可以助力前端应用实现国际化与本地化功能，通过定义与语言相关的对象，封装字符串资源、日期格式、货币格式等，使得应用在不同地区和文化背景下都能提供恰当的服务。
    
    43、状态管理库的使用与扩展：在使用Redux、MobX等状态管理库时，面向对象编程可以协助开发者更好地组织和封装action、reducer、store等概念，实现更易于理解和维护的状态管理结构。
    
    44、大型前端项目的团队协作：在大型前端项目中，面向对象编程有助于团队成员理解和共享代码逻辑，通过类和接口的定义，明确代码职责，降低沟通成本，提高团队开发效率。
    
    45、前端性能监控与调试：面向对象编程可以协助构建前端性能监控模块，通过定义与性能指标相关的对象，封装请求跟踪、渲染性能、内存占用等监控逻辑，方便开发者定位和优化性能瓶颈。
    
    46、动画与过渡效果设计：在实现复杂的前端动画和过渡效果时，面向对象编程有助于组织动画逻辑，将动画过程拆分为不同的状态和动作，通过对象的方法和属性控制动画的执行和变换，使动画设计更有序且易于维护。
    
    47、前端路由管理：在单页面应用（SPA）中，可以采用面向对象的方式设计路由系统，通过定义路由对象，封装路由规则、导航守卫、动态路由匹配等功能，实现更强大且易于管理的前端路由系统。


## 框架特点

    基于虚拟DOM技术，参考Angularjs/Ext.js框架，创建的完全面向对象的前端框架。
    在开发流式编辑器、ofd编辑器和动态表单编辑器的过程中，发现Vue、Extjs这些框架无法满足需求。
    
    需要js对象能存储为json或xml数据文件，同时还要支持将json或xml数据转化为相关标准规定的数据结构的js类。而现有的前端框架无法支持、或支持有限制。
    而用纯原生js的方式开发则更加费时、费力。


## 框架优势

    1、代码组织与复用：面向对象的类体系能够帮助开发者清晰地组织代码，通过抽象类和继承实现代码复用。例如，可以定义一个基础组件类，其他具体的组件通过继承这个基础类来获取共通的属性和方法。
    
    2、封装性：OOP中的封装特性使得对象内部的状态和行为得以保护，对外只暴露必要的接口，有利于降低不同模块之间的耦合度，提高代码的可维护性和安全性。
    
    3、多态性：多态允许子类重写或扩展父类的方法，使得同一接口能够根据对象类型表现出不同的行为，这对于构建具有可扩展性的组件体系非常有用。
    
    4、一致性：面向对象的编程模型为开发者提供了一套统一的设计和实现规范，有利于团队协作和代码审查。
    
    5、设计模式支持：很多成熟的设计模式（如工厂模式、单例模式、观察者模式等）都是基于OOP思想的，这类框架能够更方便地应用这些设计模式解决实际问题。

    6、易于理解：面向对象的思维模式符合人类日常认知习惯，通过类和对象的概念可以更好地模拟现实世界的实体和行为，使代码更具可读性和直观性。
    
    7、模块化：OOP框架可以轻松实现模块化设计，通过定义独立的对象或组件，可以有效分割复杂的前端应用，便于团队分工合作和代码维护。
    
    8、责任单一原则：面向对象强调每一个类都有明确的责任和功能，遵循单一职责原则，这有助于减少代码冗余，增强代码的内聚性，防止代码变得过于庞大和混乱。
    
    9、易于扩展：通过继承和多态，可以方便地对已有类进行扩展和修改，适应不断变化的需求，降低了对原有代码的侵入性。

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

| Project                  | Status                                                           | Description             |
|--------------------------|------------------------------------------------------------------|-------------------------|
| [@type-dom/svgs]         | [![type-dom/svgs-status]][type-dom/svgs-package]                 | Svgs based on TypeDom   |
| [@type-dom/ui]           | [![type-dom/ui-status]][type-dom/ui-package]                     | Ui component management |
| [@type-dom/form-builder] | [![type-dom/form-builder-status]][type-dom/form-builder-package] | Dynamic Form project    |

[@type-dom/svgs]: https://github.com/type-dom/svgs

[@type-dom/ui]: https://github.com/type-dom/ui

[@type-dom/form-builder]: https://github.com/type-dom/form-builder

[type-dom/svgs-status]: https://img.shields.io/npm/v/vue-router.svg

[type-dom/ui-status]: https://img.shields.io/npm/v/vuex.svg

[type-dom/form-builder-status]: https://img.shields.io/npm/v/@vue/cli.svg

[type-dom/svgs-package]: https://npmjs.com/package/@type-dom/svgs

[type-dom-ui-package]: https://npmjs.com/package/@type-dom/ui

[type-form-builder-package]: https://npmjs.com/package/@type-dom/form-builder

## Installation

```bash
# or pnpm or yarn
npm install @type-dom/framework

```

## Usage

### Install the framework

Create a hello world page to app:

```app-root.ts
import { TypeRoot } from '@type-dom/framework';
import type { ITypeNode } from '@type-dom/framework';
import { router } from '../router';
import { Layout } from '../layout/layout.class';

/**
 * 应用类，挂载全局属性和方法。
 * 根节点，继承 TypeRoot;
 * 因为属性和方法要全局调用，所以全部设置为静态 static; 包括get也设置为静态
 */
export class AppRoot extends TypeRoot {
  className: 'AppRoot';
  static el: HTMLElement | string;
  childNodes: [Layout];
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
    const layout = new Layout();
    this.routerView = layout.routerView;
    this.addChild(layout);
    // 使用路由
    // 路由器初始化，并挂载到当前页
    router.init(this);
  }
}

```

``` app.element.ts
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
  }
}
customElements.define('app-root', AppElement);

```

``` main.ts 项目主程序
import './app/app.element';

```

```index.ht
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>type dom example</title>
  </head>
  <body>
    <app-root></app-root>
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
