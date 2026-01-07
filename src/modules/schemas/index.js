import responses from "../../helpers/responses.js";

/**
 *
 * @param {import("zod/v4/core").$ZodIssueInvalidType} iss
 */
export default function handleErrorZod(iss, field, type = null) {
  if (iss.input === undefined) {
    return responses.fieldRequired(field);
  } else {
    return responses.invalidField(field, type);
  }
}
