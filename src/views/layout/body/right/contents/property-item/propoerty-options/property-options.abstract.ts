import { fromEvent, Observable } from 'rxjs';
import { Label } from '../../../../../../../../type-dom/element/html-element/label/label.class';
import { Division } from '../../../../../../../../type-dom/element/html-element/division/division.class';
import { Select } from '../../../../../../../../type-dom/element/html-element/select/select.class';
import { Button } from '../../../../../../../../type-dom/element/html-element/button/button.class';
import { Display } from '../../../../../../../../type-dom/style/style.enum';
import { TextNode } from '../../../../../../../../type-dom/text-node/text-node.class';
import { WebControl } from '../../../../../../../core/controls/web-control.abstract';
import { itemContentStyle } from '../../../../../../../core/controls/web-control.const';
import { IOption, IOptionConfig } from '../../../../../../../core/controls/web-control.interface';
import { RadioControl } from '../../../../../../../core/controls/basic/radio/radio.class';
import { CheckboxControl } from '../../../../../../../core/controls/basic/checkbox/checkbox.class';
import { SelectControl } from '../../../../../../../core/controls/basic/select/select.class';
import { ThreeDotsSvg } from '../../../../../../../../type-dom/components/svgs/three-dots/three-dots';
import { FormEditor } from '../../../../../../../form-editor';
import { PropertyItem } from '../property-item.abstract';

export abstract class PropertyOptions extends PropertyItem {
  childNodes: [Label, Division, Button];
  selectConfigDiv: Division;
  private readonly firstDiv: Division;
  // private readonly addDiv: Division;
  selectDiv: Division;
  private readonly selectObj: Select;
  optionsContent: Division;
  protected btn: Button;
  private readonly dotsSvg: ThreeDotsSvg;
  optionsConfigObservable: Observable<Event>;

