import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'image', type: 'image', title: 'Image' }),
    defineField({ name: 'brand', type: 'reference', to: [{ type: 'brand' }], title: 'Brand' }),
    defineField({ name: 'categories', type: 'array', title: 'Categories', of: [{ type: 'reference', to: [{ type: 'category' }] }] }),
    defineField({ name: 'subNiches', type: 'array', title: 'Sub-Niches', of: [{ type: 'reference', to: [{ type: 'subNiche' }] }] }),
    defineField({ name: 'features', type: 'array', title: 'Features', of: [{ type: 'string' }] }),
    defineField({ name: 'price', type: 'number', title: 'Price' }),
    defineField({ name: 'website', type: 'url', title: 'Website' }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description' }),
    defineField({ name: 'order', type: 'number', title: 'Order' }),
  ],
}); 