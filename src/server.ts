import 'zone.js/node';
import bootstrap from './main.server';

async function run(): Promise<void> {
  const port = process.env['PORT'] || 4000;

  // Arranca la aplicación Angular en modo SSR
  await bootstrap({} as any);

  console.log(`✅ Angular SSR server listening on http://localhost:${port}`);
}

run();
