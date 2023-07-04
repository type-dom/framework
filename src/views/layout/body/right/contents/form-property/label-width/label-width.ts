import { fromEvent } from 'rxjs';
import { FormEditor } from '../../../../../../../form-editor';
import { TableControl } from '../../../../../../../core/controls/complex/table/table.class';
import { labelStyle } from '../../../../../../../core/controls/web-control.const';
import { PropertyInput } from '../../property-item/input/property-input.abstract';
import { FormProperty } from '../form-property';

// 控件标签宽度
export class LabelWidthProperty extends PropertyInput {
  className: 'LabelWidthProperty';

  constructor(public parent: FormProperty) {
    super('标签宽度', '请输入标签宽度');
    // console.log('control title property constructor . ');
    this.className = 'LabelWidthProperty';
    this.addAttrName('title-width-property');
    this.content.addAttribute('type', 'number');
    // console.log('this.dom is ', this.dom);

    this.initEvent();
  }

  reset(value?: string): void {
    if (value !== undefined) {
      // 这里改变的是全局的样式，不是某个控件的标签宽度
      labelStyle.width = value + 'px';
      FormEditor.allControls.forEach(control => {
        if (control instanceof TableControl) {
          return;
        }
        // control.formItem.labelStyle.width = value + 'px'; // 改变新建控件的宽度。
        control.label?.setStyle('width', value + 'px');
        control.itemContent?.setStyle('width', 'calc(100% - ' + value + 'px)');
        control.render();
      });
      return;
    }
    // 获取标签宽度
    const width = labelStyle.width;
    if (width) {
      this.resetInputValue(parseInt(width, 10));
    } else {
      this.resetInputValue(100);
    }
  }
  initEvent(): LabelWidthProperty {
    this.events.push(
      fromEvent(this.content.dom, 'change').subscribe(() => {
        console.log('this.input.dom.value is ', this.content.dom.value);
        this.reset(this.content.dom.value);
      }),
    );
    return this;
  }
}
