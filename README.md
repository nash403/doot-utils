<div align="center">
<h1>doot-utils</h1>

<p>JS Object manipulation with dot path and some magical helpers.</p>
</div>

<hr />



[![package version](https://img.shields.io/github/package-json/v/badges/shields.svg)](https://github.com/nash403/doot-utils)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/doot-utils)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![forthebadge](http://forthebadge.com/badges/built-with-love.svg)](http://forthebadge.com)


## Installation

With npm: `npm i doot-utils`

With yarn: `yarn add doot-utils`

In browser: `<script src="https://unpkg.com/doot-utils"></script>`

*Note*: The `dist/` folder contains:
  * UMD build: `doot-utils.js`
  * UMD build (core only): `doot-utils.core.js`
  * CommonJS build: `doot-utils.common.js`
  * CommonJS build (core only): `doot-utils.core.common.js`

## Usage example

Helper functions on their own:

```js
import { get, set, del, move, copy } from 'doot-utils'
// import { get, set, del } from 'doot-utils/dist/doot-utils.core' // if you only need core features

// Then use the helper function
get(obj, path, defaultValue)
set(obj, path, value)
copy(obj, path, targetObj, targetPath, modifierFn, doMove)
// etc...
```

With `Doot` wrapper class:
```js
import { dootify/* , Doot */ } from 'doot-utils'
const obj = {
  a: {
    b: {
      c: 12,
      toto: {
        foo: 'bar'
      }
    },
    d: {
      e: 'foo'
    }
  },
  f: {
    g: false
  }
}

const d = dootify(obj) // same as `new Doot(obj)`
d.get('a.b')
d.value // { c: 12, toto: { ... } }

d.get('a.undefined.prop').value // undefined

d.base() // internal value (chainValue) back to `obj`
  .set('toto.foo', 'baz')
  .value // = 'baz'

const target = {}
d.base()
  .copy('f.g', target, 'a.location', v => !v)
  .value // { a: { location: true } }
```

See [API](#api) for more details.

## Features

Doot-utils is a set of helper functions that let you use dot paths to access and transform deeply nestd properties of js object with ease. All that without getting any `TypeError` because of a non existing property.

This package is organized in two sets of helpers: 

* Core features: basic functions are in the core bundle.
  * get, set or a nested property
* Plugin features: other helpers that extand the core feautres.
  * copy or move a nested property in object to a nested destination in another object

### What does `new Doot(obj)` does ?

I wrote a class called `Doot` that wraps does helper functions. When creating a new instance of Doot with an object passed to its constructor, Doot will store this object and allow you to call any of the helpers and chain them to apply transformations to the object.

Example:
```js
new Doot(obj)
  .get('nested.prop')
  .set('deeper.prop', value) 
  .copy(...)
  // etc...
```

All helpers are attached to the Doot instance as methods. There are two properties of Doot you need to know:
  * `new Doot(obj).value` will contain the result of a previously called method. You can access this property when you are done manipulating the object and you want to collect the final result.
  * `new Doot(obj).chainValue` will always contain the object that need to be passed to the next method call. Its value may be the same as `.value` or may not.
  <br/>
  For example, after a call to `get`, value and chainValue will both contain the requested nested property, but with `set`, value will contain the return value of the set method and chainValue will contain the modified object.

The methods of the Doot instance behave like proxies to the helper functions. They all receive as first argument the value of `chainValue` so you just have to pass the rest of the parameters.

### Writing a plugin

The `Doot` class has a static method called `use` that takes a function and calls it with the Doot class as sole argument.

Here is a useless example of a plugin that gets a nested property and adds 1 to it:

```js
import { Doot, get } from 'doot-utils'

Doot.use(DootClass => {
  DootClass.prototype.aPlugin = function(arg) {
    this.value = get(this.chainValue, arg) + 1
    // you can change the value of `this.chainValue` for the next method in the chain

    // Do not forget to return `this` for the chain !
    return this
  }
})

// Then later
new Doot(obj).aPlugin('nested.prop')
```

If you want to author a plugin for Doot, please call it `doot-plugin-<pluginname>` so that others can find it easily.

## API

> TODO (base, copy, del, get, move, set, use)

## Licence

[MIT](https://github.com/nash403/doot-utils/blob/master/LICENSE)

Copyright (c) 2018-present @nash403
