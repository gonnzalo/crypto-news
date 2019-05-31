import { PubSub } from "apollo-server";

import * as COMMENT_EVENTS from "./comment";

export const EVENTS = {
  COMMENT: COMMENT_EVENTS
};

export default new PubSub();
