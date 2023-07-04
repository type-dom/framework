import { debounce, debounceTime, switchMap, fromEvent, map, filter, Observable, Subscription, merge } from 'rxjs';
import './styles/index.scss';
// import '../type-dom/style/scss/index.scss';
import { FormEditor } from './form-editor';
import {
  fieldsConfig,
  formData,
  formJson,
  optionsConfig,
  tableData,
  tableJson,
  testData1,
  testJson1
} from './form-data';
import { ConnectionControl } from './core/controls/complex/connection/connection.class';
import { makeLogger } from 'ts-loader/dist/logger';
// 在页面中调用时

fromEvent(document, 'DOMContentLoaded').subscribe(e => {
  // console.log('document DOMContentLoaded, e is ', e);
  const editorEl = document.querySelector('#design-mode') as HTMLElement;
  // console.log('editorEl is ', editorEl);
  if (editorEl) {
    const example = new ExampleDesignMode(editorEl);
    // editor = new FormEditor(editorEl);
    // console.log('editor is ', editor);
  }
});

// fromEvent(window, 'load').subscribe(e => {
//   console.log('window onload is ', e);
// });

class ExampleDesignMode {
  private editor: FormEditor;

  // private events: Subscription[];

  constructor(public el: HTMLElement) {
    this.editor = new FormEditor(el);
    // 测试混合表单
    // AppRoot.createInstance(formJson);
    // AppRoot.setFormData(exampleData);
    // 测试普通控件
    // AppRoot.createInstance(testJson1);
    // AppRoot.setFormData(testData1);
    // 测试表格
    // AppRoot.createInstance(tableJson);
    // AppRoot.setFormData(tableData);
    FormEditor.setControlFieldConfig(fieldsConfig);
    FormEditor.functionMap.set('add', this.add);
    FormEditor.onReady.subscribe(() => {
      console.log('this.editor on ready');
    });
    // this.events = [];
    // fetch('/source').then(res => { // 可以获取 html页面
    //   console.log('res is ', res);
    //   return res.text();
    // }).then(text => {
    //   console.log('text is ', text);
    // });
    this.initEvents();
  }

  add(a: number, b: number) {
    console.log('a b is ', a, b);
    return a + b;
  }

  initEvents(): void {
    console.log('AppRoot.editorElObservable is ', FormEditor.editorElObservable);
    // if (optionConfigSubscription) optionConfigSubscription.unsubscribe();
    FormEditor.optionsConfigObservable.subscribe(() => {
      console.log('AppRoot.optionsConfigObservable . ');
      FormEditor.setControlOptionConfig(optionsConfig);
    });

    // if (connectionSubscription) connectionSubscription.unsubscribe();
    FormEditor.connectionObservable.subscribe(() => {
      console.log('AppRoot.connectionObservable . ');
      FormEditor.setControlConnection('config-label', 'config-value');
    });
    FormEditor.connectionItemObservable.subscribe(() => {
      console.log('AppRoot.connectionItemObservable . ');
      if (FormEditor.selectedTableDataCell?.control instanceof ConnectionControl) {
        console.log('AppRoot.selectedControl.a is ', FormEditor.selectedTableDataCell.control.connectionConfigLabel);
        const value = FormEditor.selectedTableDataCell.control.connectionConfigValue;
        if (value === undefined) {
          // todo 弹框提示
          throw Error('请先选择配置信息。 ');
        }
        // then
        FormEditor.setConnectionItemValue('label', 'value');
        return;
      }
      if (FormEditor.selectedControl instanceof ConnectionControl) {
        console.log('AppRoot.selectedControl.a is ', FormEditor.selectedControl.connectionConfigLabel);
        const value = FormEditor.selectedControl.connectionConfigValue;
        if (value === undefined) {
          // todo 弹框提示
          throw Error('请先选择配置信息。 ');
        }
        // then
        FormEditor.setConnectionItemValue('label', 'value');
      } else {
        throw Error('不是ConnectionControl . ');
      }
    });
    // console.log('AppRoot.attachmentObservable . ');
    FormEditor.attachmentObservable.subscribe((e) => {
      console.log('e.target files is ', (e && (e.target as HTMLInputElement).files));
      FormEditor.setAttachmentValue('附件', 'file1');
    });
    FormEditor.formulaVisibleObservable.subscribe(() => {
      console.log('AppRoot.formulaVisibleObservable . ');
      FormEditor.setControlDefaultValueFormula('a+b=c');
    });

  }
}
