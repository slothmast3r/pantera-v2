import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const collection = searchParams.get('collection')

  if (secret !== process.env.PAYLOAD_SECRET) {
    return new Response('Invalid preview token', { status: 401 })
  }

  const dm = await draftMode()
  dm.enable()

  let url = '/'
  if (collection === 'offers' && slug) url = `/oferta/${slug}`
  else if (collection === 'classes' && slug) url = `/zajecia/${slug}`
  else if (collection === 'pages' && slug) url = slug === 'home' ? '/' : `/${slug}`

  redirect(url)
}
