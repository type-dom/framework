import { fromEvent, Subscription } from 'rxjs';
import { TypeDiv } from '../../../type-dom/type-element/type-html/div/div.abstract';
import { CheckboxOption } from '../../../type-dom/components/checkbox-group/checkbox-option/checkbox-option.class';
import { RadioOption } from '../../../type-dom/components/radio-group/radio-option/radio-option.class';
import { Select } from '../../../type-dom/element/html-element/select/select.class';
import { Label } from '../../../type-dom/element/html-element/label/label.class';
import { Input } from '../../../type-dom/element/html-element/input/input.class';
import { Textarea } from '../../../type-dom/element/html-element/textarea/textarea.class';
import { toJSON } from '../../../type-dom/type-element/type-element.function';
import { ControlClassMap } from '../../constants';
import { FormItem } from '../../components/form/form-item/form-item.abstract';
import { TableDataCell } from '../../components/form/form-item/table-item/table/data-cell/data-cell.class';
import { Table } from '../../components/form/form-item/table-item/table/table.class';
import { TableRow } from '../../components/form/form-item/table-item/table/row/row.class';
import { ItemContent } from '../../components/form/form-item/form-item.interface';
import { IOptionConfig, IWebControl } from './web-control.interface';
import { WebPage } from '../page/web-page.class';
import { controlStyle } from './web-control.const';
import { FormEditor } from '../../form-editor';
export abstract class WebControl extends TypeDiv implements IWebControl {
  abstract className: string;
  // 控件都有这个属性
  abstract formItem: FormItem;
  abstract childNodes: [FormItem];
  static maxCtrlId = 0;
  onChange?: Subscription;
  changeStr?: string;

  protected constructor(public parent: WebPage | TableDataCell) {
    super();
    // console.log('WebControl constructor . ');
    WebControl.maxCtrlId++;
    // todo parent WebPage TableDataCell 分别处理
    if (this.parent instanceof WebPage) {
      // 动态创建的要渲染
      this.addStyleObj(Object.assign({}, controlStyle));
      this.addAttrObj({
        draggable: 'true',
        'ctrl-id': WebControl.maxCtrlId, // ctrlId会变为ctrlid;
      });
    }
    // parent.controlObjMap.set(WebControl.maxCtrlId, this);
    this.defaultValue = '';
  }

  get label(): Label {
    return this.formItem.label;
  }

  get itemContent(): ItemContent {
    return this.formItem.itemContent;
  }

  get fieldName(): string {
    return this.attrObj['field-name'] as string;
  }

  set fieldName(value: string) {
    this.setAttribute('field-name', value);
  }

  get defaultValue(): string {
    return this.attrObj['default-value'] as string;
  }

  set defaultValue(value: string) {
    this.addAttribute('default-value', value);
  }

  // 输入的值
  // todo 选项类型 RadioGroup CheckboxGroup Select
  //    表格 ？？？？
  //    this.attrObj.value ---- itemContent 显示组件一致
  get value(): string {
    const itemClassName = this.formItem.itemContent.className;
    switch (itemClassName) {
      case 'Input':
        if (this.formItem.itemContent.attrObj.type === 'file') { // 附件
          return this.attrObj.value as string;
        }
        return this.formItem.itemContent.dom.value;
      case 'TextArea':
      case 'Select':
        return this.formItem.itemContent.dom.value;
      case 'RadioGroup':
      case 'CheckboxGroup':
        return String(this.formItem.itemContent.value);
      default:
        return this.attrObj.value as string;
    }
  }

  get optionConfig(): IOptionConfig | undefined {
    return this.attrObj['option-config'] ? JSON.parse(this.attrObj['option-config'] as string) : undefined;
  }

  set optionConfig(config: IOptionConfig | undefined) {
    if (config === undefined) {
      this.removeAttribute('option-config');
    }
    // todo add, set是为了看效果
    //    加载时，会把optionConfig渲染出来
    this.setAttribute('option-config', JSON.stringify(config));
  }

  resetLabelText(value: string): void {
    this.formItem.labelText.setText(value);
    this.formItem.labelText.render();
  }

  resetPlaceholder(placeholder: string): void {
    this.formItem.itemContent.setAttribute('placeholder', placeholder);
  }

  resetInputValue(value: string): void {
    if (this.formItem.itemContent instanceof Input || this.formItem.itemContent instanceof Textarea) {
      this.formItem.itemContent.setValue(value);
    }
  }

  resetDefaultValue(value: string): void {
    if (this.formItem.itemContent instanceof Input
      || this.formItem.itemContent instanceof Textarea) {
      this.formItem.itemContent.setValue(value);
    }
    // todo select radio checkbox
    this.defaultValue = value;
  }

