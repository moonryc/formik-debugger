import type { BaseSyntheticEvent, SyntheticEvent } from "react";

type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

export type ClonedEvent = Mutable<BaseSyntheticEvent<object, unknown, unknown>> & {
    currentTarget: unknown;
    target: {
        name?: string;
        value?: unknown;
    };
};

/**
 * Creates a more bare-bones mutable event.
 * AutoCompleteSingleSelectOnSelect
 * If a value was not "cloned" when event was spread into the return feel free
 * to add it
 * @param event
 */
const cloneEvent = <T = Element, E extends Event = Event>(event: SyntheticEvent<T, E>): ClonedEvent => {
    const targetElement = event.target as T & EventTarget & ClonedEvent["target"];

    return {
        ...event,
        currentTarget: {
            ...event?.currentTarget,
        },
        target: {
            ...event?.target,
            name: targetElement?.name ?? "",
            value: targetElement?.value ?? undefined,
        },
    };
};

export default cloneEvent;
