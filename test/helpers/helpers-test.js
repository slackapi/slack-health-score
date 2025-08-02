import { describe, expect, it } from 'vitest';
import {
  getAnnotations,
  parseYamlArray,
} from '../../src/helpers/helper-functions.js';

describe('helpers', () => {
  it('should have a parseYamlArray function', () => {
    expect(parseYamlArray).toBeTypeOf('function');
  });

  describe('array-parser', () => {
    it('should return an empty array for null input', () => {
      const result = parseYamlArray(null);
      expect(result).toEqual([]);
    });

    it('should return an empty array for undefined input', () => {
      const result = parseYamlArray(undefined);
      expect(result).toEqual([]);
    });

    it('should return an empty array for empty string input', () => {
      const result = parseYamlArray('');
      expect(result).toEqual([]);
    });

    it('should parse a valid JSON array string', () => {
      const input = '["src", "lib", "test"]';
      const result = parseYamlArray(input);
      expect(result).toEqual(['src', 'lib', 'test']);
    });

    it('should parse a flow style YAML array string', () => {
      const input = 'src, lib, test';
      const result = parseYamlArray(input);
      expect(result).toEqual(['src', 'lib', 'test']);
    });

    it('should parse a block style newline-separated YAML array string', () => {
      const input = `src
        lib
        test`;
      const result = parseYamlArray(input);
      expect(result).toEqual(['src', 'lib', 'test']);
    });

    it('should parse a block style YAML array string with hyphens', () => {
      const input = `- src
        - lib
        - test`;
      const result = parseYamlArray(input);
      expect(result).toEqual(['src', 'lib', 'test']);
    });

    it('should remove surrounding quotes from YAML array items', () => {
      const input = `- "src"
        - 'lib'
        - test`;
      const result = parseYamlArray(input);
      expect(result).toEqual(['src', 'lib', 'test']);
    });

    it('should handle a mix of JSON and YAML formats', () => {
      const input = '["src", "lib"], "test", "date"';
      const result = parseYamlArray(input);
      expect(result).toEqual(['src', 'lib', 'test', 'date']);
    });
  });

  it('should have a getAnnotation function', () => {
    expect(getAnnotations).toBeTypeOf('function');
  });

  describe('comment-annotations', () => {
    it('should handle empty find outputs', () => {
      const comments = [];
      expect(getAnnotations(comments)).toEqual([]);
    });

    it('should handle find outputs of different formats', () => {
      expect(
        getAnnotations([
          {
            path: 'path',
            line_no: 10,
            comment: '// TODO: random stuff',
            commentType: 'TODO',
          },
        ]),
      ).toEqual([
        {
          path: 'path',
          start_line: 10,
          end_line: 10,
          annotation_level: 'warning',
          message: 'Problematic comment ("TODO") identified',
        },
      ]);

      expect(
        getAnnotations([
          {
            path: 'path',
            line_no: 10,
            comment: '// FIXME: random stuff',
            commentType: 'FIXME',
          },
          {
            path: 'path2',
            line_no: 15,
            comment: '// random FIXME comment',
            commentType: null,
          },
        ]),
      ).toEqual([
        {
          path: 'path',
          start_line: 10,
          end_line: 10,
          annotation_level: 'warning',
          message: 'Problematic comment ("FIXME") identified',
        },
        {
          path: 'path2',
          start_line: 15,
          end_line: 15,
          annotation_level: 'warning',
          message: 'Problematic comment ("TODO", "HACK", "FIXME") identified',
        },
      ]);
    });

    it('should default to line 1 for outputs without line number', () => {
      expect(
        getAnnotations([
          {
            path: 'path',
            comment: '// TODO: random stuff',
            commentType: 'TODO',
          },
        ]),
      ).toEqual([
        {
          path: 'path',
          start_line: 1,
          end_line: 1,
          annotation_level: 'warning',
          message: 'Problematic comment ("TODO") identified',
        },
      ]);
    });
  });
});
