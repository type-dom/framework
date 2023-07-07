import { TypeRoot } from './type-root/type-root.abstract';
import { TextNode } from './text-node/text-node.class';
import { Br, Division } from './element';
/**
 * 应用根节点，必须存在。
 * 应用继承 TypeRoot;
 * 因为属性和方法要全局调用，所以全部设置为静态 static; 包括get也设置为静态
 * UI组件显示页面
 */
export class AppRoot extends TypeRoot {
  className: 'UIView';
  constructor(editorEl: HTMLElement) {
    super(editorEl);
    console.log('UIView constructor . ');
    this.className = 'UIView';
    this.addStyleObj({
      padding: '30px',
      border: '20px solid #dddddd'
    });
    this.createItems(this, [
      {
        TypeClass: Division,
        childNodes: [
          {
            TypeClass: TextNode,
            config: {
              title: ' hello world ! '
            }
          },
        ]
      },
      {
        TypeClass: Br
      }
    ]);
    this.render();
  }
}
