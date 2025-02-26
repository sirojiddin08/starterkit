import { Router, Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { ProductSchema } from "./product.schema";
import { ApiResponse } from "../../types";
import { formatError } from "../../utils/index";

const prisma = new PrismaClient();
const router = Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/products";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.get("/", async (req: Request, res: any, next: NextFunction) => {
    /*  #swagger.tags = ['Products']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    try {
        const products = await prisma.products.findMany({
            include: {
                countries: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        currency: true,
                        phone_code: true,
                    },
                },
                organizations: {
                    select: {
                        id: true,
                        name: true,
                        industry: true,
                        registration_number: true,
                    },
                },
            },
        });

        // Convert Prisma Decimal fields to Numbers
        const formattedProducts = products.map((product) => ({
            ...product,
            density: product.density ? Number(product.density) : null,
            melt_index: product.melt_index ? Number(product.melt_index) : null,
        }));

        return res.json({
            success: true,
            statusCode: 200,
            message: "Products retrieved successfully",
            data: formattedProducts,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        if (error instanceof Error) {
            return next(createError.BadRequest(error.message));
        } else {
            return next(createError.BadRequest());
        }
    }
});

router.get("/:id", async (req: Request, res: any, next: NextFunction) => {
    /*  #swagger.tags = ['Products']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'integer',
            description: 'ID of the product to retrieve'
        }
    */
    try {
        const { id } = req.params;
        const numericId = parseInt(id, 10);
        
        if (isNaN(numericId)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                error: "Invalid product ID",
                timestamp: new Date().toISOString(),
            });
        }

        // Fetch product with related foreign key data (Country & Organization)
        const product = await prisma.products.findUnique({
            where: { id: numericId },
            include: {
                countries: {
                    select: { name: true }, // Fetch country name
                },
                organizations: {
                    select: { name: true }, // Fetch organization name
                },
            },
        });

        if (!product) {
            return next(createError.NotFound("Product not found"));
        }

        const formattedProduct = {
            ...product,
            density: product.density ? Number(product.density) : null,
            melt_index: product.melt_index ? Number(product.melt_index) : null,
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Product retrieved successfully",
            data: formattedProduct,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        if (error instanceof Error) {
            return next(createError.BadRequest(error.message));
        } else {
            return next(createError.BadRequest());
        }
    }
});

router.post("/", upload.single("pdf_file"), async (req: Request, res: any, next: NextFunction) => {
    /*  #swagger.tags = ['Products']
        #swagger.consumes = ['form-data']
        #swagger.parameters['name'] = {
            in: 'formData',
            required: true,
            type: 'string',
            description: 'Name of the product (min 3, max 255 characters).'
        }
        #swagger.parameters['legacy_name'] = {
            in: 'formData',
            required: false,
            type: 'string',
            description: 'Legacy name of the product (max 100 characters).'
        }
        #swagger.parameters['density'] = {
            in: 'formData',
            required: true,
            type: 'number',
            description: 'Density of the product in g/cm³ (0.8 - 2.0).'
        }
        #swagger.parameters['melt_index'] = {
            in: 'formData',
            required: true,
            type: 'number',
            description: 'Melt index in g/10 min (0.1 - 100).'
        }
        #swagger.parameters['country_id'] = {
            in: 'formData',
            required: true,
            type: 'integer',
            description: 'Country ID (positive integer).'
        }
        #swagger.parameters['organization_id'] = {
            in: 'formData',
            required: true,
            type: 'integer',
            description: 'Organization ID (positive integer).'
        }
        #swagger.parameters['pdf_file'] = {
            in: 'formData',
            type: 'file',
            required: false,
            description: 'Optional PDF file upload.'
        }
        #swagger.parameters['pdf_file'] = {
            in: 'formData',
            type: 'file',
            required: false,
            description: 'Optional PDF file upload'
        }
    */
    try {
         // Convert numeric values from string to actual numbers
         const parsedBody = {
            ...req.body,
            density: req.body.density ? parseFloat(req.body.density) : undefined,
            melt_index: req.body.melt_index ? parseFloat(req.body.melt_index) : undefined,
            country_id: req.body.country_id ? parseInt(req.body.country_id, 10) : undefined,
            organization_id: req.body.organization_id ? parseInt(req.body.organization_id, 10) : undefined,
        };

        // Validate Input
        const validatedData = ProductSchema.parse(parsedBody);

        const newProduct = await prisma.products.create({
            data: {
                ...validatedData,
                pdf_file: req.file ? req.file.path : null, // Save file path in DB
            },
        });

        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Product created successfully",
            data: newProduct,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        if (error instanceof Error) {
            return next(createError.BadRequest(error.message));
        } else {
            return next(createError.BadRequest());
        }
    }
});

