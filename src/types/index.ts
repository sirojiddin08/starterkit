export type ApiResponse<T> = {
    success: boolean;       // Indicates whether the request was successful
    data?: T;              // The actual response data (generic)
    error?: string;        // Error message if the request fails
    statusCode?: number;   // HTTP status code for reference
    message?: string;      // Optional success or additional info message
    timestamp?: string;    // ISO timestamp of the response
};