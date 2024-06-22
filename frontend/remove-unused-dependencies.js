const { execSync } = require('child_process');
const depcheck = require('depcheck');

// Options for depcheck
const options = {
  ignorePatterns: [
    // Ignore patterns (e.g., files or directories to ignore)
  ],
  ignoreMatches: [
    // Ignore dependencies by name
  ]
};

// Run depcheck to get unused dependencies
depcheck(process.cwd(), options, (unused) => {
  const unusedDependencies = unused.dependencies;
  if (unusedDependencies.length === 0) {
    console.log('No unused dependencies found.');
    return;
  }

  console.log('Unused dependencies found:', unusedDependencies);

  // Uninstall each unused dependency
  unusedDependencies.forEach(dep => {
    console.log(`Uninstalling ${dep}...`);
    execSync(`npm uninstall ${dep}`, { stdio: 'inherit' });
  });

  console.log('Unused dependencies have been uninstalled.');
});
