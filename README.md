# FAF templator
One more shitty JavaScript templator.

FAF because it should be Fast As Fuck, but actually it is not.

! Work In Progress !

## Example

```
const inputHtml = `
    <input type="text" id="input" placeholder="{{ placeholder }}" value="{{ value }}" />
    <button id="ok">Ok</button>
`;

let placeholder = 'Type here...';
let value = '';

function onInput(e) {
    value = e.target.value;
    console.log('[FAF][input][onInput]: ', value);
}

const bindings = {
    placeholder,
    value
};
const events = [
    {
        id: 'input',
        event: 'input',
        handler: onInput
    }
];

const input = new FAF(inputHtml, bindings, events);
input.appendTo('idOfElementWhereYouWantToAppendThisTemplate');

setTimeout(() => {
    placeholder = 'LOOOOL';
    input.updateBindings({ placeholder });
}, 5000);

setTimeout(input.remove, 10000);
```
