# conviva-js-imasdk
Conviva Google IMA SDK module auto-detects ad events emitted by Google IMA SDK.

## Offline Library
The Conviva JavaScript Google IMA SDK module is built on top of <a href="https://github.com/Conviva/conviva-js-coresdk">conviva-core-sdk</a>, is shared as offline library and should be included via the <script> tag in the application.

Via html:
``` 
<script type="text/javascript" src="<PATH>/conviva-core-sdk.js"></script>
<script type="text/javascript" src="<PATH>/conviva-googleima-module.js"></script>
```

## Install via npm 

```
npm install @convivainc/conviva-js-imasdk --save
```
  
## Install via yarn 

```
yarn add @convivainc/conviva-js-imasdk
```

Refer to following sample code to include Google IMA modules followed by Conviva modules.

Via import/require:
```
const Conviva = require('<path>/conviva-js-coresdk');
const ConvivaGoogleimaModule = require('<path>/conviva-js-imasdk');
```

```
import Conviva from '@convivainc/conviva-js-coresdk'
import ConvivaGoogleimaModule from'@convivainc/conviva-js-imasdk'
```

## Note:
* Refer https://community.conviva.com/ for integration guidelines.
