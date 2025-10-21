import zod from "zod";
import { z } from "zod";

export const schema_send_request = z.object({
  friendID: z.string(), // ده مطلوب تلقائيًا
});
