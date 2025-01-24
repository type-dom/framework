import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeOptGroup extends ITypeHtml {
  props: ITypeOptGroupConfig;
}

export interface ITypeOptGroupConfig extends ITypeHtmlConfig {
  nodeName: 'optgroup';
}
