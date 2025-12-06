import { describe, it } from 'vitest';
// import { useEventListener } from '@type-dom/use';
import { Div } from '../src';
// import { promiseTimeout, createSingletonPromise } from './yourModulePath'; // 请替换为实际的模块路径

// 1. 测试异步操作的性能
describe('Async operation performance', () => {
  it('should measure promiseTimeout performance', async () => {
    const startTime = performance.now();
    // await promiseTimeout(100);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`promiseTimeout execution time: ${executionTime} ms`);
    // 可以根据需求添加断言，例如判断执行时间是否在合理范围内
    expect(executionTime).toBeLessThan(200);
  });

  it('should measure createSingletonPromise performance', async () => {
    // const createPromise = () => Promise.resolve(0);
    // const wrapper = createSingletonPromise(createPromise);
    const startTime = performance.now();
    // const promise1 = wrapper();
    // const promise2 = wrapper();
    // await promise1;
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`createSingletonPromise execution time: ${executionTime} ms`);
    expect(executionTime).toBeLessThan(100);
  });
});

// 2. 测试组件渲染性能
// import { useActiveElement } from './yourModulePath'; // 请替换为实际的模块路径
describe('Component rendering performance', () => {
  it('should measure useActiveElement rendering performance', () => {
    const startTime = performance.now();
    // const activeElement = useActiveElement();
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`useActiveElement rendering time: ${executionTime} ms`);
    expect(executionTime).toBeLessThan(50);
  });
});

// 3. 测试数据更新性能
// import { useActiveElement } from './yourModulePath'; // 请替换为实际的模块路径
describe('Data update performance', () => {
  it('should measure useActiveElement data update performance', async () => {
    // const activeElement = useActiveElement();
    const startTime = performance.now();
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    await new Promise(resolve => setTimeout(resolve, 10)); // 等待一段时间以确保更新完成
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`useActiveElement data update time: ${executionTime} ms`);
    expect(executionTime).toBeLessThan(100);
  });
});
//4. 批量操作性能测试
// import { useEventListener } from './yourModulePath'; // 请替换为实际的模块路径
describe('Bulk operation performance', () => {
  it('should measure useEventListener bulk operation performance', () => {
    // const target = document.createElement('div');
    // const listeners = Array.from({ length: 100 }, () => vi.fn());
    // const events = Array.from({ length: 100 }, (_, i) => `event${i}`);
    const startTime = performance.now();
    // useEventListener(target, events, listeners);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`useEventListener bulk operation time: ${executionTime} ms`);
    expect(executionTime).toBeLessThan(200);
  });
});


describe('Component bulk creation performance', () => {
  it('should efficiently create 1000 components', () => {
    const container = document.createElement('div');
    document.body.appendChild(container); // 创建临时容器

    // 记录初始内存（仅 Node.js）
    const initialMemory = process.memoryUsage().heapUsed;
    const startTime = performance.now();

    // 创建1000个组件并挂载到DOM
    for (let i = 0; i < 1000; i++) {
      const component = new Div(); // ❗️ 根据实际组件类型调整（如React/Vue等）
      // container.appendChild(component.render()); // ❗️ 根据组件渲染方式调整
      component.mount(container);
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`1000 components creation time: ${executionTime.toFixed(2)} ms`);
    // 记录结束内存
    const finalMemory = process.memoryUsage().heapUsed;
    let memoryIncrease = (finalMemory - initialMemory) / 1024 / 1024; // 转换为 MB

    // 清理DOM避免影响其他测试
    document.body.removeChild(container);

    // 强制GC后再次测量（可选）
    if (typeof global.gc === 'function') {
      global.gc();
      const postGCMemory = process.memoryUsage().heapUsed;
      memoryIncrease = (postGCMemory - initialMemory) / 1024 / 1024;
    }

    // 输出结果
    console.log(
      `1000 components created in ${executionTime.toFixed(2)}ms, memory increased by ${memoryIncrease.toFixed(2)} MB`
    );

    expect(executionTime).toBeLessThan(1000); // ❗️ 根据实际性能需求调整阈值
    expect(memoryIncrease).toBeLessThan(15); // 可根据实际需求调整阈值（如5MB）
  });
});
