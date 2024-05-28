module.exports = {
  /**
  *
  * @param input
  * @returns []
  */
  parseYamlArray(input) {
    if (!input) {
      return [];
    }
    const arr = input.trim().replace(/\[|\]/g, '');

    return arr
      .split(/,\s*|\n/)
      .map((item) => item.trim().replace(/^- */, ''))
      .filter(Boolean)
      .map((item) => {
        if ((item.startsWith('"') && item.endsWith('"')) || (item.startsWith("'") && item.endsWith("'"))) {
          return item.slice(1, -1);
        }
        return item;
      });
  },
};
