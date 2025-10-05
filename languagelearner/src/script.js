import { Translate } from '@google-cloud/translate/build/src/v2/index.js';

const translate = new Translate();
const [translation] = await translate.translate('hello', 'es');
console.log(translation);