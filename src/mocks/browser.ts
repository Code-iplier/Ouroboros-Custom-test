import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { env } from "@/config/env";

const workerUrl = `${env.BASE_PATH}mockServiceWorker.js`;

export const worker = setupWorker(...handlers);

export function startWorker() {
  return worker.start({
    serviceWorker: {
      url: workerUrl,
    },
    onUnhandledRequest: "bypass",
  });
}
