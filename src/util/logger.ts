import pino from "pino-http";

const logger = pino({
  timestamp: () => `"time:"${new Date().toISOString()}"`,
}).logger;

export default logger;
