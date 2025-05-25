import { Request, Response, NextFunction } from "express";

import { AppException } from "../exceptions/app.exception";
import { logger } from "../utils/logger";

export function errorHandlerMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    if (error instanceof AppException) {
        logger.warn(`Operational error: ${error.message}`, {
            statusCode: error.statusCode,
            path: req.path,
            method: req.method,
        });

        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            statusCode: error.statusCode,
            timestamp: new Date().toISOString(),
            path: req.path,
        });
        return;
    }

    // Log unexpected errors
    logger.error("Unexpected error occurred", {
        error: error.message,
        stack: error.stack,
        path: req.path,
        method: req.method,
    });

    res.status(500).json({
        success: false,
        message: "Internal server error",
        statusCode: 500,
        timestamp: new Date().toISOString(),
        path: req.path,
    });
}
