import { fromEvent } from 'rxjs';
import { TypeDiv } from '../../../type-dom/type-element/type-html/div/div.abstract';
import { WebDocument } from '../../core/document/web-document.class';
import { WebForm } from '../../components/form/form';
import { FormEditor } from '../../form-editor';
import { HeaderWrapper } from './header/header';
import { BodyWrapper } from './body/body';
export class LayoutWrapper extends TypeDiv {
  className: 'LayoutWrapper';
  webDocument: WebDocument;
  header: HeaderWrapper;
  body: BodyWrapper;
  form?: WebForm;
  constructor(public parent: FormEditor) {
    super();
    this.className = 'LayoutWrapper';
    this.addAttrName('layout');
    this.addStyleObj({
      height: '100%',
      // overflow: 'auto',
    });
    this.webDocument = new WebDocument(this);
    this.header = new HeaderWrapper(this);
    this.body = new BodyWrapper(this); // WebBody ---> MainContent中会调用 webDocument,所以必须先创建webDocument
    if (FormEditor.mode === 'design') {
      this.childNodes.push(this.header, this.body);
      // console.log('this.formEditor.el.clientHeight is ', this.formEditor.el.clientHeight);
    } else {
      // todo fill mode read mode
      this.form = new WebForm(this);
      // 头部显示表单名称
      // this.form.setTitle('');
      this.form.header.hide(); // 隐藏头部
      this.webDocument.propObj.styleObj.height = '100%';
      this.form.body.addChild(this.webDocument);
      this.addChild(this.form);
    }
    this.initEvents();
  }
  initEvents(): void {
    this.events.push(
      // todo 右键菜单
      fromEvent(document, 'contextmenu').subscribe((e) => {
        e.preventDefault();
        return false;
      }),
      // fromEvent(this.dom, 'mouseup').subscribe(() => {
      //   // todo 监听不到？？？
      //   console.log('layout mouseup . ');
      // }),
    );
  }
}
