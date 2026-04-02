/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'

export function para(text: string) {
  return {
    type: 'paragraph' as const,
    version: 1 as const,
    children: [{ type: 'text' as const, version: 1 as const, text }],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
  }
}

export function richText(...texts: string[]) {
  return {
    root: {
      type: 'root' as const,
      children: texts.map(para),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

export async function deleteAll(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
) {
  const res = await payload.find({ collection: collection as any, limit: 200, depth: 0 })
  await Promise.all(
    res.docs.map((doc: any) => payload.delete({ collection: collection as any, id: doc.id })),
  )
  console.log(`  Deleted ${res.docs.length} records from '${collection}'`)
}
