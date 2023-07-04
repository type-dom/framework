import { fromEvent } from 'rxjs';
import { TypeDiv } from '../../../../type-dom/type-element/type-html/div/div.abstract';
import { FormEditor } from '../../../form-editor';
import { WebPage } from '../../page/web-page.class';
import { IWebPage } from '../../page/web-page.interface';
import { WebDocument } from '../web-document.class';
import { IWebDocumentContents } from './contents.interface';

// todo 处理多页面问题
//    修改tab头部名称应该在属性中，或者双击选中时就可修改。
//    是否要新增页面属性？？？
//    多页面时，默认页面不应该清空
//    加载多页面时，要同步到 tab数量属性中。
export class WebDocumentContents extends TypeDiv implements IWebDocumentContents {
  className: 'WebDocumentContents';
  // todo 这样的子元素类型是有问题的。要优化
  //      tabs contents
  //      tabs在设计模式下，在页面中可以增删。
  //      只有一个页面时， tabs隐藏，只显示唯一的contents.
  childNodes: WebPage[];
  // enabledTab:false;
  currentPage: WebPage; // 当前画板
  defaultPage: WebPage; // 原来的第一个画板

  constructor(public parent: WebDocument) {
    super();
    this.className = 'WebDocumentContents';
    this.propObj = {
      styleObj: {
        // display: Display.flex,
        // flexDirection: 'column',
        // // width: 'min-content',
        // minWidth: '500px',
        // maxHeight: 'calc(100vh - 40px)',
        // padding: '20px',
        // boxSizing: 'border-box',
        // margin: '0 auto',
        // transformOrigin: '50% 0',
        // // transform: 'scale(0.5)',
        // overflowY: 'auto',
      },
      attrObj: {
        name: 'document-contents'
      }
    };

    this.defaultPage = new WebPage(this);
    this.currentPage = this.defaultPage;
    this.childNodes = [this.defaultPage];
    this.initEvents();
  }

  // TODO count is 1 ？？？
  setPages(count: number): void {
    console.log('setPages begins . ');
    // 删除多出来的页面 子节点和其dom
    this.childNodes.forEach((page, index) => {
      if (index > count - 1) {
        page.dom.remove();
      }
    });
    if (count < this.length) {
      this.childNodes.length = count;
    }
    for (let i = 0; i < count; i++) {
      if (this.childNodes[i]) {
      // 已有的页面不变。
      } else {
        const pageObj = new WebPage(this);
        pageObj.hide();
        pageObj.setAttrObj({
          pageIndex: i + 1,
        });
        this.appendChild(pageObj);
      }
    }
  //  todo 默认显示最后一页，还是首页 ？？？
  }
  createInstance(contents: IWebDocumentContents): void {
    this.setPropObj(contents.propObj);

    this.childNodes = [this.defaultPage];
    // todo 处理tabs
    contents.childNodes.forEach((page: IWebPage, index: number) => {
      // todo 多页面的处理
      if (index === 0) {
        this.defaultPage.createInstance(page);
      } else {
        if (page.className === 'WebPage') {
          const pageObj = new WebPage(this);
          pageObj.createInstance(page);
          this.appendChild(pageObj);
        } else {
          console.error('error. ');
        }
      }
    });
    this.currentPage = this.childNodes[this.childNodes.length - 1];
    // this.currentPage = this.defaultPage;
    // 加载 tabHeaders 绑定的事件
    this.initEvents();
  }

  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe((e) => {
        // console.log(this.dom, 'this.dom.lastChild.childNodes');
        // console.log('e target is ', e.target);
        if (e.target === this.dom) { // 选中非控件部位，取消选中控件。
          FormEditor.setSelectedControl(null);
        }
      })
    );
  }
}
