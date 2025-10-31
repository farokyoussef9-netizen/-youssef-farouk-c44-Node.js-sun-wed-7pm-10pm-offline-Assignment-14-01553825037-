import zod from "zod";

export const postSchema=zod.object({
    _id:zod.string(),
})