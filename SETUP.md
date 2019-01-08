# Creating a static site using Next.js + TypeScript

## Introduction

The Javascript world is full of amazing tools, frameworks, libraries, _etc._.
However, it takes time to work through all the "kinks" when integrating
technologies together. Whenever I do something fairly involved I like to do a
write up for my future self so I can avoid all the twists and turns the second
time around and even include some wisdom or lessons learned for my future self.

This document is just another in my frequent correspondence with my future self.
My goal here is to document the steps required to create a static site rendered
using `next` and TypeScript. I'm specifically interested in a configuration that uses the
`export` functionality of `next` to produce what is basically a static,
server-side rendered web site that integrates dynamic functionality once loaded.
If that interests you as well, read on.

## TL;DR

Future self wants this whole document as a reference. But he also wants to get
moving quickly without having to read all the blah-dee-blah-blah. So here is
the super condensed version:

```
$ npm init
$ yarn add next react react-dom @zeit/next-typescript @zeit/next-css
$ yarn add -D typescript @types/react @types/react-dom @types/next serve webpack @babel/core
```

and `next.config.js` should contain:

```
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");

module.exports = withTypescript(withCSS());
```

add this to your `package.json`:

```json
{
  ...
  "scripts": {
    "dev": "next",
    "build": "NODE_ENV=production next build",
    "start": "next start",
    "export": "next export"
  }
}
```

and, finally, `.babelrc` must include:

```
{
    "presets": ["next/babel", "@zeit/next-typescript/babel"]
}
```

Create your first page in `pages/index.tsx`.

You can use Netlify to deploy if you:

-   Associate the GitHub repository with a Netlify site,
-   Set the `base` directory to `.`
-   Use `yarn build && yarn export` as the `build` command
-   Specify `out` as the `publish` directory.

## Installation

Now if you really want to know all the gory details, let's start with the installation.
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
running this specific command but it probably won't be necessary in the near future:

```
$ yarn add next react@next react-dom@next
```

...which will install `react@16.7.0-alpha.2` and `react-dom@16.7.0-alpha.2`.

Since we want to use TypeScript, we need to add a few more dependencies:

```
$ yarn add @zeit/next-typescript @zeit/next-css
$ yarn add -D typescript @types/react @types/react-dom @types/next
```

Although not strictly necessary, as far as I can tell, you should also do the
following to avoid lots of complaints from `yarn` about missing peer dependencies:

```
$ yarn add webpack @babel/core
```

The `next` docs further suggest that we add the following to our `package.json`:

```json
{
  ...
  "scripts": {
    "dev": "next",
    "build": "NODE_ENV=production next build",
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

The documentation for `@zeit/next-typescript` says to include the following in
your `tsconfig.json` but so far I haven't needed it (defaults seem to be working
fine):

```json
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "preserve",
    "lib": ["dom", "es2017"],
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "preserveConstEnums": true,
    "removeComments": false,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "target": "esnext"
  }
}
```

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

As mentioned perviously, the React components in the `pages` directory used to
render the page associated with each route. However, if you want to have other
React components you can create a separate sibling directory called `components`
and keep them there. Then you can add an `index.ts` file there that exports all the
various components in the `components` directory and then import them with:

```javascript
import { MyComponent } from "../components";
```

There are a million other ways you could organize your code. None of this is
strictly required. But I do find it useful to keep the components away from the
pages since they work very differently (in terms of how props are handled).

## Routes

The goal here is to create a static site. As such, we can't rely on the server
to generate pages as they are requested. Instead, we need to provide an
exhaustive list (or map in this case) of pages to include in our site. This
list can be added to `next.config.js` as follows:

```
module.exports = withTypescript(
    withCSS({
        exportPathMap: async defaultPathMap => {
            return {
                "/": { page: "/index", query: { lang: "English" } },
                "/fr": { page: "/index", query: { lang: "French" } },
            };
        },
    }),
);
```

In this case, we map the page at `/` to use the `default` exported component
from `pages/index.tsx`. We also map the page `/fr` to also use the same
`default` exported component in `pages/index.tsx`. Now there normally isn't much sense
is rendering each of these pages identically. That is where the `query`
argument comes in. It gets passed into the components when they are rendered.
Remember that we are focusing on **static export** so we don't want a server
involved. As such, it is simplest to pass the data directly to the page in the
form of a query string. But there is an important caveat here and that is that
this is a query **string**. As such, the value for `query` will be stringified
and reparsed.

**N.B. - If the data you are passing via `query` cannot be serialized and
deserialized, then you will have problems.**

That leaves the question of how do we use these query values? That is the topic
of the next section.

## Initial Props

In order to extract data from the `query` field, you need to define a
`getInitialProps` method on the page component. More importantly, this method
needs to be **`static`**. Here is an example of extracting the `lang` field
from `query` and adding it to the set of props passed to the page component:

```typescript
import React from "react";
import { useState } from "react";
import { Item } from "../components";

