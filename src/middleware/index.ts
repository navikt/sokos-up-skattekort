import { getToken, validateAzureToken } from "@navikt/oasis";
import { getServerSideEnvironment } from "@utils/environment";
import logger from "@utils/logger.ts";
import { defineMiddleware } from "astro/middleware";
import { isInternal } from "./utils";

export const onRequest = defineMiddleware(async (context, next) => {
  const token = getToken(context.request.headers);

  if (getServerSideEnvironment() === "local") {
    return next();
  }

  if (isInternal(context)) {
    return next();
  }

  if (!token) {
    return new Response(null, { status: 401 });
  }

  const validation = await validateAzureToken(token);

  if (!validation.ok) {
    const error = new Error(
      `Invalid JWT token found (cause: ${validation.errorType} ${validation.error}.`,
    );
    logger.error(error);
    return new Response(null, { status: 401 });
  }

  context.locals.token = token;

  return next();
});
