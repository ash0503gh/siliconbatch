import { spawn } from 'node:child_process';

const port = process.env.PORT || '10000';
const host = '0.0.0.0';

console.log(`Starting SiliconBatch production server on http://${host}:${port}...`);

const child = spawn('npx', ['astro', 'preview', '--host', host, '--port', String(port)], {
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
