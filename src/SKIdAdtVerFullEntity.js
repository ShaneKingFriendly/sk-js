import SK from './SK';
import SKIdAdtVerEntity from './SKIdAdtVerEntity';

export default SK.extends(true, {}, SKIdAdtVerEntity, {
  createDatetime: undefined,
  createUserId: undefined,
  invalidDatetime: undefined,
  invalidUserId: undefined,
})
