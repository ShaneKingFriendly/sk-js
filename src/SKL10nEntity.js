import SK from './SK';
import SKEntity from './SKEntity';

export default SK.extends(true, {}, SKEntity, {
  createTimezone: undefined,
  invalidTimezone: undefined,
  lastModifyTimezone: undefined,
})
