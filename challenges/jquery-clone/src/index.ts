import fetch from "node-fetch";

class SelectorResult {
  #elements;

  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements;
  }

  html(contents: string) {
    this.#elements.forEach((element) => {
      element.innerHTML = contents;
    });
  }
  on(eventType: string, callback: () => void) {
    this.#elements.forEach((element) => {
      element.addEventListener(eventType, callback);
    });
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

$(".myDiv").html("kdkk");
