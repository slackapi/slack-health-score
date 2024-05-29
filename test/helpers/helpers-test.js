const { assert } = require('chai');
const { getAnnotations, parseYamlArray } = require('../../src/helpers/helper-functions');

describe('helpers', () => {
  it('should have a parseYamlArray function', async () => {
    assert.ok(parseYamlArray);
  });
  describe('array-parser', () => {
    it('should return an empty array for null input', () => {
      const result = parseYamlArray(null);
      assert.deepEqual(result, []);
    });

    it('should return an empty array for undefined input', () => {
      const result = parseYamlArray(undefined);
      assert.deepEqual(result, []);
    });

    it('should return an empty array for empty string input', () => {
      const result = parseYamlArray('');
      assert.deepEqual(result, []);
    });

    it('should parse a valid JSON array string', () => {
      const input = '["src", "lib", "test"]';
      const result = parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test']);
    });

    it('should parse a flow style YAML array string', () => {
      const input = 'src, lib, test';
      const result = parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test']);
    });

    it('should parse a block style newline-separated YAML array string', () => {
      const input = `src
        lib
        test`;
      const result = parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test']);
    });

    it('should parse a block style YAML array string with hyphens', () => {
      const input = `- src
        - lib
        - test`;
      const result = parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test']);
    });

    it('should remove surrounding quotes from YAML array items', () => {
      const input = `- "src"
        - 'lib'
        - test`;
      const result = parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test']);
    });
    it('should handle a mix of JSON and YAML formats', () => {
      const input = '["src", "lib"], "test", "date"';
      const result = parseYamlArray(input);
      assert.deepEqual(result, ['src', 'lib', 'test', 'date']);
    });
  });
  it('should have a getAnnotation function', async () => {
    assert.ok(getAnnotations);
  });
  describe('comment-annotations', () => {
    it('should handle empty find outputs', async () => {
      const comments = [];
      assert.deepEqual(getAnnotations(comments), []);
    });
    it('should handle find outputs of different formats', async () => {
      assert.deepEqual(getAnnotations([{ path: 'path', line_no: 10, comment: '// TODO: random stuff' }]), [
        {
          path: 'path',
          start_line: 10,
          end_line: 10,
          annotation_level: 'warning',
          message: 'Problematic comment identified',
        },
      ]);
      assert.deepEqual(getAnnotations([
        { path: 'path', line_no: 10, comment: '// TODO: random stuff' },
        { path: 'path2', line_no: 15, comment: '// FIXME: random' }]), [
        {
          path: 'path',
          start_line: 10,
          end_line: 10,
          annotation_level: 'warning',
          message: 'Problematic comment identified',
        },
        {
          path: 'path2',
          start_line: 15,
          end_line: 15,
          annotation_level: 'warning',
          message: 'Problematic comment identified',
        },
      ]);
    });
    it('should default to line 1 for outputs without line number', async () => {
      assert.deepEqual(getAnnotations([{ path: 'path', comment: '// TODO: random stuff' }]), [
        {
          path: 'path',
          start_line: 1,
          end_line: 1,
          annotation_level: 'warning',
          message: 'Problematic comment identified',
        },
      ]);
    });
  });
});
