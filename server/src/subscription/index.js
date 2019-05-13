import { PubSub } from "apollo-server";

import * as COMMENT_EVENTS from "./comment";
import * as LIKE_EVENTS from "./like";

export const EVENTS = {
  COMMENT: COMMENT_EVENTS,
  LIKE: LIKE_EVENTS
};

export default new PubSub();
