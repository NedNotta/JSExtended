<!-- omit in toc -->
# JSExtended

A JavaScript library that extends on many objects and datatypes in JavaScript to make things easier, and adds a new (complex) datatypes based on primitive ones (MADE WITH ES6)

- [Usage](#usage)
    - [Extentions](#extentions)
        - [Strings](#strings)

## Usage

JSExtended is a js library that extends on the base javascript objects, to use just copy the `lib` folder into to project (ideal place is in the `/` folder), after that just use a script tag to link `JSExtended.js` file,
```html
<script src='./lib/JSExtended.js' type='text/javascript'>
```
then inside your own script you must call the load function to set it all up, here is the optimal use for JSExtended
```js
JSExtended.load(function () {
    // Your code here
}, {
    // Optional options here located in the options section
});
```
The options object allows you to control what extentions are added to your javascript file and what isn't, they're global but won't work until you call the load function.

### Extentions

Here is a list of all the extentions added

#### Strings
`String.prototype.toObj()` is a shortcut for `JSON.parse(String)`, it behaves the exact same
Example:
```javascript
'{"example":true,"example2":{"lmao":true,"hello there":"General Kenobi"}}'.toObj();

// Will make 
{
    example: true,
    example2: {
        lmao: true,
        "hello there": "General Kenobi"
    }
}
```

`String.prototype.insert(str, idx, rem)` is a shortcut for `this.slice(0, idx) + str + this.slice(idx + Math.abs(rem))`, it will insert the `str` argument at the `idx` in the string, and remove `rem` amount of characters after the insert index
Example:
```javascript
'Hello There'.insert("lol", 5, 5);

// Will make
'Hellolole'
```

`String.prototype.htmlEscape()` is a shortcut that will escape any html entities in a string 
Example:
```javascript
'<span class="lol">Something</span>'.htmlEscape();

// Will make
'&#60;span class="lol"&#62;Something&#60;/span&#62;'
```

`String.prototype.word(i)` is a shortcut for `this.split(" ")[i]`, it will split a string into a array of words and return the element at index `i`
Example:
```javascript
'There can be only one winner'.word(2)

// Will make 
'be'
```

`String.prototype.toHex(f, s = ' ')` Will convert a character or string into it's hex value, or hex values, if `f` is true, it will add `0x` to the start of every hex value, `s` is what will seperate the hex values (only usable in strings, not chars)
Example:
```javascript
'There can be only one winner'.toHex();

// Will make
'54 68 65 72 65 20 63 61 6e 20 62 65 20 6f 6e 6c 79 20 6f 6e 65 20 77 69 6e 6e 65 72'

'There'.toHex(true, "<-- -->")

// Will make
'0x54<-- -->0x68<-- -->0x65<-- -->0x72<-- -->0x65'
```
