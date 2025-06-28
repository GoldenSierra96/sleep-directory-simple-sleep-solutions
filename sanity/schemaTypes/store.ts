import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'store',
  title: 'Store / Shop',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      type: 'string', 
      title: 'Store Name', 
      validation: Rule => Rule.required(),
      description: 'Official store name (e.g., "Dreams Beds Manchester")'
    }),
    defineField({ 
      name: 'slug', 
      type: 'slug', 
      title: 'Slug', 
      options: { source: 'title', maxLength: 96 }, 
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'description', 
      type: 'text', 
      title: 'Description',
      description: 'Brief description of the store and what they offer'
    }),
    
    // Store Type
    defineField({
      name: 'storeType',
      type: 'string',
      title: 'Store Type',
      options: {
        list: [
          { title: 'Chain Store', value: 'chain' },
          { title: 'Independent Local Shop', value: 'independent' },
          { title: 'Department Store', value: 'department' },
          { title: 'Online Only', value: 'online' },
          { title: 'Showroom', value: 'showroom' },
          { title: 'Outlet Store', value: 'outlet' }
        ]
      },
      validation: Rule => Rule.required()
    }),

    // Location Information (Critical for Local SEO)
    defineField({
      name: 'address',
      type: 'object',
      title: 'Address',
      fields: [
        { name: 'street', type: 'string', title: 'Street Address' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'county', type: 'string', title: 'County/State' },
        { name: 'postcode', type: 'string', title: 'Postcode/ZIP' },
        { name: 'country', type: 'string', title: 'Country', initialValue: 'UK' }
      ]
    }),

    defineField({
      name: 'coordinates',
      type: 'geopoint',
      title: 'Location (Map)',
      description: 'Precise location for maps and local search'
    }),

    // Contact Information
    defineField({ 
      name: 'phone', 
      type: 'string', 
      title: 'Phone Number',
      description: 'Local store phone number'
    }),
    defineField({ 
      name: 'email', 
      type: 'email', 
      title: 'Email Address' 
    }),
    defineField({ 
      name: 'website', 
      type: 'url', 
      title: 'Store Website' 
    }),

    // Business Hours
    defineField({
      name: 'openingHours',
      type: 'array',
      title: 'Opening Hours',
      of: [{
        type: 'object',
        fields: [
          { name: 'day', type: 'string', title: 'Day', options: {
            list: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          }},
          { name: 'open', type: 'string', title: 'Opening Time (e.g., 09:00)' },
          { name: 'close', type: 'string', title: 'Closing Time (e.g., 18:00)' },
          { name: 'closed', type: 'boolean', title: 'Closed on this day' }
        ]
      }]
    }),

    // Parent Chain (if applicable)
    defineField({
      name: 'parentChain',
      type: 'string',
      title: 'Parent Chain',
      description: 'e.g., "Dreams", "John Lewis", leave blank for independent stores'
    }),

    // Product Categories & Brands
    defineField({ 
      name: 'categories', 
      type: 'array', 
      title: 'Product Categories', 
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      description: 'What categories of sleep products does this store sell?'
    }),
    defineField({ 
      name: 'brands', 
      type: 'array', 
      title: 'Brands Stocked', 
      of: [{ type: 'reference', to: [{ type: 'brand' }] }],
      description: 'Which brands does this store carry?'
    }),

    // Services
    defineField({
      name: 'services',
      type: 'array',
      title: 'Services Offered',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Home Delivery',
          'Assembly Service',
          'Mattress Recycling',
          'Sleep Consultation',
          'Trial Period',
          'Price Matching',
          'Finance Options',
          'Click & Collect',
          'Same Day Delivery'
        ]
      }
    }),

    // Local SEO Fields
    defineField({
      name: 'localKeywords',
      type: 'array',
      title: 'Local Keywords',
      of: [{ type: 'string' }],
      description: 'Local search terms (e.g., "mattress shop Manchester", "beds near me")'
    }),

    defineField({
      name: 'nearbyLandmarks',
      type: 'array',
      title: 'Nearby Landmarks',
      of: [{ type: 'string' }],
      description: 'Local landmarks for better local search (e.g., "Near Trafford Centre")'
    }),

    // Reviews and Ratings
    defineField({
      name: 'googleMyBusinessUrl',
      type: 'url',
      title: 'Google My Business URL'
    }),
    defineField({
      name: 'averageRating',
      type: 'number',
      title: 'Average Rating',
      validation: Rule => Rule.min(0).max(5)
    }),
    defineField({
      name: 'reviewCount',
      type: 'number',
      title: 'Number of Reviews'
    }),

    // Business Information
    defineField({
      name: 'establishedYear',
      type: 'number',
      title: 'Year Established'
    }),
    defineField({
      name: 'employeeCount',
      type: 'string',
      title: 'Employee Count',
      options: {
        list: ['1-5', '6-10', '11-25', '26-50', '51-100', '100+']
      }
    }),

    // SEO Fields
    defineField({ 
      name: 'seoTitle', 
      type: 'string', 
      title: 'SEO Title',
      description: 'Include location for local SEO (e.g., "Dreams Beds Manchester - Mattresses & Bedroom Furniture")'
    }),
    defineField({ 
      name: 'seoDescription', 
      type: 'text', 
      title: 'SEO Description',
      description: 'Include location and services for local search'
    }),
    defineField({ 
      name: 'order', 
      type: 'number', 
      title: 'Display Order' 
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'address.city',
      media: 'logo'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle ? `📍 ${subtitle}` : '📍 Location not set'
      }
    }
  }
}); 