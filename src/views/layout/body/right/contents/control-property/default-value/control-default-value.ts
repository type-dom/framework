import { fromEvent, Observable } from 'rxjs';
import { ThreeDotsSvg } from '../../../../../../../../type-dom/components/svgs/three-dots/three-dots';
import { SingleInputControl } from '../../../../../../../core/controls/basic/single-input/single-input.class';
import { MultilineInputControl } from '../../../../../../../core/controls/basic/multiline-input/multiline-input.class';
import { TextNode } from '../../../../../../../../type-dom/text-node/text-node.class';
import { FormEditor } from '../../../../../../../form-editor';
import { FieldProperty } from '../../field-property/field-property';
import { PropertyInput } from '../../property-item/input/property-input.abstract';
import { ControlProperty } from '../control-property';

// 控件字段属性
export class ControlDefaultValueProperty extends PropertyInput {
  className: 'ControlDefaultValueProperty';
  formulaObservable: Observable<Event>;
  private readonly dotsSvg: ThreeDotsSvg;

  constructor(public parent: ControlProperty | FieldProperty) {
    super('默认值', '请输入默认值');
    this.className = 'ControlDefaultValueProperty';
    this.addAttrName('control-default-value-property');
    this.dotsSvg = new ThreeDotsSvg(this.button);
    this.dotsSvg.resetSize(16, 16);
    this.button.textNode.setText('');
    this.button.addChild(this.dotsSvg);
    this.button.setStyle('display', 'inline-block');
    this.content.setStyleObj({
      borderRadius: '4px 0 0 4px',
      borderRight: 'none',
    });
    this.formulaObservable = fromEvent(this.button.dom, 'click');
    // this.initEvents();
  }
  get formula(): string {
    if (this.parent instanceof ControlProperty) {
      if (!FormEditor.selectedControl) throw Error('没有选中的控件');
      return FormEditor.selectedControl?.attrObj.formula as string;
    } else {
      if (!FormEditor.selectedTableDataCell) throw Error('没有选中的单元格控件');
      return FormEditor.selectedTableDataCell?.attrObj.formula as string;
    }
  }
  set formula(value: string) {
    if (this.parent instanceof ControlProperty) {
      if (!FormEditor.selectedControl) throw Error('没有选中的控件');
      FormEditor.selectedControl.setAttribute('formula', value);
    } else {
      if (!FormEditor.selectedTableDataCell) throw Error('没有选中的单元格控件');
      FormEditor.selectedTableDataCell?.setAttribute('formula', value);
      return;
    }
  }
  // get formulaVisible(): boolean {
  //   return AppRoot.selectedControl?.attrObj['formula-visible'] as boolean;
  // }
  // set formulaVisible(value: boolean) {
  //   AppRoot.selectedControl?.setAttribute('formula-visible', value);
  // }
  // initEvents(): void {
  //   super.initEvents();
  //   // this.events.push(
  //   //   this.formulaObservable.subscribe(() => {
  //   //     console.log('this.button.dom click . ');
  //   //     // this.formulaVisible = true;
  //   //     // console.log('this.formulaVisible is ', this.formulaVisible);
  //   //     // AppRoot.formulaVisibleObservable = fromEvent(this.btn.dom, 'click');
  //   //     console.log('AppRoot.formulaVisibleObservable is ', AppRoot.formulaVisibleObservable);
  //   //     // AppRoot.dialog.setTitle('公式');
  //   //     // if (!this.textarea) {
  //   //     //   this.textarea = new Textarea(AppRoot.dialog.container.body);
  //   //     //   this.textarea.setStyleObj({
  //   //     //     width: '100%',
  //   //     //     minHeight: '80px',
  //   //     //   });
  //   //     // }
  //   //     // // todo 加载之前保存的公式
  //   //     // this.textarea.setValue('');
  //   //     // AppRoot.dialog.container.body.childNodes = [this.textarea];
  //   //     // AppRoot.dialog.container.body.render();
  //   //     // AppRoot.dialog.show();
  //   //   }),
  //   // );
  // }

  reset(value?: string): void {
    console.log('value is ', value);
    if (this.parent instanceof ControlProperty) {
      this.controlPropertyReset(value);
    }
    if (this.parent instanceof FieldProperty) {
      this.fieldPropertyReset(value);
    }
  }
  controlPropertyReset(value?: string): void {
    if (value !== undefined) { // 输入值的操作
      if (FormEditor.selectedControl instanceof SingleInputControl ||
        FormEditor.selectedControl instanceof MultilineInputControl) {
        FormEditor.selectedControl?.resetDefaultValue(value);
      } else {
        console.error('AppRoot.selectedControl is not SingleInputControl or MultilineInputControl . ');
      }
      return;
    }
    // 选中控件
    if (this.styleObj.display === 'none') this.setStyle('display', 'flex');
    if (FormEditor.selectedControl instanceof SingleInputControl ||
      FormEditor.selectedControl instanceof MultilineInputControl) {
      const defaultValue = FormEditor.selectedControl?.defaultValue;
      if (defaultValue) {
        this.resetInputValue(defaultValue);
      } else {
        this.resetInputValue('');
      }
    } else {
      this.hide();
    }
  }
  fieldPropertyReset(value?: string): void {
    if (!FormEditor.selectedTableDataCell) {
      console.error('AppRoot.selectedTableDataCell is null .');
      return;
    }
    if (FormEditor.selectedTableDataCell.control instanceof TextNode) {
      console.error('AppRoot.selectedTableDataCell.control instanceof TextNode');
      return;
    }
    if (value !== undefined) { // 输入值的操作
      if (FormEditor.selectedTableDataCell.control instanceof SingleInputControl ||
        FormEditor.selectedTableDataCell.control instanceof MultilineInputControl) {
        FormEditor.selectedTableDataCell.control.resetDefaultValue(value);
      } else {
        console.error('AppRoot.selectedTableDataCell.control SingleInputControl or MultilineInputControl . ');
      }
      return;
    }
    if (FormEditor.selectedTableDataCell.control instanceof SingleInputControl ||
      FormEditor.selectedTableDataCell.control instanceof MultilineInputControl) {
      // 选中控件
      if (this.styleObj.display === 'none') this.setStyle('display', 'flex');
      const defaultValue = FormEditor.selectedTableDataCell.control.defaultValue;
      if (defaultValue) {
        this.resetInputValue(defaultValue);
      } else {
        this.resetInputValue('');
      }
    } else {
      console.error('AppRoot.selectedTableDataCell.control is not SingleInputControl or MultilineInputControl . ');
      this.hide();
    }
  }
}
