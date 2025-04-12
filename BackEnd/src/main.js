import { app } from "./app/app.js";
import { logger } from "./app/logging.js";

app.listen(3000, () => {
  logger.info("App Start!");
});
