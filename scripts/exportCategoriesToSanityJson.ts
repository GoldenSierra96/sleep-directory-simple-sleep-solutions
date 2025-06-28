import fs from 'fs';
import path from 'path';
import { categoryData } from '../app/directory/categories/categoryData';

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const categories = [];
const subNiches = [];

const catData: Record<string, any> = categoryData;
for (const key of Object.keys(catData)) {
  const cat = catData[key];
  categories.push({
    _type: 'category',
    title: cat.title,
    slug: { _type: 'slug', current: cat.slug },
    description: cat.intro || cat.description || '',
  });
  if (Array.isArray(cat.subNiches)) {
    for (const sub of cat.subNiches) {
      const subSlug = slugify(sub.title);
      subNiches.push({
        _type: 'subNiche',
        title: sub.title,
        slug: { _type: 'slug', current: subSlug },
        description: sub.description || '',
        parentCategories: [
          {
            _type: 'reference',
            _ref: `category-${cat.slug}`,
          }
        ],
        _uniqueId: `${cat.slug}-${subSlug}`,
      });
    }
  }
}

const categoriesWithIds = categories.map(cat => ({
  ...cat,
  _id: `category-${cat.slug.current}`,
}));

const subNichesWithIds = subNiches.map(sub => ({
  ...sub,
  _id: `subniche-${sub._uniqueId}`,
  parentCategories: sub.parentCategories.map((ref: any) => ({
    ...ref,
    _ref: ref._ref,
  })),
  _uniqueId: undefined,
}));

const output = [...categoriesWithIds, ...subNichesWithIds];
const ndjsonOutput = output.map(obj => JSON.stringify(obj)).join('\n');

fs.writeFileSync(
  path.join(process.cwd(), 'categories-subniches.json'),
  ndjsonOutput,
  'utf-8'
);

console.log(`Exported ${categoriesWithIds.length} categories and ${subNichesWithIds.length} subniches to categories-subniches.json`);
console.log('Note: Image fields removed from schemas - can be added back later with proper implementation'); 