  addOnChange(value: string): void {
    console.log('addOnChange . ');
    this.changeStr = value;
    // eslint-disable-next-line no-new-func
    const fun = new Function('return ' + value)();
    console.log('fun is ', fun);
    const eventName = (this.className === 'AttachmentControl') ? 'change' : 'input';
    if (!this.onChange) {
      this.onChange = fromEvent(this.formItem.itemContent.dom, eventName).subscribe(() => {
        // console.log('this.formItem.itemContent.dom  ' + eventName);
        fun(FormEditor.selectedControl, FormEditor.functionMap);
      });
      this.events.push(
        // fromEvent(this.dom, 'click').subscribe(() => {
        //   fun();
        // }),
        this.onChange,
      );
      return;
    }
    this.onChange.unsubscribe();
    this.onChange = fromEvent(this.formItem.itemContent.dom, eventName).subscribe(() => {
      // console.log('this.formItem.itemContent.dom  ' + eventName);
      fun(FormEditor.selectedControl, FormEditor.functionMap);
    });
  }

  removeOnChange(): void {
    this.onChange?.unsubscribe();
  }

  // todo 在WebPage下和TableDataCell下分开处理。
  initEvents(): void {
    this.events.push(
      // 点击控件
      fromEvent(this.dom, 'mousedown').subscribe(() => {
        // console.log('web control mousedown ');
        // console.log('this.index is ', this.index);
        if (this.parent instanceof WebPage) {
          FormEditor.setSelectedControl(this);
        }
        if (this.parent instanceof TableDataCell) {
          FormEditor.setSelectedTableDataCell(this.parent);
        }
      }),
      fromEvent(this.dom, 'dragover').subscribe((evt) => {
        // console.log('web-control dragover . ');
        // console.log('this.index is ', this.index);
        evt.preventDefault();
      }),
      fromEvent(this.dom, 'dragstart').subscribe(() => {
        // console.log('web-control dragstart . ');
        if (FormEditor.mode !== 'design') {
          return;
        }
        if (this.parent instanceof WebPage) {
          this.parent.dragStartIndex = this.index;
          // console.log('this.parent.dragStartIndex is ', this.parent.dragStartIndex);
        }
      }),
      fromEvent(this.dom, 'drop').subscribe(() => {
        // console.log('webControl drop . ');
        if (FormEditor.mode !== 'design') {
          return;
        }
        if (this.parent instanceof WebPage) {
          this.parent.dragDropIndex = this.index;
          // console.log('this.parent.dragDropIndex is ', this.parent.dragDropIndex);
        }
      }),
      fromEvent(this.dom, 'dragend').subscribe(() => {
        // console.log('web control dragend . ');
        // console.log('this.index is ', this.index);
        if (FormEditor.mode !== 'design') {
          return;
        }
        if (this.parent instanceof WebPage) {
          if (this.parent.dragDropIndex !== undefined) {
            // 节点重新排序
            if (this.parent.dragStartIndex > this.parent.dragDropIndex) {
              // 如果当前元素在拖动目标位置的下方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置的地方新增一个和当前元素值一样的元素，
              // 我们再把数组之前的那个拖动的元素删除掉，所以要len+1
              this.parent.childNodes.splice(this.parent.dragDropIndex, 0, this);
              this.parent.childNodes.splice(this.parent.dragStartIndex + 1, 1);
            } else {
              // 如果当前元素在拖动目标位置的上方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置+1的地方新增一个和当前元素值一样的元素，
              // 这时，数组len不变，我们再把数组之前的那个拖动的元素删除掉，下标还是index
              this.parent.childNodes.splice(this.parent.dragDropIndex + 1, 0, this);
              this.parent.childNodes.splice(this.parent.dragStartIndex, 1);
            }
          }
          // console.log('this.parent is ', this.parent);
          this.parent.render();
        }
      }),
      // 删除
      fromEvent(this.formItem.deleteSpan.dom, 'click').subscribe(() => {
        // console.log('this.formItem.deleteDiv.dom click . ');
        this.parent.childNodes.splice(this.index, 1);
        FormEditor.setSelectedControl(null);
        this.parent.render();
      })
    );
  }

  // 控件复制
  clone(): WebControl {
    const literalJson = toJSON(this) as IWebControl;
    // console.log('literalJson is ', literalJson);
    if (this.parent instanceof WebPage) {
      const ctrlObj = new ControlClassMap[this.className](this.parent);
      // console.log('obj is ', obj);
      ctrlObj.createInstance(literalJson);
      return ctrlObj;
    } else {
      throw Error('不在页面中');
    }
  }

