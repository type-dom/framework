import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeSlot extends ITypeHtml {
  props: ITypeSlotConfig;
}

export interface ITypeSlotConfig extends ITypeHtmlConfig {
  nodeName?: 'slot';
}
