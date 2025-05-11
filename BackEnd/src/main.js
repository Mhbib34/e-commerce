import { app } from "./config/app.js";
import { logger } from "./config/logging.js";

app.listen(3000, () => {
  logger.info("App Start!");
});
