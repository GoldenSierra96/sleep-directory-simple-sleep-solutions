export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters)
  }
}

export function trackProductView(productId: string, productName: string, category: string) {
  trackEvent("view_item", {
    item_id: productId,
    item_name: productName,
    item_category: category,
  })
}

export function trackSearch(searchTerm: string, resultCount: number) {
  trackEvent("search", {
    search_term: searchTerm,
    result_count: resultCount,
  })
}

export function trackBlogPostView(postId: string, postTitle: string, category: string) {
  trackEvent("view_article", {
    article_id: postId,
    article_title: postTitle,
    article_category: category,
  })
}

export function trackForumThreadView(threadId: string, threadTitle: string, category: string) {
  trackEvent("view_thread", {
    thread_id: threadId,
    thread_title: threadTitle,
    thread_category: category,
  })
}
