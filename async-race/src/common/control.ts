class Control<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '', src = '') {
    const el = document.createElement(tagName) as HTMLImageElement;
    el.className = className;
    el.innerHTML = content;
    if (parentNode) {
      parentNode.append(el);
    }
    if (tagName === 'img') {
      el.src = src;
    }
    this.node = el as unknown as NodeType;
  }

  destroy(): void {
    this.node.remove();
  }
}

export default Control;
