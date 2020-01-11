import SK from './SK';
import SKIdEntity from './SKIdEntity';

export default SK.extends(true, {}, SKIdEntity, {
  invalid: undefined,
  modDateTime: undefined,
  modUserId: undefined,
})
