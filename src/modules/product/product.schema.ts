import { z } from "zod";

export const ProductSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Product name must be at least 3 characters long" })
        .max(255, { message: "Product name cannot exceed 255 characters" })
        .trim(),

    legacy_name: z
        .string()
        .trim()
        .max(100, { message: "Legacy name cannot exceed 100 characters" })
        .optional()
        .nullable(),

    density: z
        .number()
        .min(0.8, { message: "Density must be at least 0.8 g/cm³" })
        .max(2.0, { message: "Density cannot exceed 2.0 g/cm³" }),

    melt_index: z
        .number()
        .min(0.1, { message: "Melt index must be at least 0.1 g/10 min" })
        .max(100, { message: "Melt index cannot exceed 100 g/10 min" }),

    country_id: z
        .number()
        .int()
        .positive({ message: "Country ID must be a positive integer" }),

    organization_id: z
        .number()
        .int()
        .positive({ message: "Organization ID must be a positive integer" }),
});

export type ProductType = z.infer<typeof ProductSchema>;
