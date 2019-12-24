import SK from './SK';
import SKIdEntity from './SKIdEntity';

export default SK.extends(true, {}, SKIdEntity, {
  nodeDesc: undefined,
  nodeName: undefined,
  nodePath: undefined,
  nodeType: undefined,
  parentId: undefined,
});
