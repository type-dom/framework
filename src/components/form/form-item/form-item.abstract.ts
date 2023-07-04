import { IStyle } from '../../../../type-dom/style/style.interface';
import { Input } from '../../../../type-dom/element/html-element/input/input.class';
import { Label } from '../../../../type-dom/element/html-element/label/label.class';
import { Textarea } from '../../../../type-dom/element/html-element/textarea/textarea.class';
import { ILabel } from '../../../../type-dom/element/html-element/label/label.interface';
import { Span } from '../../../../type-dom/element/html-element/span/span.class';
import { Select } from '../../../../type-dom/element/html-element/select/select.class';
import { RadioGroup } from '../../../../type-dom/components/radio-group/radio-group.class';
import { CheckboxGroup } from '../../../../type-dom/components/checkbox-group/checkbox-group.class';
import { DeleteSvg } from '../../../../type-dom/components/svgs/delete/delete';
import { TextNode } from '../../../../type-dom/text-node/text-node.class';
import { TypeDiv } from '../../../../type-dom/type-element/type-html/div/div.abstract';
import { FormEditor } from '../../../form-editor';
import { formItemStyle, labelStyle } from '../../../core/controls/web-control.const';
import { IFormItem, ItemContent } from './form-item.interface';
import { Table } from './table-item/table/table.class';

export abstract class FormItem extends TypeDiv implements IFormItem {
  abstract className: string;
  // abstract parent: WebControl;
  abstract childNodes: [Label, ItemContent, Span];
  abstract itemContent: Input | Textarea | Select | RadioGroup | CheckboxGroup | Table;

  label: Label;
  labelText: TextNode;
  labelStyle: Partial<IStyle>;
  deleteSpan: Span;

  protected constructor(labelText = '控件名称') {
    super();
    // console.log('FormItem constructor . ', formItemStyle);
    this.propObj.styleObj = Object.assign({}, formItemStyle);

    this.label = new Label(this);
    this.labelStyle = Object.assign({}, labelStyle);
    this.label.propObj.styleObj = this.labelStyle;
    this.labelText = new TextNode(this.label, labelText);
    this.label.childNodes.push(this.labelText);
    this.deleteSpan = this.createItem(this, {
      TypeClass: Span,
      propObj: {
        styleObj: {
          // position: 'absolute',
          // top: '30px',
          // right: '1px',
          float: 'right',
          backgroundColor: '#fff'
        },
        attrObj: {
          name: 'delete-span',
        }
      },
      childNodes: [
        {
          TypeClass: DeleteSvg,
          propObj: {
            styleObj: {},
            attrObj: {
              name: 'delete-svg',
              width: 20,
              height: 20
            }
          }
        }
      ]
    }) as Span;
    //   new Span(this);
    // this.deleteSpan.setStyleObj({
    //   // position: 'absolute',
    //   // top: '30px',
    //   // right: '1px',
    //   float: 'right',
    //   backgroundColor: '#fff'
    // });
    // const svg = new DeleteSvg(this.deleteSpan);
    // svg.resetSize(20, 20);
    // this.deleteSpan.addChild(svg);
  }

  // 控件在表格中的控件样式
  setStyleInTable(): void {
    this.propObj.styleObj = {};
    this.label.hide();
    this.itemContent.propObj.styleObj.width = '100%';
  }
  //  form-item 实例化的公共部分。
  createInstance(itemLiteral: IFormItem): void {
    // console.log('form item createInstance . ');
    // console.log('itemLiteral is ', itemLiteral);
    // console.log('this.className is 组件', this.className);
    const labelLiteral = itemLiteral.childNodes[0] as ILabel;
    this.label.createInstance(labelLiteral);
    const itemContentLiteral = itemLiteral.childNodes[1];
    this.itemContent.setPropObj(itemContentLiteral.propObj);
    // 实例化 ----> 在子类中实例化 todo 只有 TableItem中重写了 ？？？
    // this.itemContent.createInstance(itemContentLiteral);
    if (FormEditor.mode !== 'design') {
      this.deleteSpan.hide();
    }
  }
  setDisabled(): void {
    this.itemContent.setAttrObj({
      disabled: true,
    });
  }
}
