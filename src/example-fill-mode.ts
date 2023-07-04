import { fromEvent } from 'rxjs';
import {
  formJson,
  tableJson,
  oldFormJson,
  oldFormData,
  formData,
  tableData,
  taskJson,
  taskData
} from './form-data';
import { FormEditor } from './form-editor';
import './styles/index.scss';
// 在页面中调用时
fromEvent(document, 'DOMContentLoaded').subscribe(e => {
  // console.log('form mode document DOMContentLoaded, e is ', e);
  const formEl = document.querySelector('#fill-mode') as HTMLElement;
  // console.log('formEl is ', formEl);
  if (formEl) {
    formEl.style.maxWidth = '800px';
    formEl.style.margin = '0 auto';
    const editor = new FormEditor(formEl, 'fill');
    console.log('editor is ', editor);

    // 测试混合表单
    editor.createInstance(taskJson);
    // 给控件配值
    FormEditor.setFormData(taskData);
    // 老数据
    // editor.createInstance(oldFormJson);
    // // 给控件配值
    // editor.setFormData(oldFormData);
    // 表格数据
    // editor.createInstance(tableJson);
    // // 给控件配值
    // editor.setFormData(tableData);

    // const tableControl = new TableControl(editor.layout.webDocument.defaultPage, '我的表格', list);
    // editor.layout.webDocument.defaultPage.childNodes.push(tableControl);
    FormEditor.setSelectedControl(FormEditor.currentPage.childNodes[0]);
  }
});

// fromEvent(window, 'load').subscribe(e => {
//   console.log('window onload is ', e);
// });