interface IndexProps {
    language: string;
}

const Index = (props: IndexProps) => {
    const [on, setOn] = useState(false);
    return (
        <div>
            <h1>{props.language}</h1>
            <Item />
            <button onClick={() => setOn(!on)}>{on ? "On" : "Off"}</button>
        </div>
    );
};

Index.getInitialProps = async ({ query }) => {
    return { language: query.lang };
};

export default Index;
```

This is for a functional React component, but the same can easily be done for a
`class` based component as well. Note that `getInitialProps` is `async` so you
can fetch data from external data sources, URLs, _etc._

Also, note the use of types here. This is super useful because your components
get type checked. Since `getInitialProps` is where we deserialize untyped data,
this is the best place to adding type annotations because they will propagate
down from here and we'll get static type checking of all our rendering from here
on out.

## CSS Framework

I'm quite fond of [Blueprint](https://blueprintjs.com/) although this
potentially applies to a range of different CSS frameworks. Adding Blueprint as
a dependency is trivial:

```
$ yarn add @blueprintjs/core
```

With that, you can import everything from Blueprint and it should work just fine
in terms of bundling, _etc._ since Blueprint fully supports server-side
rendering. The issue you may run into, however, is with the client-side CSS.
Adding Blueprint as a dependency means that its Javascript code will get
bundled. But it doesn't ensure that its CSS will make it there too.

There are two ways you can add the CSS for Blueprint. The first is to extend
the definition of `Document` (defined in `pages/_document.tsx`) and links to stylesheets served by a CDN, _e.g.,_

```typescript
import React from "react";
import Document, { Head, Main, NextScript, NextDocumentContext, DefaultDocumentIProps } from "next/document";

export default class MyDocument extends Document<{}> {
    render() {
        return (
            <html>
                <Head>
                    <link href="https://unpkg.com/normalize.css@^7.0.0" rel="stylesheet" />
                    <link href="https://unpkg.com/@blueprintjs/core@^3.0.0/lib/css/blueprint.css" rel="stylesheet" />
                    <link
                        href="https://unpkg.com/@blueprintjs/icons@^3.0.0/lib/css/blueprint-icons.css"
                        rel="stylesheet"
                    />
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
```

This has the advantage that it doesn't add the CSS to your bundle. Presumably
the CDN will do an excellent job of serving these files from anywhere in the
world. Furthermore, you don't pay the cost, in terms of time, during
compilation for bundling these files as well.

One downside is that if you are not connected to the internet you cannot access
the CDN and the styling will be messed up. Another complication would be that
you have your own local styles that you would like to inject and you want them
bundled. In these cases, you can override the `App` class instead:

```typescript
import React from "react";
import App, { Container } from "next/app";

import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "./my_styles.css";

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}
```

**N.B.** In the case of Blueprint, the icons do not "bundle well". So you can even mix
the two styles and include everything except the icons in the custom `App` (so
it will be bundled) and include the icons in the `Document` so that all the CSS
loading gets done properly for those.

## Conclusion

So that's what I learned trying to build a static site with Next.js and
TypeScript. I have plans to build a couple of sites in the near future so I
wanted to make sure that I could hit the ground running with each new site and
not have to wade through the various missteps each time. Hopefully other people
will find this useful.

It is worth pointing out that there is at least one starterkit out there that
includes lots of additional bits like PostCSS, testing, etc. You can find that
here:

https://github.com/deptno/next.js-typescript-starter-kit
