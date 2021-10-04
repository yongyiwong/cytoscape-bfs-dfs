module.exports = {
  '**/*.{js,jsx,ts,tsx}': (files) => {
    const stagedFiles = files.join(' ')
    // Add remove un-used when pushing only a
    const rules = `--rule 'unused-imports/no-unused-imports-ts: 2'`

    return [
      `cross-env NODE_OPTIONS=--max-old-space-size=8192 eslint ${stagedFiles} ${rules} --fix`,
    ]
  },
}
