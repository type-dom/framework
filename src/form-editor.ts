// 顺序不能随意调换，可能会加载报错。 WebControl todo 如何解决
import { filter, fromEvent, switchMap, of, Observable, Subscription, Subject } from 'rxjs';
import { LayoutWrapper } from './views/layout/layout';
import { ControlProperty } from './views/layout/body/right/contents/control-property/control-property';
import { FormProperty } from './views/layout/body/right/contents/form-property/form-property';
import { FieldProperty } from './views/layout/body/right/contents/field-property/field-property';
import { Test } from './views/test/test';
import { Cursor } from '../type-dom/style/style.enum';
import { TypeRoot } from '../type-dom/type-root/type-root.class';
import { ListItem } from '../type-dom/element/html-element/unordered-list/list-item/list-item.class';
import { Span } from '../type-dom/element/html-element/span/span.class';
import { toJSON } from '../type-dom/type-element/type-element.function';
import { WebDialog } from '../type-dom/components/dialog/dialog';
import { MessageBox } from '../type-dom/components/message-box/message-box';
import { TextNode } from '../type-dom/text-node/text-node.class';
import { ControlMenu } from './core/menus/menu.abstract';
import { WebDocument } from './core/document/web-document.class';
import { IWebDocument } from './core/document/web-document.interface';
import { WebPage } from './core/page/web-page.class';
import { WebControl } from './core/controls/web-control.abstract';
import { IOptionConfig } from './core/controls/web-control.interface';
import { AttachmentControl } from './core/controls/basic/attachment/attachment.class';
import { ConnectionControl } from './core/controls/complex/connection/connection.class';
import { TableControl } from './core/controls/complex/table/table.class';
import { ITableField } from './core/controls/complex/table/table.interface';
import { WebForm } from './components/form/form';
import { TableDataCell } from './components/form/form-item/table-item/table/data-cell/data-cell.class';
import { TableRow } from './components/form/form-item/table-item/table/row/row.class';
/**
 * 应用根节点，必须存在。
 * 应用继承 TypeRoot;
 * 因为属性和方法要全局调用，所以全部设置为静态 static; 包括get也设置为静态
 */
export class FormEditor extends TypeRoot {
  className: 'FormEditor';
  // 光标
  static cursor?: Cursor | null;
  // 选中的菜单
  static selectedMenu: ControlMenu | null;
  // 选中的控件
  static selectedControl: WebControl | null;
  // 选中的表格单元格
  static selectedTableDataCell?: TableDataCell | null;
  static layout: LayoutWrapper;
  // 对话框
  static dialog: WebDialog;
  // 消息框
  static messageBox: MessageBox;
  // 编辑器模式，对应 设计模式， 填表模式， 只读模式
  static mode: 'design' | 'fill' | 'readonly';
  // todo tabs操作中重置。
  // currentPage: WebPage;
  // 集中出来外部传入的函数或方法。
  static functionMap: Map<string, (...rest: any[]) => any>;
  static el: HTMLElement;
  events: Subscription[];
  static editorElObservable: Observable<Event>;
  static onReady: Observable<void>;
  static readyEvent: Subject<void>;
  constructor(editorEl: HTMLElement, mode: 'design' | 'fill' | 'readonly' = 'design') {
    super(editorEl);
    this.className = 'FormEditor';
    FormEditor.el = editorEl;
    if (!FormEditor.el.clientHeight) {
      // FormEditor.el.setAttribute('clientHeight', '500px');
      FormEditor.el.style.height = '600px'; // 默认高度600px;
    }
    // console.log('FormEditor.el.clientHeight is ', FormEditor.el.clientHeight);
    this.events = [];
    FormEditor.mode = mode;
    FormEditor.layout = new LayoutWrapper(this);
    FormEditor.dialog = new WebDialog(this);
    FormEditor.messageBox = new MessageBox(this);
    // FormEditor.layout.childNodes.push(this.dialog, this.messageBox);
    this.childNodes = [FormEditor.layout, FormEditor.dialog, FormEditor.messageBox];
    // this.createItem(this, {
    //   TypeClass: LayoutWrapper,
    //   // propObj: {
    //   //   styleObj: {},
    //   //   attrObj: {}
    //   // },
    //   childNodes: [
    //     {
    //       TypeClass: WebDialog,
    //       // propObj: {
    //       //   styleObj: {},
    //       //   attrObj: {},
    //       // }
    //     },
    //     {
    //       TypeClass: MessageBox,
    //       // propObj: {
    //       //   styleObj: {},
    //       //   attrObj: {}
    //       // }
    //     }
    //   ]
    // });
    this.render();
    const json = this.toJSON();
    console.log('json is ', json);
    // console.log('editorEl is ', editorEl);
    // editorEl.appendChild(FormEditor.layout.dom);
    const test = new Test(this);
    console.log('test is ', test);
    test.render();
    editorEl.appendChild(test.dom);
    // this.currentPage = this.defaultPage;
    FormEditor.selectedMenu = null;
    FormEditor.selectedControl = null;
    // this.connectionItemObservable = null;
    FormEditor.editorElObservable = fromEvent(FormEditor.el, 'click')
      .pipe(filter(() => {
        return !!FormEditor.selectedTableDataCell || !!FormEditor.selectedControl;
      }));
    FormEditor.functionMap = new Map();
    FormEditor.formProperty.reset();
    FormEditor.readyEvent = new Subject<void>();
    FormEditor.onReady = FormEditor.readyEvent.asObservable();
  }
  /**
   * 获取设置的文档对象
   */
  static get webDocument(): WebDocument {
    return FormEditor.layout.webDocument;
  }

