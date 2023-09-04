import os from "node:os";
import cluster from "node:cluster";
import { startApiServer, logger } from "./server";
import { setupCassandra } from "./datastore/cassandra";

const cpuCount = os.cpus().length;

await setupCassandra();

if (cluster.isPrimary) {
  logger.info(`Up ${cpuCount} workers`);
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  // NOTE: worker が落ちたら再起動する、ポートが空いてない場合などは無限ループする
  cluster.on("exit", (worker, code, signal) => {
    logger.warn(
      `Worker ${worker.process.pid} exit with code: ${code}, and signal: ${signal}`,
    );
    cluster.fork();
  });
} else {
  const clusterInfo = {
    pid: cluster.worker?.process.pid,
    workerId: cluster.worker?.id,
  };

  logger.info("Worker started", clusterInfo);

  await startApiServer().catch((error) => {
    logger.error("Failed to start api server", { error, clusterInfo });
    process.exit(1);
  });
}
