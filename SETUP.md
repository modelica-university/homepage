# Creating a static site using Next.js + TypeScript

## Introduction

My goal here is to document the steps required to create a static site rendered
using `next` and TypeScript. I'm specifically interested in a configuration that uses the
`export` functionality of `next` to produce what is basically a static,
server-side rendered web site that integrates dynamic functionality once loaded.

## TL;DR

```
$ npm init
$ yarn add next react react-dom
$ yarn add @zeit/next-typescript @zeit-css
$ yarn add -D typescript @types/react @types/react-dom
$ yarn add -D serve
```

and `next.config.js` should contain:

```
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");

module.exports = withTypescript(withCSS());
```

and `.babelrc` must include:

```
{
    "presets": ["next/babel", "@zeit/next-typescript/babel"]
}
```

Create your first page in `pages/index.tsx`.

You can use Netlify to deploy if you:

-   Associate the GitHub repository with a site,
-   Set the `base` directory to `.`
-   Use `yarn build && yarn export` as the `build` command
-   Specify `out` as the `publish` directory.

## Installation

First, initialize your current directory as an `npm` package:

```
$ npm init
...
```

Next, we follow the [How to use](https://nextjs.org/docs/) instructions and
add `next`, `react` and `react-dom`.

```
$ yarn add next react react-dom
```

Now, I want to have access to the new hooks API in React, so I'm actually
running this specific command:

```
$ yarn add next react@next react-dom@next
```

...which will install `react@16.7.0-alpha.2` and `react-dom@16.7.0-alpha.2`.

Since we want to use TypeScript, we need to add a few more dependencies:

```
$ yarn add @zeit/next-typescript @zeit-css
$ yarn add -D typescript @types/react @types/react-dom
```

The `next` docs further suggest that we add the following to our `package.json`:

```json
{
  ...
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "export": "next export"
  }
}
```

In order to use TypeScript, we need to create the following (initial)
`next.config.js` file:

```javascript
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");

module.exports = withTypescript(withCSS());
```

It is also necessary to tell `babel` what is going on, apparently. So you need
to set your `.babelrc` file to be:

```
{
    "presets": ["next/babel", "@zeit/next-typescript/babel"]
}
```

Otherwise, your `.ts` and `.tsx` files will be used but won't really be properly
processed by `babel` leading to all kind of strange error messages.

## Initial Content

We are now ready to create our first "page". We start by creating a directory
called `pages` which will hold the React components used to render **pages**.
In other words, these React components are expected to render the entire page.

Let's start by creating a file called `./pages/index.tsx` the contains:

```javascript
import React from "react";
import { useState } from "react";

export default () => {
    const [on, setOn] = useState(false);
    return (
        <div>
            <button onClick={() => setOn(!on)}>{on ? "On" : "Off"}</button>
        </div>
    );
};
```

With this in place, we can simply run `yarn dev` and we'll get a page we can
open at [http://localhost:3000](http://localhost:3000). If we've done
everything correctly we should be able to use the React Hooks API and we should
get a basic functioning web application.

## Static Content

Using `yarn dev` doesn't get us what we really want which is a static web site.
To ensure that the static site generation portion is working, we must **first**
run `yarn build`. This compiles the client and server for us. Then we can run
`yarn export` which will produce a static site in the `out` directory (be sure
to add `out` and `.next` to your `.gitignore` file, BTW).

To test whether the static export is working, we can fire up a basic web server
and point it at our `out` directory. I tend to use `serve` which we can install
easily with the command:

```
$ yarn add -D serve
```

Once installed, we can serve the static site with:

```
$ npx serve -p 3001 out
```

Pointing our browser to [http://localhost:3001](http://localhost:30001) we
should see exactly the same site as we did when we ran `yarn dev`. Only this
time the site can be served by an ordinary web server without the need for
`next` to be installed at all.

## Deployment

You can use Netlify to easily deploy a site. All you need to do is sign up for
Netlify and then create a new deployment site that is tied to the GitHub
repository. While you can drop a `netlify.toml` file into your project, you can
also simply set the following parameters in your "Build & deploy > Continuous
Deployment > Build settings":

-   **Base directory**: `.`
-   **Build command**: `yarn build && yarn export`
-   **Publish directory**: `./out`

There are plenty of other configuration options. But this will get it going.

## Component Models

## Routes

## Initial Props

## CSS Framework

## Conclusion
