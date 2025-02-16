export function getEnv(key: string) {
  const value = process.env[key];
  if (!value) throw new Error(`Env variable ${key} is undefined.`);

  return value;
}
