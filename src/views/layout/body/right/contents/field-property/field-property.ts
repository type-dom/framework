import { Display } from '../../../../../../../type-dom/style/style.enum';
import { TypeDiv } from '../../../../../../../type-dom/type-element/type-html/div/div.abstract';
import { ReadonlyProperty } from '../control-property/readonly/control-readonly';
import { MinValueProperty } from '../control-property/min-value/control-min-value';
import { MaxValueProperty } from '../control-property/max-value/control-max-value';
import { ControlPlaceholderProperty } from '../control-property/placeholder/control-placeholder';
import { ControlConnectionProperty } from '../control-property/connection/control-connection';
import { ControlOptionsProperty } from '../control-property/options/control-options';
import { ControlTitleProperty } from '../control-property/title/control-title';
import { RightContents } from '../contents';
import { ControlFieldProperty } from '../control-property/field/control-field';
import { ControlDefaultValueProperty } from '../control-property/default-value/control-default-value';
import { ControlOnChangeProperty } from '../control-property/change-event/control-on-change';
import { MultipleProperty } from '../control-property/multiple/control-multiple';

// 字段属性内容栏
export class FieldProperty extends TypeDiv {
  className: 'FieldProperty';
  childNodes: [
    ControlFieldProperty,
    ControlTitleProperty,
    ControlPlaceholderProperty,
    ReadonlyProperty,
    ControlConnectionProperty,
    MinValueProperty,
    MaxValueProperty,
    ControlDefaultValueProperty,
    MultipleProperty,
    ControlOptionsProperty,
    ControlOnChangeProperty,
  ];
  fieldName: ControlFieldProperty;
  fieldLabel: ControlTitleProperty;
  fieldOptions: ControlOptionsProperty;
  fieldConnection: ControlConnectionProperty;
  fieldPlaceholder: ControlPlaceholderProperty;
  fieldDefaultValue: ControlDefaultValueProperty;
  fieldReadonly: ReadonlyProperty;
  fieldMin: MinValueProperty;
  fieldMax: MaxValueProperty;
  fieldMultiple: MultipleProperty;
  fieldOnChange: ControlOnChangeProperty;
  constructor(public parent: RightContents) {
    super();
    this.className = 'FieldProperty';
    this.propObj = {
      styleObj: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        display: Display.none,
      },
      attrObj: {
        name: 'field-property'
      },
    };
    this.fieldName = new ControlFieldProperty(this);
    this.fieldLabel = new ControlTitleProperty(this);
    this.fieldOptions = new ControlOptionsProperty(this);
    this.fieldConnection = new ControlConnectionProperty(this);
    // 控件属性控制项
    this.fieldDefaultValue = new ControlDefaultValueProperty(this);
    this.fieldReadonly = new ReadonlyProperty(this);
    this.fieldPlaceholder = new ControlPlaceholderProperty(this);
    this.fieldMin = new MinValueProperty(this);
    this.fieldMax = new MaxValueProperty(this);
    this.fieldMultiple = new MultipleProperty(this);
    this.fieldOnChange = new ControlOnChangeProperty(this);
    this.childNodes = [
      this.fieldName,
      this.fieldLabel,
      this.fieldPlaceholder,
      this.fieldReadonly,
      this.fieldConnection,
      this.fieldMin,
      this.fieldMax,
      this.fieldDefaultValue,
      this.fieldMultiple,
      this.fieldOptions,
      this.fieldOnChange,
    ];
  }

  reset(): void {
    console.log('field property reset . ');
    this.fieldName.reset();
    this.fieldLabel.reset();
    this.fieldConnection.reset();
    this.fieldOptions.reset();
    // 控件属性
    this.fieldPlaceholder.reset();
    this.fieldDefaultValue.reset();
    this.fieldReadonly.reset();
    this.fieldMin.reset();
    this.fieldMax.reset();
    this.fieldMultiple.reset();
    this.fieldOnChange.reset();
  }
}