  /**
   * 获取右侧属性栏的字段属性tab
   */
  static get fieldTab(): ListItem {
    return FormEditor.layout.body.right.tabs.fieldTab;
  }

  /**
   * 获取右侧属性栏的控件属性的tab
   */
  static get controlTab(): ListItem {
    return FormEditor.layout.body.right.tabs.controlTab;
  }

  /**
   * 获取右侧属性栏的表单属性的tab
   */
  static get formTab(): ListItem {
    return FormEditor.layout.body.right.tabs.formTab;
  }

  /**
   * 获取控件属性栏
   */
  static get controlProperty(): ControlProperty {
    return FormEditor.layout.body.right.contents.controlProperty;
  }

  /**
   * 获取字段属性栏
   */
  static get fieldProperty(): FieldProperty {
    return FormEditor.layout.body.right.contents.fieldProperty;
  }

  /**
   * 获取表单属性栏
   */
  static get formProperty(): FormProperty {
    return FormEditor.layout.body.right.contents.formProperty;
  }

  // todo 暂时不用
  static get currentPage(): WebPage {
    return FormEditor.webDocument.contents.currentPage;
  }
  /**
   * 获取默认页
   */
  static get defaultPage(): WebPage { // defaultPage 默认首页
    // return FormEditor.webDocument.defaultPage;
    return FormEditor.webDocument.contents.defaultPage;
  }

  /**
   * 获取所有控件
   * 考虑多页面
   */
  static get allControls(): WebControl[] {
    const controls: WebControl[] = [];
    FormEditor.webDocument.contents.childNodes.forEach(page => {
      // todo
      if (page.className === 'WebPage') {
        controls.push(...page.childNodes);
      }
    });
    return controls;
  }

  /**
   * 获取所有选项控件
   */
  static get optionControls(): WebControl[] {
    return FormEditor.allControls.filter(control => !!control.optionConfig);
  }

  /**
   * 默认值属性控制项的控制公式编辑器是否显示的监听
   */
  static get formulaVisibleObservable(): Observable<Event> {
    return this.editorElObservable.pipe(
      switchMap(() => {
        // console.log('this.editor.selectedControl is ', FormEditor.selectedControl);
        // if (FormEditor.selectedTableDataCell) { // 表格单元格选中的控件
        //   return FormEditor.fieldProperty.fieldDefaultValue.formulaObservable;
        // }
        return FormEditor.controlProperty.controlDefaultValue.formulaObservable;
      })
    );
  }

