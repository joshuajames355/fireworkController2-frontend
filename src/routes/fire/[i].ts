"use server";

import type { APIEvent } from "@solidjs/start/server";
import { fireChannel } from "~/api/launcher";

export async function GET(event: APIEvent) {
  const channel = parseInt(event.params.i);

  if (Number.isNaN(channel)) {
    console.log(`Cannot fire invalid channel ${channel}`);
    return;
  }

  console.log(`firing ${channel}`);
  fireChannel(channel);
}
