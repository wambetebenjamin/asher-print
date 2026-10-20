import type { FieldErrors, Resolver } from "react-hook-form";
import type { ZodSchema } from "zod";

/**
 * Small hand written bridge between zod and react-hook-form.
 * The mandated stack has no @hookform/resolvers package, so this keeps
 * validation fully zod driven without adding a dependency.
 */
export function zodResolver<T extends Record<string, unknown>>(
  schema: ZodSchema<T>,
): Resolver<T> {
  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data as T, errors: {} };
    }
    const errors: FieldErrors<T> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (!path) continue;
      const keys = path.split(".");
      let target: Record<string, unknown> = errors as Record<string, unknown>;
      for (let i = 0; i < keys.length - 1; i += 1) {
        const key = keys[i];
        if (!target[key] || typeof target[key] !== "object") target[key] = {};
        target = target[key] as Record<string, unknown>;
      }
      const last = keys[keys.length - 1];
      if (!target[last]) {
        target[last] = { type: issue.code, message: issue.message };
      }
    }
    return { values: {}, errors };
  };
}
