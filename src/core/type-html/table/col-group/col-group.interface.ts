import type { ITypeHtml, ITypeHtmlConfig } from '../../type-html.interface';

export interface ITypeTableColGroup extends ITypeHtml {
  props: ITypeTableColGroupConfig;
}

export interface ITypeTableColGroupConfig extends ITypeHtmlConfig {
  nodeName?: 'colgroup';
}
