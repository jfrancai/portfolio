import dotenv from "dotenv";
import fs from "fs-extra";
import { loadConfig } from "./config";
import {
  Client,
  isFullPageOrDatabase,
  iteratePaginatedAPI,
} from "@notionhq/client";
import { savePage } from "./render";

dotenv.config();

async function main() {
  if (process.env.NOTION_TOKEN === "")
    throw Error("The NOTION_TOKEN environment vairable is not set.");
  const config = await loadConfig();
  console.info("[Info] Config loaded ");

  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const page_ids: string[] = [];
  console.info("[Info] Start processing mounted databases");

  // process mounted databases
  for (const mount of config.mount.databases) {
    fs.ensureDirSync(`content/projects/${mount.target_folder}`);
    for await (const page of iteratePaginatedAPI(notion.databases.query, {
      database_id: mount.database_id,
    })) {
      if (!isFullPageOrDatabase(page) || page.object !== "page") {
        continue;
      }
      console.info(`[Info] Start processing page ${page.id}`);
      page_ids.push(page.id);
      await savePage(page, notion, mount);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err: any) => {
    console.log(err);
    process.exit(1);
  });
