import fetch from "node-fetch";

class SelectorResult {
  #elements;

  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements;
  }
}
function $(selector: string): any {
  return new SelectorResult(document.querySelectorAll(selector));
}

namespace $ {
  export function ajax(...args: any[]): any {
    return {} as any;
  }
}

export default $;
