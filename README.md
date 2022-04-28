![npm](https://img.shields.io/npm/dw/get-that-video)
![NPM](https://img.shields.io/npm/l/get-that-video)
![GitHub Repo stars](https://img.shields.io/github/stars/z3oxs/get-that-video?style=social)
![GitHub issues](https://img.shields.io/github/issues/z3oxs/get-that-video)

&nbsp;
A module to fetch information and videos from some platforms.

&nbsp;
# 🪛 Supported platforms
- Twitter
- Rumble
- Facebook

&nbsp;
_**If you want to contribute sending an idea or implementing a new platform handler, create a issue or a pull-request**_

&nbsp;
# 📃 Usage/Documentation

[Setup](#-setup)<br>
[Valid methods](#-valid-methods)

&nbsp;
## 🔧 Setup
Install the package with `npm install get-that-video` or `yarn add get-that-video`.

All valid packages will do allusion to the platform name, like 'twitter'.

So, let's start making a simple script.

```js
import { twitter } from 'get-that-video';
// If using standard NodeJS
// const { twitter } = require('get-that-video');

async function getTwitterVideo(url) {
  // All 'get' returns will be a Object or a Array of Objects
  const formats = await twitter.getVideo('Some twitter status URL');

  console.log(formats[0].url); // Will return the URL of the first format in the array
}

getTwitterVideo();

// You can easily implement inside any project :).
```

&nbsp;
# 📎 Valid methods
## twitter
#### **getVideo** | Array of Objects
Will fetch only video formats.

#### **getInfo** | Object
Will fetch a complete request, including user information and tweet information.

> Properties:
- user: Object
- tweet: Object

&nbsp;
## rumble
#### **getVideo** | Object
Will fetch a complete request, including information and formats.

&nbsp;
## facebook
#### getVideo | Array of Objects
Will fetch only video formats.

#### getInfo | Object
Will fetch a complete request, including the title, author and formats information.

> Properties:
- title: String
- author: Object
- formats: Array of Objects
