// Br,Division,TypeRoot,TextNode等都是框架定义好的类
import { Br, Division, TypeRoot, TextNode, XElement } from 'type-dom.ts';
/**
 * 项目根节点，继承TypeRoot（根节点抽象类）
 * 因为属性和方法要全局调用，所以全部设置为静态 static; 包括get也设置为静态
 * UI组件显示页面
 */
export class AppRoot extends TypeRoot {
  className: 'AppRoot';
  // 构造函数，rootEl是绑定的Dom元素，对应到index.html中的页面元素
  constructor(rootEl: HTMLElement) {
    super(rootEl);
    this.className = 'AppRoot';  // 类名，不是样式类
    this.addAttrObj({ // 设置根节点的属性
      name: 'app-root' // 节点名称
    })
    this.addStyleObj({ // 设置根节点样式
      padding: '30px',
      border: '20px solid #dddddd'
    });
    // createItems 是一个创建子节点的方法
    // 第一个参数是父节点对象，
    // 第二个参数是个数组，包括了要创建的所有子节点的配置属性
    this.createItems(this, [ // 添加子节点
      {
        TypeClass: Division, // 具体类，TypeClass 指定对应的类，要显式的引用，即import进来。
        propObj: {
          attrObj: { // 设置属性参数
            name: 'first-item'
          },
          styleObj: { // 设置样式
            padding: '10px',
            color: '#F00',
            background: '#FF0'
          }
        },
        childNodes: [ // 第一项子节点的子元素
          {
            TypeClass: TextNode, // 文本类
            config: {
              title: ' hello world ! ' // 文本内容
            }
          },
        ]
      },
      {
        TypeClass: Br // 换行
      }
    ]);
    this.createItem<XElement>(this,
      {
        TypeClass: XElement,
        template: `<p name='second-item' style='border: 1px solid #FF0;'> paragraph </p>`
      });
    this.render(); // 渲染
  }
}

