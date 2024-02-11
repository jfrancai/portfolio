import dotenv from "dotenv";
import { loadConfig } from "./config";

dotenv.config();

async function main() {
  if (process.env.NOTION_TOKEN === "")
    throw Error("The NOTION_TOKEN environment vairable is not set.");
  const config = await loadConfig();
  console.info("[Info] Config loaded ");
}

main()
  .then(() => process.exit(0))
  .catch((err: any) => {
    console.log(err);
    process.exit(1);
  });
