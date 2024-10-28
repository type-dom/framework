import { IJsonData } from '../../interface';
import { Watcher } from '../watcher/watcher.class';
import { Observer } from '../observer/observer.class';

export class Compile {
  private el: Node | null;
  private vm: IJsonData;
  constructor(el: string, vm: IJsonData) {
    this.el = document.querySelector(el);
    console.log('el is found . el is ', el);
    this.vm = vm;
    if (this.el) {
      this.compile(this.el);
    } else {
      console.warn('el is not found . ');
    }
  }

  compile(el: Node) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        this.compileElement(node as Element);
      } else if (this.isTextNode(node)) {
        this.compileText(node);
      }
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }

  isElementNode(node: Node) {
    return node.nodeType === 1;
  }

  isTextNode(node: Node) {
    return node.nodeType === 3;
  }

  compileText(node: Node) {
    const reg = /\{\{(.*)\}\}/;
    if (node.textContent && reg.test(node.textContent)) {
      const expr = RegExp.$1.trim();
      this.updateView(node, expr, 'text');
    }
  }

  compileElement(node: Element) {
    const attrs = node.attributes;
    // [...attrs].forEach(attr => {
    //   const attrName = attr.name;
    // if (attrName.startsWith('v-')) { // v- 前缀的属性
    //   const expr = attr.value;
    //   const type = attrName.substring(2);
    //   this[type](node, expr);
    // }
    // });
  }

  text(node: Node, expr: string) {
    this.updateView(node, expr, 'text');
  }

  updateView(node: Node, expr: string, dir: string) {
    const watcher = new Watcher(this.vm, expr, () => {
      this.render(node, expr, dir);
    });
    this.render(node, expr, dir);
  }

  render(node: Node, expr: string, dir: string) {
    if (dir === 'text') {
      node.textContent = this.interpolate(this.vm[expr]);
    }
  }

  interpolate(value: any) {
    return typeof value === 'function' ? value.call(this.vm) : value;
  }
}

//
// // 示例数据
// const data = {
//   user: {
//     name: 'John Doe',
//     address: {
//       street: '123 Elm St',
//       city: 'Springfield'
//     }
//   },
//   hobbies: ['reading', 'coding']
// };
//
// const vm = {} as typeof data;
// Object.keys(data).forEach(key => {
//   (vm as any)[key] = data[key as keyof typeof data];
// });
//
// new Observer(data);
//
// // 创建 Watcher 实例
// new Watcher(vm, 'user.name', function (val, oldVal) {
//   console.log('name changed:', oldVal, '=>', val);
// });
// new Watcher(vm, 'hobbies[0]', function (val, oldVal) {
//   console.log('first hobby changed:', oldVal, '=>', val);
// });
//
// // 更新 DOM
// const app = new Compile('#app', vm);
//
// // 改变数据
// vm.user.name = 'Jane Doe';
// vm.hobbies[0] = 'painting';

// 添加对数组方法的支持
const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
methods.forEach(method => {
  const original = Array.prototype[method as keyof Array<any>] as Function;
  Object.defineProperty(Array.prototype, method, {
    value: function(...args: any[]) {
      let result = original.apply(this, args);
      let i = this.length - 1;
      while (i >= 0 && typeof this[i] === 'object') {
        new Observer(this[i]);
        i--;
      }
      // 触发更新
      this.$watchers.forEach((watcher: Watcher) => watcher.update());
      return result;
    }
  });
});

// 添加 $watchers 属性来跟踪数组变化
(Array.prototype as any).$watchers = [] as Watcher[];

// 添加 $addWatcher 方法来注册数组变化的观察者
(Array.prototype as any).$addWatcher = function(watcher: Watcher) {
  if (!this.$watchers.includes(watcher)) {
    this.$watchers.push(watcher);
  }
};
