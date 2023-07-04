import { fromEvent } from 'rxjs';
import { TypeDiv } from '../../../../../type-dom/type-element/type-html/div/div.abstract';
import { Display } from '../../../../../type-dom/style/style.enum';
import { TdButton } from '../../../../../type-dom/components/basic/td-button/td-button.class';
import { HeaderWrapper } from '../header';
import { toJSON } from '../../../../../type-dom/type-element/type-element.function';
import { IWebDocument } from '../../../../core/document/web-document.interface';
import { WebDocument } from '../../../../core/document/web-document.class';
import { AddSvg } from '../../../../../type-dom/components/svgs/add/add';
import { AttachmentSvg } from '../../../../../type-dom/components/svgs/attachment/attachment';
import { TimeSvg } from '../../../../../type-dom/components/svgs/time/time';
import { CloseSvg } from '../../../../../type-dom/components/svgs/close/close';
import { ConnectionSvg } from '../../../../../type-dom/components/svgs/connetion/connection';
import { DeleteSvg } from '../../../../../type-dom/components/svgs/delete/delete';
import { FormEditor } from '../../../../form-editor';
// import { SaveButton } from './save-button/save-button';

export class Navbar extends TypeDiv {
  className: 'Navbar';
  private readonly previewBtn: TdButton;
  private readonly saveBtn: TdButton;

  constructor(public parent: HeaderWrapper) {
    super();
    this.className = 'Navbar';
    this.addStyleObj({
      display: Display.flex,
      // justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '60px',
      background: 'linear-gradient(0deg, #eee, #e9e9e9)',
    });
    this.addAttrName('navbar');
    // this.previewBtn = this.createItem(this, {
    //   TypeClass: TdButton,
    // }) as TdButton;
    this.previewBtn = new TdButton(this, {
      SvgClass: AttachmentSvg,
      loading: true,
      title: '预览',
    });
    this.saveBtn = new TdButton(this, {
      SvgClass: DeleteSvg,
      loading: true,
      title: '保存',
      type: 'primary',
    });
    // this.previewBtn = new PreviewButton(this);
    // this.saveBtn = new SaveButton(this);
    this.addChildren(this.previewBtn, this.saveBtn);
    this.initEvents();
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.previewBtn.dom, 'click').subscribe(() => {
        FormEditor.setSelectedControl(null);
        FormEditor.dialog.show();
        FormEditor.dialog.setTitle('预览');
        this.previewForm();
        console.log('AppRoot.exampleData is ', FormEditor.formData);
      }),
      fromEvent(this.saveBtn.dom, 'click').subscribe(() => {
        FormEditor.messageBox.show();
        FormEditor.messageBox.setTitle('提醒');
        FormEditor.messageBox.confirm('你确定要保存表单吗？');
        // AppRoot.dialog.preview(AppRoot.page);
        // console.log('AppRoot.form json is ', toJSON(AppRoot.page));
      })
    );
  }
  /**
   * 预览表单
   */
  previewForm(): void {
    console.log('preview form . ');
    FormEditor.dialog.container.body.clearChildDom();
    FormEditor.dialog.container.body.clearChildNodes();
    const document = toJSON(FormEditor.webDocument) as IWebDocument;
    console.log('document is ', document);
    const docObj = new WebDocument(FormEditor.layout.body.content);
    docObj.createInstance(document);
    docObj.setParent(FormEditor.dialog.container.body);
    FormEditor.dialog.container.body.appendChild(docObj);
    // this.container.body.dom.appendChild(element.dom);
    // AppRoot.dialog.container.body.dom.appendChild(docObj.dom);
    // AppRoot.dialog.container.body.dom.childNodes.forEach(node => node.remove());
    // AppRoot.dialog.container.body.dom.appendChild(AppRoot.webDocument.dom.cloneNode(true));
  }
}
