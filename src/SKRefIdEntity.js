import SK from './SK';
import SKIdEntity from './SKIdEntity';

export default SK.extends(true, {}, SKIdEntity, {
  refId: undefined,
  refType: undefined,
});
