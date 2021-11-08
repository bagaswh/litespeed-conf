module.exports.isObject = function isObject(thing) {
  return typeof thing === 'object' && !Array.isArray(thing) && thing !== null;
};
