import "dotenv/config";
import app from "./app.js";
import { prisma } from "./lib/prisma.js";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    // DB connection test
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    app.listen(Number(PORT), () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
}

main();
