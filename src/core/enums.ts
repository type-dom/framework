export enum LifecycleHooks {
  BEFORE_CREATE = 'bc',
  /**
   * created函数用于在渲染TypeElement之前进行准备工作。
   * 该函数不接受参数，也不返回任何值。
   * 主要完成以下工作：
   * 1. 打印日志说明当前处于created阶段。
   * 2. 检查dom属性是否已存在，若不存在，则创建一个新的DOM元素。
   * 3. 遍历当前Element的所有属性，对以':'和'@'开头的属性进行特殊处理。
   */
  CREATED = 'c',
  BEFORE_MOUNT = 'bm',
  /**
   * 可选的函数，无参数，无返回值。
   * 该函数用于在挂载完成后执行一些额外的操作。
   * 如果需要在特定条件下执行渲染完成后的操作，可以实现此函数。
   * 在子类中覆写
   */
  MOUNTED = 'm',
  BEFORE_UPDATE = 'bu',
  UPDATED = 'u',
  BEFORE_UNMOUNT = 'bum',
  UNMOUNTED = 'um',
  DEACTIVATED = 'da',
  ACTIVATED = 'a',
  RENDER_TRIGGERED = 'rtg',
  RENDER_TRACKED = 'rtc',
  ERROR_CAPTURED = 'ec',
  SERVER_PREFETCH = 'sp',
}

export enum NodeName {
  FRAGMENT = 'fragment', // DocumentFragment 用于临时存储一组节点（如通过 document.createDocumentFragment() 创建）
  TEXT = '#text', // TextNode 叶子节点（无子节点）
  COMMENT = 'comment', // Comment 文档中的注释内容，如 <!-- 注释 -->。
  // ELEMENT = 'element',
}