  /**
   * 控件属性中选项的监听
   */
  static get optionsConfigObservable(): Observable<Event> {
    return this.editorElObservable.pipe(
      switchMap(() => {
        // console.log('this.editor.selectedControl is ', FormEditor.selectedControl);
        if (FormEditor.selectedTableDataCell) { // 表格单元格选中的控件
          // console.log('FormEditor.fieldProperty.fieldOptions.optionsConfigObservable is ', FormEditor.fieldProperty.fieldOptions.optionsConfigObservable);
          return FormEditor.fieldProperty.fieldOptions.optionsConfigObservable;
        }
        // console.log('FormEditor.controlProperty.controlOptions.optionsConfigObservable is ', FormEditor.controlProperty.controlOptions.optionsConfigObservable);
        return FormEditor.controlProperty.controlOptions.optionsConfigObservable;
      })
    );
  }

  /**
   * 提交表单的监听
   */
  static get submitObservable(): Observable<Event> | undefined {
    return FormEditor.layout.form?.footer.submitBtn.submitObservable;
  }

  /**
   * 关联选项控件的关联属性的监听
   */
  static get connectionObservable(): Observable<Event> {
    return this.editorElObservable.pipe(
      switchMap(() => {
        if (FormEditor.selectedTableDataCell) { // 表格单元格选中的控件
          console.log('FormEditor.fieldProperty.fieldConnection.connectionObservable is ', FormEditor.fieldProperty.fieldConnection.connectionObservable);
          return FormEditor.fieldProperty.fieldConnection.connectionObservable;
        }
        return FormEditor.controlProperty.controlConnection.connectionObservable;
      })
    );
  }

  /**
   * 点击关联选项时，监听其点击事件。返回当前选中的控件是关联选项控件时。
   * 要考虑表格单元格中的控件是ConnectionControl的情况
   */
  static get connectionItemObservable(): Observable<Event | null> {
    return this.editorElObservable.pipe(
      switchMap(() => {
        if (FormEditor.selectedTableDataCell?.control instanceof ConnectionControl) {
          console.log('FormEditor.selectedTableDataCell.control.connectionItemObservable is ', FormEditor.selectedTableDataCell.control.connectionItemObservable);
          return FormEditor.selectedTableDataCell.control.connectionItemObservable;
        }
        if (FormEditor.selectedControl instanceof ConnectionControl) {
          console.log('FormEditor.selectedControl.connectionItemObservable is ', FormEditor.selectedControl.connectionItemObservable);
          return FormEditor.selectedControl.connectionItemObservable;
        }
        return of(null);
      }),
      filter(ob => ob !== null)
    );
  }

  /**
   * 附件上传文件的监听
   */
  static get attachmentObservable(): Observable<Event | null> {
    return this.editorElObservable.pipe(
      switchMap(() => {
        if (FormEditor.selectedTableDataCell?.control instanceof AttachmentControl) {
          return FormEditor.selectedTableDataCell.control.attachmentObservable;
        }
        if (FormEditor.selectedControl instanceof AttachmentControl) {
          return FormEditor.selectedControl.attachmentObservable;
        }
        return of(null);
      }),
      filter(ob => ob !== null)
    );
  }
  /**
   * 获取表单
   */
  static get form(): WebForm | undefined {
    return FormEditor.layout.form;
  }

