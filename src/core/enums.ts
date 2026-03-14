export enum LifecycleHooks {
  // 组件实例刚创建，数据观测（data observer）和属性（props）都还没有初始化。
  BEFORE_CREATE = 'bc',
  /**
   * created函数用于在渲染TypeElement之前进行准备工作。
   * 该函数不接受参数，也不返回任何值。
   * 组件实例已经创建完成，数据观测和属性已初始化，但真实DOM尚未生成。
   * 主要完成以下工作：
   * 1. 打印日志说明当前处于created阶段。
   * 2. 检查dom属性是否已存在，若不存在，则创建一个新的DOM元素。
   * 3. 遍历当前Element的所有属性，对以':'和'@'开头的属性进行特殊处理。
   */
  CREATED = 'c',
  // 在挂载开始之前调用，相关的render函数首次被调用，此时组件的$el属性还不存在。
  BEFORE_MOUNT = 'bm',
  /**
   * 可选的函数，无参数，无返回值。
   * 组件实例被挂载到DOM上，$el属性现在可以访问，但子组件可能还未挂载。
   * 该函数用于在挂载完成后执行一些额外的操作。
   * 如果需要在特定条件下执行渲染完成后的操作，可以实现此函数。
   * 在子类中覆写
   */
  MOUNTED = 'm',
  // 当组件的数据发生改变时，但在DOM更新之前调用。可以访问到最新的数据，但不能访问到最新的DOM。
  BEFORE_UPDATE = 'bu',
  // 数据更新后，DOM已经更新完成。在此阶段，组件DOM已经更新，可以执行依赖于DOM的操作。
  UPDATED = 'u',
  // 组件实例销毁之前调用，实例仍然可用。
  BEFORE_UNMOUNT = 'bum',
  // 组件实例已经被销毁，所有绑定的事件监听器被移除，大部分数据属性将失效。
  UNMOUNTED = 'um',
  // 对于keep-alive组件，当组件被停用（退出缓存）时调用。
  DEACTIVATED = 'da',
  // 对于keep-alive组件，当组件被激活（进入缓存）时调用。
  ACTIVATED = 'a',
  // 数据响应式追踪结束时触发，同样用于调试响应式系统。
  RENDER_TRIGGERED = 'rtg',
  // 数据响应式追踪开始时触发，用于调试TypeDom的响应式系统。
  RENDER_TRACKED = 'rtc',
  // 捕获到子孙组件抛出的错误时调用，允许全局处理错误。
  ERROR_CAPTURED = 'ec',
  // 在服务器端渲染期间，组件可以在其自己的作用域内预加载数据。
  SERVER_PREFETCH = 'sp',
}

export enum NodeName {
  FRAGMENT = '#document-fragment', // DocumentFragment 用于临时存储一组节点（如通过 document.createDocumentFragment() 创建）
  TEXT = '#text', // TextNode 叶子节点（无子节点）
  COMMENT = '#comment', // Comment 文档中的注释内容，如 <!-- 注释 -->。
  // ELEMENT = 'element',
}
