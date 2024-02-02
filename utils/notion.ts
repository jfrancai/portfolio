import "server-only";
import { cache } from "react";
import { NotionAPI } from 'notion-client'

const notion = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V2
});



export const getRecordMap = cache(() => {
  return notion.getPage('60c115eee4854ba9ba85bfd872a3cad5');
})
