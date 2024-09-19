import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// Read allowed origins from environment variables or use a default
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

console.log(allowedOrigins);

// CORS configuration
export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    // If no origin is present, allow the request (like for mobile apps or tools like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // If origin is not allowed, return an error
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Accept, Authorization',
  credentials: true, // Allow credentials if needed (cookies, etc.)
};
