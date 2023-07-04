import { fromEvent } from 'rxjs';
import { Label } from '../../../../../../../../../type-dom/element/html-element/label/label.class';
import { Division } from '../../../../../../../../../type-dom/element/html-element/division/division.class';
import { Button } from '../../../../../../../../../type-dom/element/html-element/button/button.class';
import { TableControl } from '../../../../../../../../core/controls/complex/table/table.class';
import { FormEditor } from '../../../../../../../../form-editor';
import { PropertyItem } from '../../../property-item/property-item.abstract';
import { ControlProperty } from '../../control-property';
// tableHeader 的设置
// 表单尺寸属性
export class TableHeaderProperty extends PropertyItem {
  className: 'TableHeaderProperty';
  childNodes: [Label, Division, Button];
  private division: Division;
  constructor(public parent: ControlProperty) {
    super('表头字段');
    // console.log('control title property constructor . ');
    this.className = 'TableHeaderProperty';
    this.addAttrName('table-header-property');
    // console.log('this.dom is ', this.dom);
    this.division = new Division(this);

    this.childNodes = [this.label, this.division, this.button];
    this.initEvents();
  }

  // todo 只修改选中的表格
  reset(value: string): void {
    if (FormEditor.selectedControl instanceof TableControl) {
      const webTable = FormEditor.selectedControl.formItem.itemContent;
      if (webTable.config?.mode) {
        webTable.config.mode = value as 'editable' | 'disabled' | undefined;
        FormEditor.selectedControl.formItem.addSpan.setStyle('display', webTable.config.mode === 'editable' ? 'block' : 'none');
        webTable.setTable(webTable.config);
        console.log('webTable is ', webTable);
        webTable.render();
      }
    }
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe(() => {
      //
      })
    );
  }
}
