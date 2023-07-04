import { fromEvent } from 'rxjs';
import { TextNode } from '../../../../../../../type-dom/text-node/text-node.class';
import {
  TypeTableDataCell
} from '../../../../../../../type-dom/type-element/type-html/table/data-cell/data-cell.class';
import { Input } from '../../../../../../../type-dom/element/html-element/input/input.class';
import { Textarea } from '../../../../../../../type-dom/element/html-element/textarea/textarea.class';
import { Select } from '../../../../../../../type-dom/element/html-element/select/select.class';
import { RadioGroup } from '../../../../../../../type-dom/components/radio-group/radio-group.class';
import { CheckboxGroup } from '../../../../../../../type-dom/components/checkbox-group/checkbox-group.class';
import { ITextNode } from '../../../../../../../type-dom/text-node/text-node.interface';
import { WebControl } from '../../../../../../core/controls/web-control.abstract';
import { SingleInputControl } from '../../../../../../core/controls/basic/single-input/single-input.class';
import { TableControl } from '../../../../../../core/controls/complex/table/table.class';
import { ControlClass, IWebControl } from '../../../../../../core/controls/web-control.interface';
import { ControlClassMap } from '../../../../../../constants';
import { FormEditor } from '../../../../../../form-editor';
import { TableRow } from '../row/row.class';
import { ITableDataCell } from './data-cell.interface';

export class TableDataCell extends TypeTableDataCell implements ITableDataCell {
  className: 'TableDataCell';
  childNodes: [WebControl | TextNode]; // 有可能是Input
  control: WebControl | TextNode;
  constructor(public parent: TableRow, value: string | number | boolean) {
    super();
    this.nodeName = 'td';
    this.dom = document.createElement(this.nodeName);
    this.className = 'TableDataCell';
    // this.propObj.attrObj.border = '1px solid black;';
    // this.childNodes = [];
    // todo 要区分是输入框，还是绑定值。
    //  如何判断是输入框还是文本。
    const mode = parent.parent.config?.mode;
    if (mode === 'editable') {
      // const textNode = new TextNode(this, String(td));
      // 默认生成 SingleInputControl
      this.control = new SingleInputControl(this);
      this.control.formItem.setStyleInTable(); // 在单元格中创建控件时，重置FormItem样式
      this.control.formItem.deleteSpan.hide();
      // input.propObj.styleObj = Object.assign({}, inputStyle, { width: '100%' });
      // input.setValue(value);
    } else {
      this.control = new TextNode(this, String(value));
    }
    this.childNodes = [this.control];
    this.initEvents();
  }

  get value(): string | number | boolean {
    if (this.control instanceof WebControl) {
      return (this.control.formItem.itemContent as (Input | Textarea | Select | RadioGroup | CheckboxGroup)).value as string;
    } else {
      return this.control.nodeValue;
    }
  }
  // 注意： 这里没有对单元格重新渲染
  setControl(ControlClass: Exclude<ControlClass, typeof TableControl>, ctrlLiterL?: IWebControl): void {
    this.control = new ControlClass(this);
    this.control.formItem.setStyleInTable(); // 配置单元格的控件类型时，重置FormItem样式
    if (ctrlLiterL) {
      // 单元格中控件初始化
      // todo 如果是单选框，要重置 name 才行。
      //  否则在填表时新增行后，不同行的同列的单选控件会相互干扰
      if (ctrlLiterL.className === 'RadioControl') {
        const configStr = ctrlLiterL.propObj.attrObj['option-config'];
        if (configStr) {
          const config = JSON.parse(configStr as string);
          config.name = '单选' + Math.random();
          ctrlLiterL.propObj.attrObj['option-config'] = JSON.stringify(config);
        }
      }
      this.control.createInstance(ctrlLiterL);
    }
    this.control.formItem.deleteSpan.hide();
    this.childNodes = [this.control];
    // this.render();
  }

  createInstance(tdLiteral: ITableDataCell): void {
    this.setPropObj(tdLiteral.propObj);
    const controlLiteral = tdLiteral.childNodes[0];
    if (controlLiteral.className === 'TextNode') {
      if (this.control instanceof TextNode) {
        this.control.setText((controlLiteral as ITextNode).nodeValue);
      } else {
        console.error('单元格的字面量和控件不一致');
        this.control = new TextNode(this, (controlLiteral as ITextNode).nodeValue);
        this.childNodes = [this.control];
        this.control.render();
      }
    } else {
      if (this.control instanceof WebControl) {
        const className = controlLiteral.className;
        // 默认是 SingleInputControl
        const ClassControl = ControlClassMap[className] as Exclude<ControlClass, typeof TableControl>;
        this.setControl(ClassControl, controlLiteral as IWebControl);
      }
    }
  }

  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'mousedown').subscribe((e) => {
        console.log('table data cell mousedown ');
        // 阻止冒泡 ？？？ TODO 为什么要阻止冒泡 ----> 点击表格控件其它区域时要取消选中单元格。
        // e.stopPropagation();
        // 单元格选中状态。
        FormEditor.setSelectedTableDataCell(this);
      }),
    );
  }
}
