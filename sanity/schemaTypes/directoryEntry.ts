import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'directoryEntry',
  title: 'Directory Entry',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'image', type: 'image', title: 'Image' }),
    defineField({ name: 'type', type: 'string', title: 'Type', options: { list: [ { title: 'Brand', value: 'brand' }, { title: 'Product', value: 'product' } ] } }),
    defineField({ name: 'brand', type: 'reference', to: [{ type: 'brand' }], title: 'Brand' }),
    defineField({ name: 'product', type: 'reference', to: [{ type: 'product' }], title: 'Product' }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'category' }], title: 'Category' }),
    defineField({ name: 'subNiche', type: 'reference', to: [{ type: 'subNiche' }], title: 'Sub-Niche' }),
    defineField({ name: 'website', type: 'url', title: 'Website' }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description' }),
    defineField({ name: 'order', type: 'number', title: 'Order' }),
  ],
}); 