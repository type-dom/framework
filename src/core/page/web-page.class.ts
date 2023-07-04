import { fromEvent } from 'rxjs';
import { TypeDiv } from '../../../type-dom/type-element/type-html/div/div.abstract';
import { StylePosition } from '../../../type-dom/style/style.enum';
import { ControlClassMap } from '../../constants';
import { FormEditor } from '../../form-editor';
import { WebDocumentContents } from '../document/contents/contents.class';
import { WebControl } from '../controls/web-control.abstract';
import { IWebPage } from './web-page.interface';
export class WebPage extends TypeDiv implements IWebPage {
  className: 'WebPage';
  childNodes: WebControl[];
  dragStartIndex: number;
  dragDropIndex: number;
  // controlObjMap: Map<number, WebControl> = new Map();
  constructor(public parent: WebDocumentContents) {
    super();
    this.className = 'WebPage';
    // default settings
    this.addStyleObj({
      position: StylePosition.relative,
      // width: 'calc(100vw - 660px)',
      fontFamily: '宋体',
      fontSize: '3.5mm',
      boxShadow: '0px 0px 20px #000',
      boxSizing: 'border-box',
      margin: '5mm',
      // paddingTop:'5px',
      minHeight: '300px',
      maxHeight: 'calc(' + FormEditor.el.clientHeight + 'px - 60px - 10mm)',
      // height: 'calc(' + AppRoot.el.clientHeight + 'px - 60px - 10mm)',
      overflowY: 'auto',
      backgroundColor: '#fff',
      backgroundImage: '',
    });
    // this.addStyle('overflow-y', 'auto'); // jeecg or antd 的兼容问题
    this.addAttrObj({
      landscape: false,
      pageIndex: 1,
      name: 'web-page',
    });
    this.childNodes = [];
    this.dragStartIndex = 0;
    this.dragDropIndex = 0;
    this.initEvents();
  }
  get beforeSubmitStr(): string {
    return this.propObj.attrObj['before-submit'] as string;
  }
  set beforeSubmitStr(value: string) {
    this.setAttribute('before-submit', value);
  }
  get afterSubmitStr(): string {
    return this.propObj.attrObj['after-submit'] as string;
  }
  set afterSubmitStr(value: string) {
    this.setAttribute('after-submit', value);
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe((e) => {
        // console.log('e target is ', e.target);
        if (e.target === this.dom) { // 选中非控件部位，取消选中控件。
          FormEditor.setSelectedControl(null);
        }
      })
    );
  }
  //  todo 实例化对象
  createInstance(pageJson: IWebPage): void {
    if (pageJson.propObj) {
      this.setPropObj(pageJson.propObj);
    }
    // console.log('AppRoot.el.clientHeight is ', AppRoot.el.clientHeight);
    // console.log('this.parent.tabs.dom.clientHeight is ', this.parent.parent.tabs.dom.clientHeight);
    this.setStyleObj({
      maxHeight: 'calc(' + (FormEditor.el.clientHeight - this.parent.parent.tabs.dom.clientHeight) + 'px - 60px - 10mm)',
      overflowY: 'auto',
    });
    this.childNodes = [];
    for (const control of pageJson.childNodes) {
      // const controlObj = new className();
      if (ControlClassMap[control.className]) {
        const controlObj = new ControlClassMap[control.className](this);
        controlObj.createInstance(control);
        this.appendChild(controlObj);
      } else {
        console.error('ControlClassMap is wrong, control.className is ', control.className);
        // throw new Error('ControlClassMap is wrong, control.className is ' + control.className);
      }
    }
  }
}
