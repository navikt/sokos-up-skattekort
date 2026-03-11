import { z } from "zod";
import { HentNavnResponseSchema } from "./HentNavnResponse";
import { SkattekortResponseDTOSchema } from "./SkattekortResponseDTOSchema";

export const WrappedHentNavnResponseWithErrorSchema = z.object({
	errorMessage: z.string().refine((s) => s.length > 0),
	data: z.optional(z.array(HentNavnResponseSchema)),
});

export type WrappedHentNavnResponseWithError = z.infer<
	typeof WrappedHentNavnResponseWithErrorSchema
>;

export const WrappedSkattekortResponseDTOWithErrorSchema = z.object({
	errorMessage: z.string().refine((s) => s.length > 0),
	data: z.optional(z.array(SkattekortResponseDTOSchema)),
});

export type WrappedSkattekortResponseDTOWithError = z.infer<
	typeof WrappedSkattekortResponseDTOWithErrorSchema
>;
