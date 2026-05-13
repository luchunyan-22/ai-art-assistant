const { execSync } = require('child_process');
const path = require('path');

const projectDir = 'C:\\Users\\28111\\WorkBuddy\\AI绘画助手';
const nodeBin = 'C:\\Users\\28111\\.workbuddy\\binaries\\node\\versions\\22.12.0\\node.exe';

console.log('Node version:');
try {
  execSync(`"${nodeBin}" --version`, { stdio: 'inherit' });
} catch(e) {}

// Check if npm is bundled
console.log('\nChecking npm...');
try {
  const result = execSync(`"${nodeBin}" -e "console.log(process.execPath)"`, { encoding: 'utf8' });
  console.log('Node exec path:', result);
} catch(e) {
  console.log('Error:', e.message);
}

// Try using npm bundled with node
const npmCli = path.join(path.dirname(process.execPath || ''), 'npm', 'bin', 'npm-cli.js');
console.log('\nTrying npm-cli.js directly...');
try {
  const result = execSync(`"${nodeBin}" "${npmCli}" --version`, { encoding: 'utf8' });
  console.log('npm version:', result);
} catch(e) {
  console.log('Not found at that path:', e.message);
}
