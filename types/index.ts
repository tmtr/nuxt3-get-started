export interface Supervisor {
  name: string
  description: string
}

export interface Section {
  heading: string | null
  text: string | null
}

export interface ArticleCore {
  articleNo: string
  headerImage: string
  title: string
}

export interface Article extends ArticleCore {
  articleCategory: string
  timing: string
  tags: string[] | null
  catch: string
  lead: string
  supervisor: Supervisor | null
  relatedArticles: ArticleCore[] | null
  body: Array<{
    heading: string
    children: Section[]
  }>
}
