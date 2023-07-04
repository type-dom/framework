import { TypeDiv } from '../../../../../../../type-dom/type-element/type-html/div/div.abstract';
import { RightContents } from '../contents';
import { FormSizeProperty } from './form-size/form-size';
import { LabelWidthProperty } from './label-width/label-width';
import { LabelAlignProperty } from './label-align/label-align';
import { FormColumnProperty } from './form-column/form-column';
import { FormLoadedProperty } from './form-loaded/form-loaded';
import { BeforeSubmitProperty } from './before-submit/before-submit';
import { AfterSubmitProperty } from './after-submit/after-submit';
import { TabCountProperty } from './tab-count/tab-count';

export class FormProperty extends TypeDiv {
  className: 'FormProperty';
  childNodes: [
    FormSizeProperty,
    LabelAlignProperty,
    LabelWidthProperty,
    TabCountProperty,
    FormColumnProperty,
    FormLoadedProperty,
    BeforeSubmitProperty,
    AfterSubmitProperty
  ];

  formSize: FormSizeProperty;

  tabCount: TabCountProperty;
  labelAlign: LabelAlignProperty;
  formColumn: FormColumnProperty;
  formLoaded: FormLoadedProperty;
  beforeSubmit: BeforeSubmitProperty;
  afterSubmit: AfterSubmitProperty;
  labelWidth: LabelWidthProperty;
  constructor(public parent: RightContents) {
    super();
    this.className = 'FormProperty';
    this.propObj = {
      styleObj: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
      },
      attrObj: {
        name: 'form-property'
      },
    };

    this.formSize = new FormSizeProperty(this);
    this.formSize.hide(); // 暂时没有配
    this.labelAlign = new LabelAlignProperty(this);
    this.labelWidth = new LabelWidthProperty(this);
    this.formColumn = new FormColumnProperty(this);
    this.formLoaded = new FormLoadedProperty(this);
    this.beforeSubmit = new BeforeSubmitProperty(this);
    this.afterSubmit = new AfterSubmitProperty(this);
    this.tabCount = new TabCountProperty(this);
    this.childNodes = [
      this.formSize,
      this.labelAlign,
      this.labelWidth,
      this.tabCount,
      this.formColumn,
      this.formLoaded,
      this.beforeSubmit,
      this.afterSubmit
    ];
  }
  reset(): void {
    // console.error('form property reset . ');
    // this.formSize.reset(); // todo
    this.labelAlign.reset();
    this.labelWidth.reset();
    this.tabCount.reset();
    this.formColumn.reset();
    this.formLoaded.reset();
    this.beforeSubmit.reset();
    this.afterSubmit.reset();
  }
}
