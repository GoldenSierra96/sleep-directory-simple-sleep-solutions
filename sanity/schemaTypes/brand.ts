import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'logo', type: 'image', title: 'Logo' }),
    defineField({ name: 'website', type: 'url', title: 'Website' }),
    defineField({ name: 'categories', type: 'array', title: 'Categories', of: [{ type: 'reference', to: [{ type: 'category' }] }] }),
    defineField({ name: 'products', type: 'array', title: 'Products', of: [{ type: 'reference', to: [{ type: 'product' }] }] }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description' }),
    defineField({ name: 'order', type: 'number', title: 'Order' }),
  ],
}); 