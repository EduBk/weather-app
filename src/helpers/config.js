if (process.env.NODE_ENV !== 'production') {
  try {
    process.loadEnvFile();
  } catch (error) {
    console.log('No .env file found, using environment variables');
  }
}

const {
  NODE_ENV: enviroment = "development",
  MAPBOX_KEY: box_key = "mamon",
  PORT: port = "3000",
  OPENWEATHER_KEY: weather_key = "AQUI_FALTA",
} = process.env;

export const envConfig = () => {
  const missed = [];
  const required = ["PORT", "NODE_ENV", "MAPBOX_KEY", "OPENWEATHER_KEY"];

  for (const key of required) {
    if (!process.env[key]) {
      missed.push(key);
    }
  }

  if (missed.length > 0) {
    throw new Error(`Missing required environment variable: ${missed}`);
  }

  return {
    enviroment,
    port: Number(port),
    box_key,
    weather_key,
  };
};
