import * as React from 'react';
import { getRecordMap } from "@/utils/notion";
import { notFound } from "next/navigation";
import Image from 'next/image'
import Link from 'next/link'
import NotionRenderer, { Code } from '@/components/post'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'


export default async function Page() {
  const recordMap = await getRecordMap();
  console.log(recordMap);

  //Redirect to not found page!
  if (!recordMap) notFound();

  return (
  <NotionRenderer
    recordMap={recordMap}
    fullPage={true}
    darkMode={true}
    components={{
      nextLink: Link,
      nextImage: Image,
      Code,
    }}
  />  );
}
