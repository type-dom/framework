import { TypeDiv } from '../../../../../../../type-dom/type-element/type-html/div/div.abstract';
import { Division } from '../../../../../../../type-dom/element/html-element/division/division.class';
import { TextNode } from '../../../../../../../type-dom/text-node/text-node.class';
import { Display } from '../../../../../../../type-dom/style/style.enum';
import { RightContents } from '../contents';
import { FormEditor } from '../../../../../../form-editor';
// control property
import { ControlFieldProperty } from './field/control-field';
import { ControlTitleProperty } from './title/control-title';
import { ControlPlaceholderProperty } from './placeholder/control-placeholder';
import { ControlDefaultValueProperty } from './default-value/control-default-value';
import { ControlOptionsProperty } from './options/control-options';
import { RequiredProperty } from './reqired/control-reqired';
import { MaxValueProperty } from './max-value/control-max-value';
import { MinValueProperty } from './min-value/control-min-value';
import { MultipleProperty } from './multiple/control-multiple';
import { ControlOnChangeProperty } from './change-event/control-on-change';
import { ControlConnectionProperty } from './connection/control-connection';
import { TableColumnProperty } from './table-column/table-column';
import { ReadonlyProperty } from './readonly/control-readonly';
export class ControlProperty extends TypeDiv {
  className: 'ControlProperty';
  childNodes: [
    ControlFieldProperty,
    ControlTitleProperty,
    ControlPlaceholderProperty,
    ControlDefaultValueProperty,
    ReadonlyProperty,
    ControlOptionsProperty,
    ControlConnectionProperty,
  ];
  readonly controlField: ControlFieldProperty;
  readonly controlTitle: ControlTitleProperty;
  readonly controlPlaceholder: ControlPlaceholderProperty;
  readonly controlDefaultValue: ControlDefaultValueProperty;
  readonly controlReadOnly: ReadonlyProperty;
  readonly controlOptions: ControlOptionsProperty;
  readonly controlRequired: RequiredProperty;
  readonly controlMaxValue: MaxValueProperty;
  readonly controlMinValue: MinValueProperty;
  readonly controlMultiple: MultipleProperty;
  readonly controlOnChange: ControlOnChangeProperty;
  readonly controlConnection: ControlConnectionProperty;
  readonly controlTableColumn: TableColumnProperty;

  constructor(public parent: RightContents) {
    super();
    this.className = 'ControlProperty';
    this.propObj = {
      styleObj: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        display: Display.none,
      },
      attrObj: {
        name: 'control-property'
      },
    };
    this.controlField = new ControlFieldProperty(this);
    this.controlField.hide();
    this.controlTitle = new ControlTitleProperty(this);
    this.controlTitle.hide();
    this.controlPlaceholder = new ControlPlaceholderProperty(this);
    this.controlPlaceholder.hide();
    this.controlDefaultValue = new ControlDefaultValueProperty(this);
    this.controlDefaultValue.hide();
    this.controlOptions = new ControlOptionsProperty(this);
    this.controlOptions.hide();
    this.controlConnection = new ControlConnectionProperty(this);
    this.controlConnection.hide();
    this.controlReadOnly = new ReadonlyProperty(this);
    this.controlReadOnly.hide();

    this.childNodes = [
      this.controlField,
      this.controlTitle,
      this.controlPlaceholder,
      this.controlDefaultValue,
      this.controlReadOnly,
      this.controlOptions,
      this.controlConnection,
    ];
    const labelValidate = new Division(this);
    labelValidate.addChild(new TextNode(labelValidate, '校验'));
    labelValidate.addStyleObj({
      textAlign: 'center',
      padding: '10px 0',
    });
    this.addChild(labelValidate);
    this.controlRequired = new RequiredProperty(this);
    this.controlRequired.hide();
    this.addChild(this.controlRequired);
    this.controlMinValue = new MinValueProperty(this);
    this.controlMinValue.hide();
    this.addChild(this.controlMinValue);
    this.controlMaxValue = new MaxValueProperty(this);
    this.controlMaxValue.hide();
    this.addChild(this.controlMaxValue);
    this.controlMultiple = new MultipleProperty(this);
    this.controlMultiple.hide();
    this.addChild(this.controlMultiple);
    this.controlTableColumn = new TableColumnProperty(this);
    this.controlTableColumn.hide();
    this.addChild(this.controlTableColumn);