  protected constructor(labelText = '选项列表') {
    super(labelText);
    this.addAttrName('option-property');
    this.selectConfigDiv = new Division(this);
    this.selectConfigDiv.addAttrName('select-config');
    this.selectConfigDiv.addStyleObj({
      height: '100%',
      lineHeight: '32px',
      textAlign: 'center',
      backgroundColor: '#FFF',
      backgroundImage: 'none',
      borderRadius: '4px',
      // border: '1px solid #DCDFE6',
      // -webkit-box-sizing: border-box;
      boxSizing: 'border-box',
      color: '#606266',
      display: Display.inlineBlock,
      outline: '0',
      // -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: 'border-color .2s cubic-bezier(.645,.045,.355,1)',
      width: 'calc(100% - 100px)',
    });
    this.selectDiv = new Division(this.selectConfigDiv);
    this.selectDiv.addStyleObj({
      display: 'flex',
      flexDirection: 'row',
    });
    // 单独的方法实现
    this.selectObj = new Select(this.selectDiv);
    this.selectObj.addAttrName('select');
    this.selectObj.addStyleObj(Object.assign({}, itemContentStyle,
      {
        width: '100%',
        borderRadius: '4px 0 0 4px',
        borderRight: 'none',
      }));

    this.btn = new Button(this.selectDiv);
    this.btn.addStyleObj({
      // position: 'absolute',
      // right: '10px',
      padding: '8px 3px 4px',
      fontSize: '16px',
      border: '1px solid #DCDFE6',
      borderRadius: '0 4px 4px 0',
    });
    this.dotsSvg = new ThreeDotsSvg(this.btn);
    this.dotsSvg.resetSize(16, 16);
    this.btn.textNode.setText('');
    this.btn.addChild(this.dotsSvg);
    this.selectDiv.childNodes = [this.selectObj, this.btn];
    this.firstDiv = new Division(this.selectConfigDiv);
    const labelDiv = new Division(this.firstDiv);
    labelDiv.addStyleObj({
      display: 'inline-block',
      width: '50%',
    });
    labelDiv.addChild(new TextNode(labelDiv, '标签'));
    const valueDiv = new Division(this.firstDiv);
    valueDiv.addStyleObj({
      display: 'inline-block',
      width: '50%',
    });
    valueDiv.addChild(new TextNode(valueDiv, '值'));
    this.firstDiv.childNodes = [labelDiv, valueDiv];
    this.optionsContent = new Division(this.selectConfigDiv);
    this.selectConfigDiv.childNodes = [this.selectDiv, this.firstDiv, this.optionsContent];

    this.button.addStyleObj({
      position: 'absolute',
      right: '10px',
      padding: '8px 3px 4px',
      fontSize: '16px',
      // border: 'none',
      display: 'none',
      border: '1px solid #DCDFE6',
      borderRadius: '0 4px 4px 0',
    });
    this.childNodes = [this.label, this.selectConfigDiv, this.button];
    // 创建添加按钮
    // this.addDiv = new Division(this.selectConfigDiv);
    // this.addDiv.setStyleObj({
    //   textAlign: 'center',
    //   marginTop: '-10px',
    //   display: 'none', // 现在不需要动态添加选项。
    // });
    // const svg = new AddSvg(this.addDiv);
    // svg.addAttribute('width', '24px');
    // this.addDiv.addChild(svg);
    this.optionsConfigObservable = fromEvent(this.btn.dom, 'click');
    this.initEvents();
  }
  get optionConfig(): IOptionConfig | undefined {
    if (FormEditor.selectedTableDataCell?.control instanceof WebControl) {
      return FormEditor.selectedTableDataCell?.control.optionConfig;
    }
    return FormEditor.selectedControl?.optionConfig;
  }
  set optionConfig(optConfig: IOptionConfig | undefined) {
    if (FormEditor.selectedTableDataCell?.control instanceof WebControl) {
      FormEditor.selectedTableDataCell.control.optionConfig = optConfig;
      return;
    }
    if (!FormEditor.selectedControl?.optionConfig) {
      throw Error('没有选中的控件, optionConfig');
    }
    FormEditor.selectedControl.optionConfig = optConfig;
  }
  resetOptionConfigResultValue(value: string | number | boolean): void {
    // AppRoot.selectedControl?.propObj.attrObj.optionConfig''
    // this.optionConfig = Object.assign(this.optionConfig, { resultValue: value });
    if (this.optionConfig) this.optionConfig.resultValue = value;
  }
  // vue项目中返回的是选中的项目。只有一层，没有两层。
  resetConfig(optionConfig: IOptionConfig): void {
    console.log('optionConfig is ', optionConfig);
    // this.selectConfigDiv.clearChildNodes();
    // this.selectConfigDiv.clearChildDom();
    // this.selectConfigDiv.appendChild(this.selectObj).appendChild(this.firstDiv);
    this.selectObj.resetOptions(optionConfig.options, optionConfig.resultValue);
    // todo 监听事件
    this.optionConfig = optionConfig;
    this.optionsContent.clearChildNodes();
    this.optionsContent.clearChildDom();
    const styleObj = {
      display: 'inline-block',
      width: '45%',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
    };
    // let optIndex = 0;
    // config.options设置
    const selectedOption = optionConfig.options.find(opt => String(opt.value) === String(optionConfig.resultValue).split('.')[0]);
    if (!selectedOption?.options) {
      throw Error('选项有问题');
    }
    selectedOption.options.forEach((opt, optIndex) => {
      const optDiv = new Division(this.optionsContent);
      const labelDiv = new Division(optDiv);
      labelDiv.addStyleObj(styleObj);
      labelDiv.setAttrObj({
        // contenteditable: 'true', // 现在选项不需要编辑
        optIndex,
        optType: 'label',
      });
      labelDiv.addChild(new TextNode(labelDiv, opt.label));
      const valueDiv = new Division(optDiv);
      valueDiv.addStyleObj(styleObj);
      valueDiv.addAttrObj({
        // contenteditable: 'true', // 现在选项不需要编辑
        optIndex,
        optType: 'value',
      });
      valueDiv.addChild(new TextNode(valueDiv, String(opt.value)));

      // const deleteDiv = new Division(optDiv);
      // deleteDiv.setStyleObj({
      //   display: 'none',
      //   // display: 'inline-block', // 现在不需要动态删除选项
      //   width: '10%',
      //   border: '1px solid #ccc',
      //   boxSizing: 'border-box',
      //   // float: 'right',
      //   // marginTop: '10px',
      // });
      // const svg = new DeleteSvg(deleteDiv);
      // svg.setStyleObj({
      //   width: '20',
      // });
      // deleteDiv.appendChild(svg);
      optDiv.childNodes = [labelDiv, valueDiv];
      this.optionsContent.appendChild(optDiv);
    });
  }
  resetOptions(options: IOption[]): void {
    // this.selectConfigDiv.clearChildNodes();
    // this.selectConfigDiv.clearChildDom();
    // this.selectConfigDiv.appendChild(this.selectObj).appendChild(this.firstDiv);
    this.optionsContent.clearChildNodes();
    this.optionsContent.clearChildDom();
    const styleObj = {
      display: 'inline-block',
      width: '45%',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
    };
    // let optIndex = 0;
    // config.options设置
    options.forEach((opt, optIndex) => {
      const optDiv = new Division(this.optionsContent);
      optDiv.setAttrName('option');
      const labelDiv = new Division(optDiv);
      labelDiv.addStyleObj(styleObj);
      labelDiv.setAttrObj({
        // contenteditable: 'true', // 现在选项不需要编辑
        optIndex,
        optType: 'label',
      });
      labelDiv.addChild(new TextNode(labelDiv, opt.label));
      const valueDiv = new Division(optDiv);
      valueDiv.addStyleObj(styleObj);
      valueDiv.addAttrObj({
        optIndex,
        optType: 'value',
      });
      valueDiv.addChild(new TextNode(valueDiv, String(opt.value)));
      optDiv.childNodes = [labelDiv, valueDiv];
      this.optionsContent.appendChild(optDiv);
    });
  }

