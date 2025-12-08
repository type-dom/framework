import { TypeHtml } from '../type-html.abstract';
import { ITypeButton, ButtonProps } from './button.interface';
import { HTMLAttributes } from '../../../../dom';
import { ToMaybeRefs } from '../../../../reactivity';

// 所有继承的具体类，应该统一成一个封装的自定义Button组件。
export abstract class TypeButton<Props extends ButtonProps = ButtonProps, Attrs extends ToMaybeRefs<HTMLAttributes> = ToMaybeRefs<HTMLAttributes>>
  extends TypeHtml<Props, Attrs> implements ITypeButton {
  dom: HTMLButtonElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'button',
    } as Props);
    this.dom = document.createElement('button');

    // this.childNodes = [new TextNode('')]; // 默认值
  }

  setTitle(title: string): void {
    this.textNode?.setText(title);
  }
}