router.put("/:id", upload.single("pdf_file"), async (req: Request, res: any, next: NextFunction) => {
    /*  #swagger.tags = ['Products']
        #swagger.consumes = ['form-data']
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'integer',
            description: 'ID of the product to update'
        }
        #swagger.parameters['name'] = {
            in: 'formData',
            required: false,
            type: 'string',
            description: 'Name of the product (min 3, max 255 characters).'
        }
        #swagger.parameters['legacy_name'] = {
            in: 'formData',
            required: false,
            type: 'string',
            description: 'Legacy name of the product (max 100 characters).'
        }
        #swagger.parameters['density'] = {
            in: 'formData',
            required: false,
            type: 'number',
            description: 'Density of the product in g/cm³ (0.8 - 2.0).'
        }
        #swagger.parameters['melt_index'] = {
            in: 'formData',
            required: false,
            type: 'number',
            description: 'Melt index in g/10 min (0.1 - 100).'
        }
        #swagger.parameters['country_id'] = {
            in: 'formData',
            required: false,
            type: 'integer',
            description: 'Country ID (positive integer).'
        }
        #swagger.parameters['organization_id'] = {
            in: 'formData',
            required: false,
            type: 'integer',
            description: 'Organization ID (positive integer).'
        }
        #swagger.parameters['pdf_file'] = {
            in: 'formData',
            type: 'file',
            required: false,
            description: 'Optional PDF file upload.'
        }
    */
    try {
        const { id } = req.params;
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return next(createError.BadRequest("Invalid product ID"));
        }

        // Check if product exists
        const existingProduct = await prisma.products.findUnique({
            where: { id: numericId },
        });

        if (!existingProduct) {
            return next(createError.NotFound("Product not found"));
        }

        // Convert numeric values from string to actual numbers
        const parsedBody = {
            ...req.body,
            density: req.body.density ? parseFloat(req.body.density) : undefined,
            melt_index: req.body.melt_index ? parseFloat(req.body.melt_index) : undefined,
            country_id: req.body.country_id ? parseInt(req.body.country_id, 10) : undefined,
            organization_id: req.body.organization_id ? parseInt(req.body.organization_id, 10) : undefined,
        };

        // Validate Input
        const validatedData = ProductSchema.partial().parse(parsedBody);

        // Update the product
        const updatedProduct = await prisma.products.update({
            where: { id: numericId },
            data: {
                ...validatedData,
                pdf_file: req.file ? req.file.path : existingProduct.pdf_file, // Keep existing file if no new file uploaded
            },
        });

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Product updated successfully",
            data: updatedProduct,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        if (error instanceof Error) {
            return next(createError.BadRequest(error.message));
        } else {
            return next(createError.BadRequest());
        }
    }
});

router.delete("/:id", async (req: Request, res: any, next: NextFunction) => {
    /*  #swagger.tags = ['Products']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'integer',
            description: 'ID of the product to delete'
        }
    */
    try {
        const { id } = req.params;
        const numericId = parseInt(id, 10);
        
        if (isNaN(numericId)) {
            return next(createError.BadRequest("Invalid product ID"));
        }

        // Check if product exists
        const existingProduct = await prisma.products.findUnique({
            where: { id: numericId },
        });

        if (!existingProduct) {
            return next(createError.NotFound("Product not found"));
        }

        // Delete product
        await prisma.products.delete({ where: { id: numericId } });

        return res.json({
            success: true,
            statusCode: 200,
            message: "Product deleted successfully",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        if (error instanceof Error) {
            return next(createError.BadRequest(error.message));
        } else {
            return next(createError.BadRequest());
        }
    }
});

export default router;