  // 重置控件
  resetControl(): void {
    // 选中的是单元格中的控件
    if (FormEditor.selectedTableDataCell?.control instanceof RadioControl
      || FormEditor.selectedTableDataCell?.control instanceof CheckboxControl
      || FormEditor.selectedTableDataCell?.control instanceof SelectControl
    ) {
      if (FormEditor.selectedTableDataCell?.control.optionConfig) {
        // todo config 要配resultValue
        FormEditor.selectedTableDataCell?.control?.setOptionConfig(FormEditor.selectedTableDataCell?.control.optionConfig);
        FormEditor.selectedTableDataCell?.control?.formItem.itemContent.render();
      } else {
        console.error('AppRoot.selectedTableDataCell?.control.optionConfig is undefined . ');
      }
      return;
    }
    if (FormEditor.selectedControl instanceof RadioControl
      || FormEditor.selectedControl instanceof CheckboxControl
      || FormEditor.selectedControl instanceof SelectControl
    ) {
      //  选项属性刷新后，还要刷新控件。
      const type = (FormEditor.selectedControl instanceof RadioControl) ? 'radio'
        : (FormEditor.selectedControl instanceof CheckboxControl) ? 'checkbox' : 'select';
      console.log('type is ', type);
      if (FormEditor.selectedControl.optionConfig) {
        console.log('AppRoot.selectedControl.optionConfig is ', FormEditor.selectedControl.optionConfig);
        FormEditor.selectedControl?.setOptionConfig(FormEditor.selectedControl.optionConfig);
        FormEditor.selectedControl?.formItem.itemContent.render();
      } else {
        console.error('AppRoot.selectedControl.optionConfig is undefined . ');
      }
    }
  }
  initEvents(): void {
    this.events.push(
      this.optionsConfigObservable.subscribe(() => {
        console.log('this.btn click . ');
        console.log('this.optionsConfigObservable is ', this.optionsConfigObservable);
      }),
      // todo 没有改变值 ？？？？？ 是否要加click监听
      fromEvent(this.selectObj.dom, 'change').subscribe(() => {
        console.log('this.selectObj.dom change . ');
        console.log('this.selectObj.dom.value is ', this.selectObj.dom.value);
        const selectedOption = this.optionConfig?.options?.find(opt => String(opt.value) === this.selectObj.dom.value);
        if (!this.optionConfig) {
          throw Error('无法获取optionConfig');
        }
        if (selectedOption && selectedOption.options) {
          this.resetOptionConfigResultValue(selectedOption.value);
          console.log('this.optionConfig is ', this.optionConfig);
          console.log('selectOption is ', selectedOption);
          this.resetOptions(selectedOption.options);
          this.resetControl();
        }
      })
    );
  }
}
