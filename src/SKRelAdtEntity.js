import SK from './SK';
import SKIdAdtEntity from './SKIdAdtEntity';

export default SK.extends(true, {}, SKIdAdtEntity, {
  invalid: undefined,
  ivdDateTime: undefined,
  ivdUserId: undefined,
});
