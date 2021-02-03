class FAF {
    constructor(innerHTML, bindings, eventHandlers) {
        this.component = document.createElement('div');

        this.innerHTMLTemplate = innerHTML;
        this.bindings = bindings;
        this.eventHandlers = eventHandlers;
        this.isAttached = false;

        this.roots = [];
        this.bindingRe = /\{\{ (\w+) \}\}/g;
    }

    appendTo(elemId) {
        const elem = (typeof elemId === 'string') ? document.getElementById(elemId) : elemId;

        if (elem instanceof HTMLElement) {
            this.roots.push(elem);
            this._render(true);
        }
    }

    remove() {
        this.roots.forEach((root) => {
            if (this.eventHandlers) {
                this._removeEventListeners(root);
            }

            root.replaceChildren(...this.component.childNodes);
        });
        this.isAttached = false;
    }

    updateBindings(updates) {
        Object.assign(this.bindings, updates);
        if (this.isAttached) {
            this._render(false);
        }
    }

    _addEventListeners(elem) {
        this.eventHandlers.forEach(handler => {
            const item = elem.querySelector(`#${handler.id}`);
            item.addEventListener(handler.event, handler.handler);
        });
    }

    _removeEventListeners(elem) {
        this.eventHandlers.forEach(handler => {
            const item = elem.querySelector(`#${handler.id}`);
            item.removeEventListener(handler.event, handler.handler);
        });
    }

    _render(append) {
        const bindedHTML = this.innerHTMLTemplate.replaceAll(this.bindingRe, (matched, key) => this.bindings[key]);
        this.roots.forEach(root => {
            this.component.innerHTML = bindedHTML;

            if (append) {
                root.append(...this.component.childNodes);
            } else {
                root.replaceChildren(...this.component.childNodes, ...this.component.childNodes);
            }

            if (this.eventHandlers) {
                this._addEventListeners(root);
            }
        });
        this.isAttached = true;
    }
}
