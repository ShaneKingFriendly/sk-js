import SK from './SK';
import SKIdAdtVerFullEntity from './SKIdAdtVerFullEntity';

export default SK.extends(true, {}, SKIdAdtVerFullEntity, {
  createTimezone: undefined,
  invalidTimezone: undefined,
  lastModifyTimezone: undefined,
})
