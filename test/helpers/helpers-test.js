const { assert } = require('chai');
const arrayParser = require('../../src/helpers/array-parser');

describe('array-parser', () => {
  it('should have a parseYamlArray function', async () => {
    assert.ok(arrayParser.parseYamlArray);
  });
  describe('check: inputs', () => {
    it('should return an empty array for null input', () => {
      const result = arrayParser.parseYamlArray(null);
      assert.deepEqual(result, []);
    });

    it('should return an empty array for undefined input', () => {
      const result = arrayParser.parseYamlArray(undefined);
      assert.deepEqual(result, []);
    });

    it('should return an empty array for empty string input', () => {
      const result = arrayParser.parseYamlArray('');
      assert.deepEqual(result, []);
    });

    it('should parse a valid JSON array string', () => {
      const input = '["src", "lib", "test"]';
      const result = arrayParser.parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test']);
    });

    it('should parse a flow style YAML array string', () => {
      const input = 'src, lib, test';
      const result = arrayParser.parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test']);
    });

    it('should parse a block style newline-separated YAML array string', () => {
      const input = `src
        lib
        test`;
      const result = arrayParser.parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test']);
    });

    it('should parse a block style YAML array string with hyphens', () => {
      const input = `- src
        - lib
        - test`;
      const result = arrayParser.parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test']);
    });

    it('should remove surrounding quotes from YAML array items', () => {
      const input = `- "src"
        - 'lib'
        - test`;
      const result = arrayParser.parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test']);
    });
    it('should handle a mix of JSON and YAML formats', () => {
      const input = '["src", "lib"], "test", "date"';
      const result = arrayParser.parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test', 'date']);
    });
  });
});
