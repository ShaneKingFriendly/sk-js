import SK from './SK';
import SKEntity from './SKEntity';

export default SK.assign({}, SKEntity, {
  createTimeZone: undefined,
  lastModifyTimeZone: undefined,
  invalidTimeZone: undefined,
})