    const eventsDiv = new Division(this);
    eventsDiv.addChild(new TextNode(eventsDiv, '监听事件'));
    this.controlOnChange = new ControlOnChangeProperty(this);
    this.controlOnChange.hide();
    this.addChild(this.controlOnChange);
  }
  reset(): void {
    // todo 依据选中的控件设置控件属性显示
    const className = FormEditor.selectedControl?.className;
    console.log('className is ', className);
    // todo 控制项的显示和隐藏，是在这里判断，还是放在reset中更合理？？？
    // switch (className) {
    //   case 'NumericalControl': // 打包后，类名会变化
    //     this.controlField.reset();
    //     this.controlTitle.reset();
    //     this.controlDefaultValue.reset();
    //     this.controlOptions.reset();
    //     this.controlRequired.reset();
    //     this.controlMinValue.reset();
    //     this.controlMaxValue.reset();
    //     this.controlOnChange.reset();
    //     this.controlReadOnly.reset();
    //     break;
    //   case 'SingleInputControl':
    //   case 'MultilineInputControl':
    //     this.controlField.reset();
    //     this.controlTitle.reset();
    //     this.controlPlaceholder.reset();
    //     this.controlDefaultValue.reset();
    //     this.controlRequired.reset();
    //     this.controlOnChange.reset();
    //     this.controlReadOnly.reset();
    //     break;
    //   case 'DateControl':
    //   case 'TimeControl':
    //     this.controlField.reset();
    //     this.controlTitle.reset();
    //     this.controlDefaultValue.reset();
    //     this.controlRequired.reset();
    //     this.controlOnChange.reset();
    //     this.controlReadOnly.reset();
    //     break;
    //   case 'CheckboxControl':
    //   case 'RadioControl':
    //   case 'SelectControl':
    //     this.controlField.reset();
    //     this.controlTitle.reset();
    //     this.controlDefaultValue.hide();
    //     this.controlOptions.reset();
    //     this.controlRequired.hide();
    //     this.controlOnChange.reset();
    //     this.controlReadOnly.reset();
    //     break;
    //   case 'AttachmentControl':
    //     // console.log('todo .... ');
    //     this.controlField.reset();
    //     this.controlTitle.reset();
    //     this.controlDefaultValue.hide();
    //     this.controlRequired.hide();
    //     this.controlMultiple.reset(); // 选择多个文件
    //     this.controlOnChange.reset();
    //     this.controlReadOnly.reset();
    //     break;
    //   case 'ConnectionControl':
    //     this.controlField.reset();
    //     this.controlTitle.reset();
    //     this.controlDefaultValue.hide();
    //     this.controlRequired.hide();
    //     this.controlOnChange.reset();
    //     this.controlConnection.reset();
    //     this.controlReadOnly.reset();
    //     break;
    //   case 'TableControl':
    //     this.controlField.hide();
    //     this.controlDefaultValue.hide();
    //     this.controlMinValue.hide();
    //     this.controlMaxValue.hide();
    //     this.controlPlaceholder.hide();
    //     this.controlOptions.hide();
    //     this.controlMultiple.hide();
    //     this.controlRequired.hide();
    //     this.controlOnChange.hide();
    //     this.controlReadOnly.hide();
    //     this.controlTitle.reset();
    //     this.controlTableColumn.reset();
    //     break;
    //   default:
    //     this.controlField.hide();
    //     this.controlTitle.hide();
    //     this.controlDefaultValue.hide();
    //     this.controlRequired.hide();
    //     this.controlOnChange.hide();
    //     this.controlReadOnly.hide();
    //     break;
    // }
    if (!FormEditor.selectedControl) {
      this.controlField.hide();
      this.controlTitle.hide();
      this.controlPlaceholder.hide();
      this.controlDefaultValue.hide();
      this.controlReadOnly.hide();
      this.controlOptions.hide();
      this.controlRequired.hide();
      this.controlMaxValue.hide();
      this.controlMinValue.hide();
      this.controlMultiple.hide();
      this.controlOnChange.hide();
      this.controlConnection.hide();
      this.controlTableColumn.hide();
      return;
    }
    this.controlField.reset();
    this.controlTitle.reset();
    this.controlPlaceholder.reset();
    this.controlDefaultValue.reset();
    this.controlReadOnly.reset();
    this.controlOptions.reset();
    this.controlRequired.reset();
    this.controlMaxValue.reset();
    this.controlMinValue.reset();
    this.controlMultiple.reset();
    this.controlOnChange.reset();
    this.controlConnection.reset();
    this.controlTableColumn.reset();
  }
}
