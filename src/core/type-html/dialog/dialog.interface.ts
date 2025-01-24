import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeDialog extends ITypeHtml {
  props: ITypeDialogConfig;
}

export interface ITypeDialogConfig extends ITypeHtmlConfig {
  nodeName?: 'dialog';
}
