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

  on<K extends keyof HTMLElementEventMap>(
    eventType: K,
    callback: (event: HTMLElementEventMap[K]) => void
  ) {
    this.#elements.forEach((element) => {
      // if (element instanceof HTMLElement) {
      // }
      const elem = element as HTMLElement;
      elem.addEventListener(eventType, callback);
    });
  }
  hide() {
    this.#elements.forEach((element) => {
      // element;
      const elem = element as HTMLElement;
      elem.style.visibility = "hidden";
    });
  }
}

function $(selector: string) {
  return new SelectorResult(document.querySelectorAll(selector));
}

namespace $ {
  export function ajax(...args: any[]): any {
    return {} as any;
  }
}

export default $;

// $("jso").on("c")
