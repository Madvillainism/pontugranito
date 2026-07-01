const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const targetPath = "./src/environments/environment.ts";

const envConfigFile = `export const environment = {
  production: false,
  supabaseUrl: '${process.env.SUPABASE_URL || ""}',
  supabaseKey: '${process.env.SUPABASE_KEY || ""}'
};
`;

fs.mkdirSync("./src/environments", { recursive: true });
fs.writeFileSync(targetPath, envConfigFile);

console.log(`🟢 [Script] Archivo environment.ts generado dinámicamente.`);
