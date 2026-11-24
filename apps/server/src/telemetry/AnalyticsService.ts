import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

import type { TelemetryOwner } from "./Identify.ts";

export class AnalyticsService extends Context.Service<
  AnalyticsService,
  {
    /** Always false in this local telemetry-free build. */
    readonly record: (
      event: string,
      properties?: Readonly<Record<string, unknown>>,
    ) => Effect.Effect<boolean>;

    readonly flush: Effect.Effect<void>;

    readonly recordOwners: (
      owners: ReadonlyArray<TelemetryOwner>,
      observedBy: "server" | "client",
    ) => Effect.Effect<void>;
  }
>()("t3/telemetry/AnalyticsService") {}

const noopAnalytics = AnalyticsService.of({
  record: () => Effect.succeed(false),
  flush: Effect.void,
  recordOwners: () => Effect.void,
});

/** @public */
export const make = Effect.succeed(noopAnalytics);

export const layer = Layer.succeed(AnalyticsService, noopAnalytics);
