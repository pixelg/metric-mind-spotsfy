import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    APP_URL: z.string().optional().default('http://localhost:3000'),
  });

  const envVars = Object.entries(import.meta.env)
    .reduce<Record<string, string>>((acc, [key, value]) => {
      if (key.startsWith('VITE_APP_')) {
        acc[key.replace('VITE_APP_', '')] = value;
      }
      return acc;
  }, {});

  try {
    EnvSchema.parse(envVars);
  } catch (error) {
    throw new Error('Invalid env vars');
  }

  return envVars;
}

export const env = createEnv();