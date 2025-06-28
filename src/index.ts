import { startIndexer } from "./services/chainSubscriber";
import("./api/server");    // fire up API
startIndexer().catch(console.error);
