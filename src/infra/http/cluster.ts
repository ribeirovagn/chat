// src/cluster.ts

import cluster from 'cluster';
import os from 'os';
import { createServer } from './server'; // Importa o servidor Express

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Cria um worker por núcleo disponível
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Starting a new worker...');
    cluster.fork(); // Recria o worker quando ele morre
  });
} else {
  // Workers executam o servidor
  createServer();

  console.log(`Worker ${process.pid} started`);
}