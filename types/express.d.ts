import "express";

declare global {
  namespace Express {
    interface Response {
      /**
       * Response de criação de recurso (201 Created)
       */
      create(options: { resource: string; data: unknown }): Response;

      /**
       * Response de sucesso (200 OK)
       */
      success(data: unknown): Response;
    }
  }
}
