import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'subNiches', type: 'array', title: 'Sub-Niches', of: [{ type: 'reference', to: [{ type: 'subNiche' }] }] }),
    defineField({ name: 'products', type: 'array', title: 'Products', of: [{ type: 'reference', to: [{ type: 'product' }] }] }),
    defineField({ name: 'brands', type: 'array', title: 'Brands', of: [{ type: 'reference', to: [{ type: 'brand' }] }] }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description' }),
    defineField({ name: 'order', type: 'number', title: 'Order' }),
  ],
}); 