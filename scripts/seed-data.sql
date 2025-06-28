-- Seed data for Sleep Directory

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
('Brands', 'brands', 'Sleep product manufacturers and brands'),
('Products', 'products', 'Mattresses, pillows, and sleep accessories'),
('Apps', 'apps', 'Sleep tracking and improvement applications'),
('Therapy', 'therapy', 'Sleep specialists and therapy providers'),
('Services', 'services', 'Sleep clinics and consultation services');

-- Insert blog categories
INSERT INTO blog_categories (name, slug, description) VALUES
('Sleep Disorders', 'sleep-disorders', 'Information about various sleep disorders'),
('Sleep Products', 'sleep-products', 'Reviews and guides for sleep products'),
('Sleep Hygiene', 'sleep-hygiene', 'Tips for better sleep habits'),
('Sleep Technology', 'sleep-technology', 'Latest in sleep tracking and tech'),
('Sleep & Nutrition', 'sleep-nutrition', 'How diet affects sleep quality'),
('Sleep Research', 'sleep-research', 'Latest scientific findings on sleep');

-- Insert sample listings
INSERT INTO listings (
    name, slug, category_id, type, description, full_description,
    location, website, phone, email, founded, employees,
    rating, review_count, image_url, features, products, awards, tags,
    social_proof, is_featured
) VALUES
(
    'Purple Mattress', 'purple-mattress', 1, 'Mattress Manufacturer',
    'Revolutionary gel grid technology for temperature-neutral comfort and support.',
    'Founded in 2015 by brothers Tony and Terry Pearce, Purple has quickly become one of the most recognizable names in the sleep industry. Their unique approach combines scientific innovation with direct-to-consumer convenience, offering customers a 100-night sleep trial and free shipping.',
    'Alpine, Utah, USA', 'purple.com', '+1-888-848-2305', 'support@purple.com',
    '2015', '500-1000', 4.8, 2847, '/placeholder.svg?height=400&width=600',
    ARRAY['Patented GelFlex Grid Technology', 'Temperature Neutral Sleep Surface', 'Pressure Point Relief', '100-Night Sleep Trial', '10-Year Warranty', 'Free Shipping & Returns', 'Made in USA'],
    ARRAY['Purple Mattress Original', 'Purple Hybrid Premier', 'Purple RestorePremier', 'Purple Pillows', 'Purple Sheets', 'Purple Platform Base'],
    ARRAY['Best Cooling Mattress 2023 - Sleep Foundation', 'Editor''s Choice - Good Housekeeping', 'Best Online Mattress - Consumer Reports'],
    ARRAY['Memory Foam', 'Cooling', 'Online Direct', 'Made in USA', 'Sleep Trial'],
    '{"totalCustomers": "1M+", "satisfactionRate": "96%", "returnRate": "4%"}',
    true
),
(
    'Sleep Cycle', 'sleep-cycle', 3, 'Sleep Tracking App',
    'Smart alarm clock that analyzes your sleep patterns and wakes you during light sleep.',
    'Sleep Cycle is one of the most popular sleep tracking apps, using sound analysis to monitor your sleep patterns and wake you up during your lightest sleep phase.',
    'Global', 'sleepcycle.com', null, 'support@sleepcycle.com',
    '2009', '50-100', 4.6, 45231, '/placeholder.svg?height=400&width=600',
    ARRAY['Smart Alarm Clock', 'Sleep Pattern Analysis', 'Sleep Quality Tracking', 'Snore Detection', 'Sleep Trends', 'Premium Features'],
    ARRAY['Sleep Cycle App', 'Premium Subscription', 'Sleep Aid Sounds'],
    ARRAY['App Store Editor''s Choice', 'Google Play Award Winner'],
    ARRAY['Sleep Tracking', 'Smart Alarm', 'iOS', 'Android'],
    '{"totalDownloads": "50M+", "averageRating": "4.6", "activeUsers": "2M+"}',
    true
);

-- Insert sample blog posts
INSERT INTO blog_posts (
    title, slug, excerpt, content, category_id, author, author_bio,
    publish_date, read_time, image_url, tags, is_featured
) VALUES
(
    'Understanding Sleep Apnea: Symptoms, Causes, and Treatment Options',
    'understanding-sleep-apnea',
    'Sleep apnea affects millions of people worldwide. Learn about the different types, warning signs, and effective treatment approaches including CPAP therapy and lifestyle changes.',
    '<p>Sleep apnea is one of the most common yet underdiagnosed sleep disorders, affecting an estimated 22 million Americans...</p>',
    1, 'Dr. Michael Chen',
    'Board-certified sleep medicine physician with over 15 years of experience treating sleep disorders.',
    '2024-01-15', '8 min read', '/placeholder.svg?height=400&width=800',
    ARRAY['Sleep Apnea', 'CPAP', 'Sleep Disorders', 'Treatment'],
    true
),
(
    'The Science Behind Memory Foam: Why It Works for Better Sleep',
    'memory-foam-science',
    'Discover the technology behind memory foam mattresses, how they conform to your body, and why they might be the perfect solution for pressure point relief.',
    '<p>Memory foam technology has revolutionized the mattress industry...</p>',
    2, 'Sarah Williams',
    'Sleep product researcher and certified sleep consultant with expertise in mattress technology.',
    '2024-01-12', '6 min read', '/placeholder.svg?height=400&width=800',
    ARRAY['Memory Foam', 'Mattresses', 'Sleep Science', 'Comfort'],
    false
);

-- Insert sample reviews
INSERT INTO reviews (listing_id, reviewer_name, rating, title, content, is_verified, is_approved) VALUES
(1, 'John Smith', 5, 'Best mattress I''ve ever owned!', 'The Purple mattress has completely transformed my sleep. No more tossing and turning from overheating.', true, true),
(1, 'Sarah Johnson', 4, 'Great cooling but firm', 'Love how cool it sleeps, though it took some getting used to the firmness level.', true, true),
(2, 'Mike Davis', 5, 'Perfect sleep tracking', 'Sleep Cycle has helped me understand my sleep patterns and I wake up feeling much more refreshed.', false, true);
