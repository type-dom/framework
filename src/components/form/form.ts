import { TypeDiv } from '../../../type-dom/type-element/type-html/div/div.abstract';
import { TypeRoot } from '../../../type-dom/type-root/type-root.class';
import { StylePosition } from '../../../type-dom/style/style.enum';
import { FormEditor } from '../../form-editor';
import { LayoutWrapper } from '../../views/layout/layout';
import { FormHeader } from './header/header';
import { FormBody } from './body/body';
import { FormFooter } from './footer/footer';
export class WebForm extends TypeDiv {
  className: 'WebForm';
  childNodes: [FormHeader, FormBody, FormFooter];
  header: FormHeader;
  body: FormBody;
  footer: FormFooter;
  title: string;
  constructor(public parent: LayoutWrapper | TypeRoot) {
    super();
    this.className = 'WebForm';
    this.propObj = {
      styleObj: {
        position: StylePosition.relative,
        // boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#FFF',
        padding: '15px',
        height: '100%',
        overflowY: 'auto'
      },
      attrObj: {
        name: 'form-container'
      }
    };
    this.title = '表单名称';
    this.header = new FormHeader(this);
    this.body = new FormBody(this);
    this.footer = new FormFooter(this);
    if (FormEditor.mode === 'readonly') {
      this.footer.hide();
    }
    this.childNodes = [this.header, this.body, this.footer];
  }

  // 设置表单标题
  setTitle(value: string): void {
    this.title = value;
    this.header.childNodes[0].setText(value);
    this.header.render();
  }
}
