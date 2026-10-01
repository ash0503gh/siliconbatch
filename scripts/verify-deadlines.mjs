import fs from 'node:fs';
import path from 'node:path';

const programsDir = path.resolve('src/content/programs');
const files = fs.readdirSync(programsDir).filter(f => f.endsWith('.md'));

console.log('----------------------------------------------------');
console.log('📡 SiliconBatch Deadline Verification Engine');
console.log(`Current System Time: ${new Date().toISOString()}`);
console.log('----------------------------------------------------');

const now = new Date();
let activeCount = 0;
let closedCount = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(programsDir, file), 'utf-8');
  const closingMatch = content.match(/closingDate:\s*"([^"]+)"/);
  const rollingMatch = content.match(/isRolling:\s*(true|false)/);
  const tickerMatch = content.match(/ticker:\s*"([^"]+)"/);
  const nameMatch = content.match(/name:\s*"([^"]+)"/);

  const ticker = tickerMatch ? tickerMatch[1] : file;
  const name = nameMatch ? nameMatch[1] : 'Unknown';
  const isRolling = rollingMatch ? rollingMatch[1] === 'true' : false;
  const closingDate = closingMatch ? new Date(closingMatch[1]) : null;

  if (isRolling) {
    console.log(`🟢 [ACTIVE - ROLLING] ${ticker.padEnd(10)} | ${name}`);
    activeCount++;
  } else if (closingDate && closingDate.getTime() >= now.getTime()) {
    const daysLeft = Math.ceil((closingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    console.log(`🟢 [ACTIVE - ${String(daysLeft).padStart(2)}d]    ${ticker.padEnd(10)} | ${name} (Closes: ${closingDate.toISOString().slice(0, 10)})`);
    activeCount++;
  } else {
    console.log(`🔴 [CLOSED - EXCLUDED] ${ticker.padEnd(10)} | ${name} (Closed: ${closingDate?.toISOString().slice(0, 10)})`);
    closedCount++;
  }
}

console.log('----------------------------------------------------');
console.log(`Summary: ${activeCount} programs open for applications, ${closedCount} expired programs filtered out.`);
console.log('----------------------------------------------------');
