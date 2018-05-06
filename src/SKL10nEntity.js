import SK from './SK';
import SKEntity from './SKEntity';

export default SK.extends(true, {}, SKEntity, {
  createTimeZone: undefined,
  lastModifyTimeZone: undefined,
  invalidTimeZone: undefined,
})
