import fs from 'fs';
import path from 'path';

const daysDir = './days';

// Ensure the "days" directory exists
if (!fs.existsSync(daysDir)) {
  fs.mkdirSync(daysDir);
}

for (let i = 2; i <= 25; i++) {
  const folderName = i.toString();
  const folderPath = path.join(daysDir, folderName);

  // Create the folder for the day
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Create inputs.js file
  const inputsContent = `export default {\n  lg: "",\n  sm: ""\n};\n`;
  fs.writeFileSync(path.join(folderPath, 'inputs.js'), inputsContent);

  // Create part1.js file
  const part1Content = `import inputs from './inputs.js';\n\n// Add your Part 1 solution here\n`;
  fs.writeFileSync(path.join(folderPath, 'part1.js'), part1Content);

  // Create part2.js file
  const part2Content = `import inputs from './inputs.js';\n\n// Add your Part 2 solution here\n`;
  fs.writeFileSync(path.join(folderPath, 'part2.js'), part2Content);
}

console.log('Folders and files created successfully!');
