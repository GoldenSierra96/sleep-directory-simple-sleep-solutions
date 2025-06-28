// Algolia integration is disabled for local development.

export const searchClient = {
  search: () => Promise.resolve({ hits: [] }),
};

export const productsIndex = {
  saveObject: async () => {},
  search: async () => ({ hits: [] }),
  initIndex: () => productsIndex,
};
export const blogPostsIndex = productsIndex;
export const threadsIndex = productsIndex;

export async function indexProduct(product: any) {
  // No-op
}

export async function indexBlogPost(post: any) {
  // No-op
}
