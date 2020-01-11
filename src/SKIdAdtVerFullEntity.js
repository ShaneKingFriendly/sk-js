import SK from './SK';
import SKIdAdtVerEntity from './SKIdAdtVerEntity';

export default SK.extends(true, {}, SKIdAdtVerEntity, {
  crtDateTime: undefined,
  crtUserId: undefined,
  ivdDateTime: undefined,
  ivdUserId: undefined,
})
