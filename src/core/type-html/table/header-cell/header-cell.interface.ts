import type { ITextNode } from '../../../../core/text-node/text-node.interface';
import type { ITypeHtml, ITypeHtmlConfig } from '../../type-html.interface';

export interface ITypeTableHeaderCell extends ITypeHtml {
  props: ITypeTableHeaderCellConfig;
  childNodes: ITextNode[];
}

export interface ITypeTableHeaderCellConfig extends ITypeHtmlConfig {
  nodeName?: 'th';
}
