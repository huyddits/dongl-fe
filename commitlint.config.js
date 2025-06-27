module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-case': [2, 'always', 'lower-case'],
      'type-empty': [2, 'never'],
      'type-enum': [
        2,
        'always',
        [
          'feat',
          'fix',
          'docs',
          'style',
          'refactor',
          'perf',
          'test',
          'chore',
          'ci',
          'build',
          'revert',
          'wip',
          'hotfix',
          'release',
          'deps',
          'config',
          'ui',
          'init',
          'security'
        ]
      ],
      'subject-case': [2, 'always', 'sentence-case'],
      'subject-empty': [2, 'never'],
      'subject-full-stop': [2, 'never', '.'],
      'subject-max-length': [2, 'always', 72],
      'header-max-length': [2, 'always', 100],
      'body-leading-blank': [1, 'always'],
      'footer-leading-blank': [1, 'always'],
      'body-max-line-length': [2, 'always', 100],
      'footer-max-line-length': [2, 'always', 100],
      'scope-case': [2, 'always', 'kebab-case']
    }
  }