  /**
   * 根据控件获取提交的数据
   */
  static get formData(): Record<string, string | any[]> {
    const formData: Record<string, string | any[]> = {};
    const formIds = FormEditor.webDocument.formIds;
    if (formIds) {
      const formIdJson = JSON.parse(formIds);
      for (const key in formIdJson) {
        formData[key] = formIdJson[key];
      }
    }
    const tableData: Record<string, string | number | boolean>[] = [];
    formData.table = tableData;
    FormEditor.allControls.forEach((ctrl) => {
      if (ctrl instanceof TableControl) {
        // console.log('ctrl is TableControl', ctrl);
        const table = ctrl.formItem.itemContent;
        // todo ctrl.tableHeader tableData
        const tableHeader = table.childNodes[0];
        // console.log('tableHeader is ', tableHeader);
        const tableHead: ITableField[] = [];
        tableHeader.childNodes.forEach((th) => {
          tableHead.push({
            label: th.childNodes[0].nodeValue.toString(),
            name: th.attrObj.name as string,
          });
        });
        // console.log('tableHead is ', tableHead);
        table.childNodes.forEach((tr: TableRow | unknown, index: number) => {
          if (index > 0) {
            // console.log('tr is ', tr);
            if (tr instanceof TableRow) {
              let data: { [propName: string]: string | number | boolean } = {};
              const rowId = tr.rowId;
              if (rowId) {
                const rowIdJson = JSON.parse(rowId);
                for (const key in rowIdJson) {
                  data[key] = rowIdJson[key];
                }
              }
              tr.childNodes.forEach((td: TableDataCell | Span, index) => {
                // console.log('td is ', td);
                if (td instanceof Span) { // 是删除按钮
                  return;
                }
                const item = td.childNodes[0];
                if (item instanceof TextNode) {
                  data[tableHead[index].name] = item.nodeValue;
                } else {
                  data[tableHead[index].name] = item.value; // WebControl.value;
                }
              });
              tableData.push(data);
            }
          }
        });
        // console.log('tableData is ', tableData);
      } else {
        if (ctrl.fieldName) {
          formData[ctrl.fieldName] = ctrl.value || '';
        }
      }
    });
    return formData;
  }

  /**
   * 选中控件
   * @param control
   */
  static setSelectedControl(control: WebControl | null): void {
    console.log('setSelectedControl . control is ', control);
    if (control) { // 选中控件
      // 如果重复选中一个控件，不做处理
      if (FormEditor.selectedControl === control) {
        return;
      }
      // 如果选中的控件不是表格控件
      // todo ??? 为什么要清理 ???
      if (FormEditor.selectedTableDataCell && !(control instanceof TableControl)) {
        FormEditor.setSelectedTableDataCell(null);
      }

      // 如果之前有选中的控件，则重置样式。
      FormEditor.selectedControl?.setStyleObj({
        border: '1px solid #e2e0e0',
      });
      FormEditor.selectedControl = control;
      control.setStyleObj({
        border: '1px solid #f00',
      });

      FormEditor.controlTab.setStyle('display', 'block'); // 控件属性栏的tab开始时隐藏的。
      // this.controlTab.dom.click();
      // console.log('clone ', control.clone());
      // this.form.appendChild(control.clone());
    } else { // 清除选中的控件
      if (FormEditor.selectedControl) {
        FormEditor.selectedControl.setStyleObj({
          border: '1px solid #e2e0e0',
        });
        FormEditor.selectedControl = null;
        // 清除选中控件时，如果有选中的单元格，也要同步清除。
        if (FormEditor.selectedTableDataCell) {
          FormEditor.setSelectedTableDataCell(null);
        }
      }
      // this.controlTab.setStyle('display', 'none');
      // this.formTab.dom.click();
    }
    if (FormEditor.mode === 'design') {
      FormEditor.controlProperty.reset();
    }
  }