  createInstance(controlLiteral: IWebControl): void {
    // console.log('control createInstance . ');
    // console.log('controlLiteral is 映射的值', controlLiteral);
    if (controlLiteral.propObj) {
      this.setPropObj(controlLiteral.propObj);
    }
    // 子节点实例化
    this.formItem.createInstance(controlLiteral.childNodes[0]);
  }

  /**
   * 设置控件的值，就是添加value属性，并赋值
   * 要处理的是 formItem.itemContent
   * @param value
   */
  setValue(value: string | number | boolean): void {
    // console.error('control setValue . ');
    this.attrObj.value = value;
    // const classType = typeof this.formItem.itemContent;
    // console.error('classType is ', classType);
    const itemClassName = this.formItem.itemContent.className;
    switch (itemClassName) {
      // AttachmentControl SingleInputControl NumericalControl DateControl TimeControl TextControl
      case 'Input': // 日期等格式要特殊处理。
      case 'TextArea':
      case 'RadioGroup': // RadioControl
      case 'CheckboxGroup': // CheckboxControl
        this.formItem.itemContent.setValue(value);
        break;
      case 'Select': // SelectControl
        if (this.formItem.itemContent instanceof Select) {
          // console.log('this.formItem.itemContent instanceof Select . ', this.formItem.itemContent);
          // this.formItem.itemContent.setValue(value);
          if (this.optionConfig) {
            const selectedOption = this.optionConfig.options.find(opt => String(opt.value) === String(this.optionConfig?.resultValue));
            // console.error('selectedOption is ', selectedOption);
            if (!selectedOption?.options) {
              throw Error('选项有问题');
            }
            this.formItem.itemContent.setOptions(selectedOption.options, value);
          } else {
            console.error('select control 没有获取的 config . ');
            throw Error('select control 没有获取的 config . ');
          }
        } else {
          console.error('该控件的 formItem.itemContent不是 select element . ');
          throw Error('该控件的 formItem.itemContent不是 select element . ');
        }

        // console.error('parent is WebPage');
        if (this.parent instanceof WebPage) {
          // console.error('parent is WebPage');
          this.formItem.itemContent.render(); // 要单独渲染
        } // 表格中，在外面td还会渲染一遍。
        break;
      case 'Table': // TableControl控件另外处理
        break;
      default:
        console.error('没有控件类型 。 ');
        break;
    }
  }

  setDisabled(): void {
    switch (this.className) {
      case 'AttachmentControl':
      case 'ConnectionControl':
      case 'SingleInputControl':
      case 'MultilineInputControl':
      case 'DateControl':
      case 'DateTimeControl':
      case 'TimeControl':
      case 'TextControl':
      case 'NumericalControl':
      case 'SelectControl':
        this.formItem.setDisabled();
        break;
      case 'RadioControl':
      case 'CheckboxControl':
        this.formItem.itemContent.setAttribute('disabled', true);
        this.formItem.itemContent.childNodes.forEach(child => {
          if (child instanceof CheckboxOption || child instanceof RadioOption) {
            child.input.setAttrObj({
              disabled: true,
            });
          }
        });
        break;
      case 'TableControl':
        if (this.formItem.itemContent instanceof Table) {
          this.formItem.itemContent.childNodes.forEach((tr, index) => {
            if (index > 0) {
              if (tr instanceof TableRow) {
                tr.childNodes.forEach(td => {
                  if (td.control instanceof WebControl) {
                    td.control.setDisabled();
                  }
                });
              }
            }
          });
        }
        break;
      default:
        break;
    }
  }
  removeDisabled(): void {
    switch (this.className) {
      case 'SingleInputControl':
      case 'MultilineInputControl':
      case 'DateControl':
      case 'TimeControl':
      case 'TextControl':
      case 'NumericalControl':
        this.formItem.itemContent.removeAttribute('disabled');
        break;
      case 'RadioControl':
      case 'CheckboxControl':
        this.formItem.itemContent.removeAttribute('disabled');
        this.formItem.itemContent.childNodes.forEach(child => {
          if (child instanceof CheckboxOption || child instanceof RadioOption) {
            child.input.removeAttribute('disabled');
          }
        });
        break;
      case 'SelectControl':
        this.formItem.itemContent.removeAttribute('disabled');
        break;
      case 'TableControl':
        if (this.formItem.itemContent instanceof Table) {
          this.formItem.itemContent.childNodes.forEach((tr, index) => {
            if (index > 0) {
              if (tr instanceof TableRow) {
                tr.childNodes.forEach(td => {
                  if (td.control instanceof WebControl) {
                    td.control.removeDisabled();
                  }
                });
              }
            }
          });
        }
        break;
      default:
        break;
    }
  }
}
