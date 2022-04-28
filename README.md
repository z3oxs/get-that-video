# ✅ get-that-video
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

[Setup](#setup)
[Valid methods](#methods)

&nbsp;
<a name="#setup"></a>
## 🔧 Setup
Install the package with `npm install get-that-video` or `yarn add get-that-video`.

All valid packages will do allusion to the platform name with the first letter in uppercase, like 'Twitter'.

So, let's start making a simple script.

```js
// If using ES Modules
import { Twitter } from 'get-that-video';

// If using standard NodeJS
const { Twitter } = require('get-that-video');

async function getTwitterVideo(url) {
  // All 'get' returns will be a Object or a Array of Objects
  const formats = await Twitter.getVideo('Some twitter status URL');

  console.log(formats[0].url); // Will return the URL of the first format in the array
}

// You can easily implement inside any project :).
```

&nbsp;
<a name="#methods"></a>
# 📎 Valid methods
## Twitter
#### **getVideo** | Array of Objects
Will fetch only video formats.

#### **getInfo** | Object
Will fetch a complete request, including user information and tweet information.

Properties:
- user: Object
- tweet: Object

&nbsp;
## Rumble
#### **getVideo** | Object
Will fetch a complete request, including information and formats.

&nbsp;
## Facebook
#### getVideo | Array of Objects
Will fetch only video formats.

#### getInfo | Object
Will fetch a complete request, including the title, author and formats information.

Properties:
title: String
author: Object
formats: Array of Objects
