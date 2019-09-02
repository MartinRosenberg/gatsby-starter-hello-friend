module.exports = {
  overrides: [
    {
      files: '*.{css,scss}',
      options: {
        parser: 'css',
      },
    },
    {
      files: '*.html',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
      },
    },
  ],
  parser: 'babel',
  printWidth: 80,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
}
