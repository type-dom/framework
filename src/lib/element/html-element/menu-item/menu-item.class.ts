import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeMenuItem } from '../../../type-element/type-html/menu-item/menu-item.abstract';
import type { IMenuItem } from './menu-item.interface';

/**
 * HTML5.2: 不再推荐使用该特性。虽然一些浏览器仍然支持它，
 * 但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。
 * 请尽量不要使用该特性，并更新现有的代码；参见本页面底部的兼容性表格以指导你作出决定。
 * 请注意，该特性随时可能无法正常工作。
 */
export class MenuItem extends TypeMenuItem implements IMenuItem {
  className: 'MenuItem';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'MenuItem';
    this.setConfig(config);
  }
}
