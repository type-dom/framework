import { TypeRoot } from '../type-root/type-root.abstract';
import type { IRootNode, IRootNodeConfig } from './root-node.interface';

/**
 * RootNode是一个元素根节点类
 * 作为前端项目的入口文件要继承根节点类，并挂载到对应的 ID 上。
 * el 元素对象或ID；
 * parent 只有自己 TypeRoot
 */
export class RootNode extends TypeRoot implements IRootNode {
  className: 'RootNode';

  protected constructor(config?: Partial<IRootNodeConfig>) {
    super(config);
    this.className = 'RootNode';
  }
}
