import dotenv from 'dotenv';

dotenv.config();

export function getConfiguration(key: string): string {
  if (key in process.env) return process.env[key] || '';
  throw new Error(`key: ${key} not found in set of environment variables`);
}
