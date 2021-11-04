const { LiteSpeedConfigParser } = require("./LiteSpeedConfigParser");

function createConfItem(node, conf) {
  conf[node.key] = {
    value: node.value,
    children: node.children || [],
  };
  for (const [i, child] of node.children.entries()) {
    createConfItem(child, conf[node.key].children[i]);
  }
  return conf;
}

function createConfFromSource(src) {
  const tree = new LiteSpeedConfigParser(src).parse();

  const conf = {};
  createConfItem(tree, conf);
  return conf;
}

module.exports = { createConfFromSource, createConfItem };
