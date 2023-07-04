import { fromEvent } from 'rxjs';
import { TypeDiv } from '../../../type-dom/type-element/type-html/div/div.abstract';
import { FormEditor } from '../../form-editor';
import { LayoutWrapper } from '../../views/layout/layout';
import { BodyMainContent } from '../../views/layout/body/main-content/main-content';
import { IOptionConfig } from '../controls/web-control.interface';
import { fieldConfig } from '../controls/web-control.const';
import { IWebDocument } from './web-document.interface';
import { WebDocumentContents } from './contents/contents.class';
import { WebDocumentTabs } from './tabs/tabs.class';
import { toJSON } from '../../../type-dom/type-element/type-element.function';
import { IWebPage } from '../page/web-page.interface';
import { IWebDocumentContents } from './contents/contents.interface';

// todo 处理多页面问题
//    修改tab头部名称应该在属性中，或者双击选中时就可修改。
//    是否要新增页面属性？？？
//    多页面时，默认页面不应该清空
//    加载多页面时，要同步到 tab数量属性中。
export class WebDocument extends TypeDiv implements IWebDocument {
  className: 'WebDocument';
  // todo 这样的子元素类型是有问题的。要优化
  //      tabs contents
  //      tabs在设计模式下，在页面中可以增删。
  //      只有一个页面时， tabs隐藏，只显示的contents的唯一页面.
  childNodes: [WebDocumentTabs, WebDocumentContents];

  tabs: WebDocumentTabs;
  contents: WebDocumentContents;
  constructor(public parent: BodyMainContent | LayoutWrapper) {
    super();
    this.className = 'WebDocument';
    this.addAttrName('document-content');
    this.contents = new WebDocumentContents(this); // 要先创建。创建tabs时，会用到。
    this.tabs = new WebDocumentTabs(this);
    this.fieldConfig = fieldConfig; // 设置默认的字段选项。
    this.childNodes = [this.tabs, this.contents];
    this.initEvents();
  }

  get formIds(): string | undefined {
    return this.attrObj['form-ids'] ? (this.attrObj['form-ids'] as string) : undefined;
  }
  get fieldConfig(): IOptionConfig | undefined {
    if (this.attrObj['field-config']) {
      return JSON.parse(this.attrObj['field-config'] as string);
    }
    return undefined;
  }
  set fieldConfig(config: IOptionConfig | undefined) {
    if (config === undefined) {
      this.removeAttribute('field-config');
    }
    this.setAttribute('field-config', JSON.stringify(config));
  }
  createInstance(docLiteral: IWebDocument): void {
    if (docLiteral.propObj) {
      this.setPropObj(docLiteral.propObj);
    }
    // 处理就版中的SelectGroup对象。
    this.processSelectGroup(docLiteral);
    // 特殊处理老数据
    if (this.transformOldJson(docLiteral)) {
      return;
    }
    this.tabs.createInstance(docLiteral.childNodes[0]);
    this.contents.createInstance(docLiteral.childNodes[1]);
    // 加载 tabHeaders 绑定的事件
    this.initEvents();
  }
  // 处理 SelectGroup 类；
  processSelectGroup(json: Record<string, any>): void {
    // 例子数据
    // json = [{
    //   className: 'SelectGroup',
    // }, {
    //   className: 'SelectGroup',
    // }];
    let jsonStr = JSON.stringify(json);
    if (jsonStr.indexOf('SelectGroup') !== -1) {
      jsonStr = jsonStr.replace(/SelectGroup/g, 'Select');
      console.log('jsonStr is ', jsonStr);
      json = JSON.parse(jsonStr);
    }
  }
  // 转换原有数据的方法，在数据的子节点是 WebPage时，触发
  // todo 原来的字段名称选项怎么处理？？？？
  transformOldJson(json: any): boolean {
    // 判断第一个子节点时 WebPage
    const contentsJson = toJSON(this.contents) as IWebDocumentContents;
    if (json.childNodes[0].className !== 'WebDocumentTabs') {
      console.log('json.childNodes[0].className !== WebDocumentTabs');
      this.clearChildNodes();
      this.clearChildDom();
      contentsJson.childNodes = json.childNodes.filter((child: any) => child.className === 'WebPage') as IWebPage[];
      console.log('contentsJson.childNodes is ', contentsJson.childNodes);
      this.contents.createInstance(contentsJson);
      this.tabs.setTabs(contentsJson.childNodes.length);
      // this.tabs.setPropObj({
      //   styleObj: {
      //     display: Display.none, // 默认隐藏
      //     listStyle: 'none',
      //     backgroundColor: '#f0f0f0',
      //     paddingLeft: '5px',
      //   },
      //   attrObj: {
      //     name: 'document-tabs'
      //   }
      // });
      this.childNodes = [this.tabs, this.contents];
      this.render(); // 应该是这里有问题
      this.initEvents();
      return true;
    }
    return false;
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe((e) => {
        // console.log(this.dom, 'this.dom.lastChild.childNodes');
        // console.log(this.tabHeaders.childNodes, 'this.tabHeaders.childNodes');
        // console.log(this.allPages, 'this.allPages');
        // console.log('e target is ', e.target);
        if (e.target === this.dom) { // 选中非控件部位，取消选中控件。
          FormEditor.setSelectedControl(null);
        }
      })
    );
  }
}
