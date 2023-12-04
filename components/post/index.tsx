'use client'

import { NotionRenderer } from 'react-notion-x'

import dynamic from 'next/dynamic'

export const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)

export default NotionRenderer;