  /**
   * 选中单元格，则显示字段属性；否则，隐藏；
   * todo setSelectedControl setSelectedTableDataCell 联动问题
   * @param tableDataCell
   */
  static setSelectedTableDataCell(tableDataCell: TableDataCell | null): void {
    console.error('setSelectedTableDataCell . tableDataCell is ', tableDataCell);
    if (tableDataCell) {
      if (FormEditor.selectedTableDataCell === tableDataCell) { // 重复选中同一单元格
        return;
      }
      FormEditor.selectedTableDataCell?.setStyleObj({
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#DCDFE6',
      });
      FormEditor.selectedTableDataCell = tableDataCell;
      tableDataCell.setStyleObj({
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#f00',
        display: 'table-cell'
      });
      FormEditor.layout.body.right.tabs.fieldTab.setStyle('display', 'block'); // 字段的tab开始时隐藏的。
      // this.fieldTab.dom.click();
    } else { // 清除选中
      if (FormEditor.selectedTableDataCell) {
        FormEditor.selectedTableDataCell.setStyleObj({
          borderColor: '#DCDFE6',
        });
      }
      FormEditor.selectedTableDataCell = null;
      FormEditor.layout.body.right.tabs.fieldTab.setStyle('display', 'none');
      FormEditor.controlTab.dom.click();
    }
    if (FormEditor.mode === 'design') {
      // 重置属性栏？？？
      FormEditor.fieldProperty.reset();
    }
  }

  /**
   * 选中表格时单独处理。
   * @param menu
   */
  static setSelectedMenu(menu: ControlMenu | null): void {
    if (menu) {
      // 要先移除之前选中的菜单的选中状态
      FormEditor.selectedMenu?.setStyleObj({
        backgroundColor: '#eee',
        background: '-webkit-linear-gradient(top, #eee, #d9d9d9)',
      });
      FormEditor.selectedMenu = menu;
      menu.setStyleObj({
        backgroundColor: '#fae100',
        background: '#fae100',
      });
    } else {
      if (FormEditor.selectedMenu) {
        FormEditor.selectedMenu?.setStyleObj({
          backgroundColor: '#eee',
          background: '-webkit-linear-gradient(top, #eee, #d9d9d9)',
        });
        FormEditor.selectedMenu = null;
      }
    }
  }

  /**
   * 根据表单的字面量，实例化
   * @param docLiteral
   */
  createInstance(docLiteral: IWebDocument): void {
    FormEditor.layout.webDocument.createInstance(docLiteral);
    FormEditor.formProperty.reset();
    // FormEditor.layout.webDocument?.defaultPage.createInstance(pageLiteral);
    // console.log('FormEditor.layout.webDocument is ', FormEditor.layout.webDocument);
  }

  /**
   * 保存表单数据的回调方法
   * @param callback
   */
  static save(callback: (jsonData: IWebDocument) => void): void {
    const doc = this.getJsonObj();
    callback(doc);
  }

  /**
   * 获取文档的字面量
   */
  static getJsonObj(): IWebDocument {
    FormEditor.setSelectedControl(null); // 去除选中样式
    return toJSON(FormEditor.webDocument) as IWebDocument;
  }

  /**
   * 设置控件字段的配置信息
   * @param config
   */
  static setControlFieldConfig(config: IOptionConfig): void {
    FormEditor.controlProperty.controlField.resetFieldConfig(config);
  }

  /**
   * 设置控件默认值的公式
   * @param formula
   */
  static setControlDefaultValueFormula(formula: string): void {
    FormEditor.controlProperty.controlDefaultValue.formula = formula;
  }

  /**
   * 设置控件的option-config
   * @param config
   */
  static setControlOptionConfig(config: IOptionConfig): void {
    if (FormEditor.selectedTableDataCell) {
      FormEditor.fieldProperty.fieldOptions.resetConfig(config);
      FormEditor.fieldProperty.fieldOptions.resetControl();
      return;
    }
    FormEditor.controlProperty.controlOptions.resetConfig(config);
    FormEditor.controlProperty.controlOptions.resetControl();
  }

  /**
   * 设置选项控件对应的 label和value
   * todo 单元格中的处理
   * @param label
   * @param value
   */
  static setControlConnection(label: string, value: string): void {
    if (FormEditor.selectedTableDataCell) {
      FormEditor.fieldProperty.fieldConnection.reset(label, value);
      return;
    }
    FormEditor.controlProperty.controlConnection.reset(label, value);
  }

