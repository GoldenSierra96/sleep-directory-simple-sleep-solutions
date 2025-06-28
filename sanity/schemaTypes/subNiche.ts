import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'subNiche',
  title: 'Sub-Niche',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'parentCategories', type: 'array', title: 'Parent Categories', of: [{ type: 'reference', to: [{ type: 'category' }] }] }),
    defineField({ name: 'products', type: 'array', title: 'Products', of: [{ type: 'reference', to: [{ type: 'product' }] }] }),
    defineField({ name: 'brands', type: 'array', title: 'Brands', of: [{ type: 'reference', to: [{ type: 'brand' }] }] }),
    defineField({ name: 'themes', type: 'array', title: 'Themes', of: [{ type: 'string' }] }),
    defineField({ name: 'relatedSubNiches', type: 'array', title: 'Related Sub-Niches', of: [{ type: 'reference', to: [{ type: 'subNiche' }] }] }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description' }),
    defineField({ name: 'order', type: 'number', title: 'Order' }),
  ],
}); 