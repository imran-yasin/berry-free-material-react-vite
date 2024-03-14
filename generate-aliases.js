const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "src"); // Adjust 'src' if your source files are in a different directory

function generateAliases(dirPath) {
  let aliases = {};

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const aliasName = `@${file.toLowerCase()}`;
      aliases[aliasName] = fullPath;
    }
  }

  return aliases;
}

const aliases = generateAliases(srcPath);
console.log(aliases); // Optional: For debugging to see what aliases are generated

module.exports = aliases;
