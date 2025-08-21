interface Res {
  version: string
  title: string
  description: string
  home_page_url: string
  feed_url: string
  icon: string
  favicon: string
  items: {
    url: string
    date_modified?: string
    content_html: string
    date_published: string
    title: string
    id: string
  }[]
}

const share = defineSource(async () => {
  const res = await Promise.all(["create", "ideas", "programmer", "share"]
    .map(k => myFetch(`https://www.v2ex.com/feed/${k}.json`) as Promise<Res>))
  return res.map(k => k.items).flat().map(k => ({
    id: k.id,
    title: k.title,
    extra: {
      date: k.date_modified ?? k.date_published,
    },
    url: k.url,
  })).sort((m, n) => m.extra.date < n.extra.date ? 1 : -1)
})

export default defineSource({
  "v2ex": share,
  "v2ex-share": share,
})
