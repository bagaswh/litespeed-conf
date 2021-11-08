module.exports.isObject = function isObject(thing) {
  return typeof thing === 'object' && !Array.isArray(thing) && thing !== null;
};

module.exports.toArray = function toArray(thing) {
  if (Array.isArray(thing)) {
    return thing;
  }
  return [thing];
};