  /**
   * 设置选项控件的值
   * 当页面点击选项控件的选项按钮时，触发外部调用的页面，配置相关的数据。
   * 使用该方法，将编辑器外部设置的数据传给选项控件的选项按钮。
   * @param label
   * @param value
   */
  static setConnectionItemValue(label: string, value: string): void {
    if (FormEditor.selectedTableDataCell?.control instanceof ConnectionControl) {
      FormEditor.selectedTableDataCell.control.setAttrObj({
        value,
        label
      }); // 控件值
      // 在内容框中显示选中的值
      FormEditor.selectedTableDataCell.control.formItem.itemContent.setAttrObj({
        value: label // 显示值
      });
      return;
    }
    if (FormEditor.selectedControl instanceof ConnectionControl) {
      FormEditor.selectedControl.setAttrObj({
        value,
        label
      }); // 控件值
      // 在内容框中显示选中的值
      FormEditor.selectedControl.formItem.itemContent.setAttrObj({
        value: label // 显示值
      });
      // FormEditor.selectedControl.connectionItemLabel = label;
    } else {
      console.error('当前选中的控件不是关联选项控件');
      throw Error('当前选中的控件不是关联选项控件');
    }
  }
  // 设置附件控件的值
  static setAttachmentValue(label: string, value: string): void {
    if (FormEditor.selectedTableDataCell?.control instanceof AttachmentControl) {
      FormEditor.selectedTableDataCell.control.setAttrObj({
        value: value,
        title: value,
      }); // 控件值
      return;
    }
    if (FormEditor.selectedControl instanceof AttachmentControl) {
      FormEditor.selectedControl.setAttrObj({
        value: value,
        title: value,
      }); // 控件值
      // todo 改变显示的字符串
    } else {
      console.error('当前选中的控件不是附件控件');
      throw Error('当前选中的控件不是附件控件');
    }
  }
  /**
   * 根据formData,给相应的控件设置值
   * 读取表单时使用
   * @param formData
   */
  static setFormData(formData: Record<string, any>): void {
    if (!formData) {
      return;
    }  //  todo 基于formData插入数值
    let formIds: Record<string, string> = {};
    for (const key in formData) {
      if (key.endsWith('.ID')) {
        formIds[key] = formData[key];
      }
    }
    FormEditor.webDocument.setAttrObj({
      'form-ids': JSON.stringify(formIds),
    });
    const tableData = formData.table as Record<string, string>[];
    delete formData.table;
    FormEditor.allControls.forEach(control => {
      // console.log('control.fieldName is ', control.fieldName);
      // console.log('control.className is ', control.className);
      if (control instanceof TableControl) {
        //  todo 出来tableData
        // console.error('tableData is ', tableData);
        const table = control.formItem.itemContent;
        const config = table.config;
        // console.error('config is ', config);
        if (config) {
          // config.tableHeader = table.tableHeader;
          // config.tableData = tableData;
          const tableName = table.tableHeader[0].name.split('.')[0];
          // console.log('tableName is ', tableName);
          if (tableData) {
            // todo tableData过滤出这个表格控件的内容
            const data = tableData.filter((record) => {
              const tableName1 =  Object.keys(record)[0].split('.')[0];
              // console.log('tableName1 is ', tableName1);
              return tableName1 === tableName;
            });
            // console.log('data is ', data);
            table.setTableData(data);
          }
        }
      } else {
        for (let key in formData) {
          // if (key === 'table1.field5' && control.fieldName === 'table1.field5') {
          //   console.error('key is ', key, ' control.fieldName is ', control.fieldName);
          // }
          if (key === control.fieldName) {
            control.setValue(formData[key]);
          }
        }
      }
      if (FormEditor.mode === 'readonly') {
        control.setDisabled();
      }
    });
  }
}
