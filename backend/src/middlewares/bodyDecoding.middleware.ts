import { NextFunction, Request, Response } from "express";

export async function decodeBody(req: Request, res: Response, next: NextFunction) {
  const body = req.body;

  if (!body) {
    next()
    
  }

  const newBody: Record<string, any> = {};

  // Mapping from environment variables
  const envMap: Record<string, string | undefined> = {
    A: process.env.A,
    B: process.env.B,
    C: process.env.C,
    D: process.env.D,
    E: process.env.E,
    F: process.env.F,
    G: process.env.G,
    H: process.env.H,
    I: process.env.I,
    J: process.env.J,
    K: process.env.K,
    L: process.env.L,
    M: process.env.M,
    N: process.env.N,
    O: process.env.O,
    P: process.env.P,
    Q: process.env.Q,
    R: process.env.R,
    S: process.env.S
  };

  // Convert request body keys to their corresponding environment variable names
  Object.keys(body).forEach((key) => {
    const newKey = envMap[key]; // Get mapped key from env variables
    if (newKey) {
      newBody[newKey] = body[key]; // Assign value correctly
    }
  });

  console.log(newBody); // For debugging

  req.body = newBody; // Replace request body with the new structured object
  next(); // Call next middleware
}
