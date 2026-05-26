import app from "./app";
import { logger } from "./lib/logger";

const port = Number(process.env.PORT || 8080);
const host = process.env.HOST ?? "0.0.0.0";

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

app.listen(port, host, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port, host }, "Server listening");
});