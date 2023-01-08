import fetch from "node-fetch";

class SelectorResult {
  #elements;

  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements;
  }

  // html jquery method
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

  show() {
    this.#elements.forEach((element) => {
      // element;
      const elem = element as HTMLElement;
      elem.style.visibility = "visible";
    });
  }
}

function $(selector: string) {
  return new SelectorResult(document.querySelectorAll(selector));
}

namespace $ {
  export function ajax(
    url: string,
    successCb: (data: any) => void,
    errorCb: (err: Error) => void
  ): any {
    fetch(url)
      .then((res) => res.json())
      .then(successCb)
      .catch(errorCb);
  }
}

export default $;

// $("jso").on("c")
