'use strict';
exports.__esModule = true;
var ts_morph_1 = require('ts-morph');
// Set up a new project
var project = new ts_morph_1.Project();

// Define the target directory and file pattern
var targetDirectory = './packages/react-components/';
var filePattern = /^use.*styles\.ts$/;
// Counter to keep track of token replacements
var counter = 1;
// This function returns a string that can be evaluated as JavaScript
function generateReplacement(fileName, originalToken) {
  const baseTokenName = fileName
    .replace('use', '') // Remove the 'use' prefix
    .replace('Styles.styles.ts', '') // Remove the 'Styles.styles.ts' suffix
    .replace(/([A-Z])/g, ' $1') // Add space before any uppercase letter
    .trim() // Remove any leading/trailing spaces
    .split(' ') // Split by space to get words
    .join('');

  const ctrlTokenBase = `var(--ctrl-token-${baseTokenName}-${counter}`;
  const semanticTokenBase = `var(--semantic-token-${baseTokenName}-${counter + 1}`;

  // Use template literals and return a JavaScript expression
  return `\`${ctrlTokenBase}, ${semanticTokenBase}, \${${originalToken}}))\``;
}

// Load all the files from the target directory recursively
project.addSourceFilesAtPaths(targetDirectory + '**/*.ts');
var files = project.getSourceFiles().filter(function (file) {
  return filePattern.test(file.getBaseName());
});

files.forEach(function (file) {
  if (filePattern.test(file.getBaseName())) {
    // Process each file that matches the pattern
    file.forEachDescendant(function (node) {
      if (node.getKind() === ts_morph_1.SyntaxKind.PropertyAssignment) {
        // Check if the property assignment is related to styling and uses a token
        var initializer = node.getInitializer();
        var propertyName = node.getName();
        if (initializer && propertyName) {
          const text = initializer.getText();

          // More specific check for the tokens you want to replace
          const tokenMatch = text.match(/tokens\.(\w+)\b/);

          // Makes sure not to match a block (':focus': { ... token ...})
          if (tokenMatch && tokenMatch[0] === tokenMatch.input) {
            // Replace the token usage with the new format
            var newTokenUsage = generateReplacement(file.getBaseName(), text);
            initializer.replaceWithText(newTokenUsage);
            counter += 2; // Ensure counter increments properly for each replacement
          }
        }
      }
    });
    // Save the changes to the file
    file.saveSync();
  }
});

console.log('Codemod execution completed.');
