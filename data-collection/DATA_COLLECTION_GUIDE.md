# Sleep Directory Brand Data Collection Guide

## 🎯 **Objective**
Collect comprehensive data on **1,000 sleep product brands** across all categories, starting with **UK market** focus.

## 📊 **Data Collection Strategy**

### **Phase 1: UK Market (1,000 entries)**
- **Target**: 76-80 brands per category (13 categories)
- **Focus**: UK-based brands or brands with strong UK presence
- **Method**: GPT-assisted web scraping + manual verification

### **Phase 2: Scale to Other Countries**
- Replicate successful UK brands for US/CA/AU markets
- Adapt pricing, availability, and local variations

## 🔍 **GPT Collection Workflow**

### **Step 1: Category Research**
For each category, use these GPT prompts:

```
Search for "best [CATEGORY] brands UK 2024" and list the top 15 brands with their websites.

Example: "best mattress brands UK 2024"
```

### **Step 2: Subniche-Specific Research**
For each subniche, use targeted searches:

```
Find brands that rank in top 10 Google results for "[SUBNICHE] UK" and extract:
- Brand name
- Specific product page URL for this subniche
- Product title
- Price range
- Key features

Example: "memory foam mattress UK"
```

### **Step 3: Brand Deep Dive**
For each identified brand, collect comprehensive data:

```
Analyze [BRAND_WEBSITE] and extract all data points from our CSV template:
- Company information
- Product details for [SPECIFIC_SUBNICHE]
- Pricing and availability
- Customer reviews and ratings
- Social media presence
- SEO information

Example: emma-sleep.co.uk for memory foam mattresses
```

## 📋 **Required Data Fields**

### **🔴 Critical Fields (Must Have)**
1. `brand_name` - Exact brand name
2. `brand_website` - Main website URL
3. `primary_category` - Must match existing categories
4. `primary_subniche` - Must match existing subniches
5. `subniche_specific_url` - Direct product page URL
6. `brand_country` - UK for Phase 1
7. `verification_status` - Mark as "verified" after checking

### **🟡 Important Fields (Highly Recommended)**
8. `price_range_min` / `price_range_max` - In GBP
9. `customer_rating` - 0-5 scale
10. `shipping_info` - UK delivery details
11. `return_policy` - Return terms
12. `key_features` - Comma-separated
13. `meta_title` / `meta_description` - For SEO

### **🟢 Nice-to-Have Fields**
14. Social media URLs
15. Awards and certifications
16. Marketplace presence (Amazon UK, eBay UK)
17. Special offers
18. Brand story

## 🎯 **Search Queries by Category**

### **Mattresses**
- "memory foam mattress UK brands"
- "pocket spring mattress UK suppliers"
- "hybrid mattress UK best"
- "orthopedic mattress UK"
- "budget mattress UK cheap"

### **Pillows**
- "memory foam pillow UK brands"
- "pillows for neck pain UK"
- "down pillows UK luxury"
- "latex pillow UK natural"
- "orthopedic pillow UK support"

### **Sleep Aids**
- "white noise machine UK"
- "sleep spray UK brands"
- "essential oils sleep UK"
- "sleep mask UK travel"
- "weighted blanket UK"

### **Supplements**
- "melatonin UK brands"
- "magnesium sleep UK"
- "valerian root UK supplements"
- "CBD sleep aid UK"
- "natural sleep supplements UK"

*(Continue for all 13 categories...)*

## 🛠️ **GPT Prompts for Data Collection**

### **Initial Brand Discovery**
```
I need to find UK brands for [CATEGORY]. Search Google for "[CATEGORY] UK brands 2024" and provide:

1. Brand name
2. Website URL
3. Brief description
4. Estimated price range
5. Whether they ship to UK

Format as CSV with these columns: brand_name, website, description, price_range, uk_shipping
```

### **Detailed Brand Analysis**
```
Analyze this brand website [URL] for [SUBNICHE] products and extract:

**Basic Info:**
- Brand name and description
- Headquarters location
- Year established

**Product Details:**
- Specific product page for [SUBNICHE]
- Product title and description
- Price range in GBP
- Key features and materials
- Target audience

**Business Info:**
- Shipping to UK (cost and timeframe)
- Return policy
- Warranty information
- Customer rating (if available)

**Online Presence:**
- Social media links (Facebook, Instagram, Twitter)
- Amazon UK presence
- Current promotions

Format as single CSV row matching our template.
```

### **SEO Information Extraction**
```
For [BRAND] targeting "[SUBNICHE]" keyword in UK market, suggest:

1. SEO title (max 60 chars)
2. Meta description (max 160 chars)
3. Primary keywords they likely rank for
4. Competitor comparison (vs 2-3 main competitors)
```

## 📝 **Data Collection Workflow**

### **Daily Target: 50-75 brand entries**

1. **Morning (9-11 AM): Category Research**
   - Pick 1-2 categories to focus on
   - Use GPT to find 10-15 brands per category
   - Verify brand websites are accessible

2. **Midday (11-1 PM): Subniche Mapping**
   - For each brand, identify which subniches they serve
   - Find specific product pages for each subniche
   - Check pricing and availability

3. **Afternoon (2-5 PM): Data Entry**
   - Fill CSV template for each brand-subniche combination
   - Verify critical information
   - Mark verification status

4. **Evening (5-6 PM): Quality Check**
   - Review day's entries for completeness
   - Check for duplicate entries
   - Note any new subniches discovered

## 🔍 **Quality Assurance Checklist**

### **Before Adding Each Entry:**
- [ ] Brand website loads and is in English
- [ ] Product page URL is specific to the subniche
- [ ] Price is in GBP (or convertible)
- [ ] Brand ships to UK or is UK-based
- [ ] No duplicate brand-subniche combinations
- [ ] Category and subniche match existing ones

### **Data Validation:**
- [ ] URLs are valid and accessible
- [ ] Price ranges are realistic (£20-£2000 for mattresses)
- [ ] Phone numbers follow UK format
- [ ] Email addresses are valid
- [ ] Social media links work

## 🆕 **Adding New Subniches**

When you discover brands serving subniches not in our current list:

### **Document in separate sheet:**
- `new_subniche_name`
- `parent_category`
- `description`
- `example_brands`
- `search_volume_estimate`

### **Common New Subniches to Watch For:**
- Smart mattresses
- Adjustable beds
- Cooling pillows
- Travel sleep kits
- Smart sleep trackers
- Blue light blocking glasses
- Sleep coaching services

## 📈 **Progress Tracking**

### **Weekly Targets:**
- Week 1: Mattresses + Pillows (150 entries)
- Week 2: Bedding + Sleep Aids (150 entries)
- Week 3: Supplements + Air Quality (150 entries)
- Week 4: Remaining categories + cleanup (150 entries)
- Week 5: Quality review + missing data (150 entries)
- Week 6: Final verification + import (250 entries)

### **Success Metrics:**
- **Quantity**: 1,000 verified entries
- **Quality**: 95% of critical fields completed
- **Coverage**: At least 5 brands per subniche
- **Accuracy**: All URLs accessible, prices current

## 🚀 **Import Process**

Once data collection is complete:

1. **Final CSV review** - Check formatting and completeness
2. **Run import script** - `npm run import-brands data-collection/brand-data-collected.csv`
3. **Verify in Sanity** - Check all brands and directory entries created
4. **Update sitemap** - Ensure new entries appear in sitemap

## 🔧 **Tools and Resources**

### **Essential Tools:**
- **GPT-4** - Primary research assistant
- **Google Sheets** - Data organization and validation
- **Browser bookmarks** - Save frequently accessed brand sites
- **UK price converter** - For international brands

### **Verification Resources:**
- **Companies House** - Verify UK company information
- **Trustpilot** - Customer reviews and ratings
- **Amazon UK** - Product availability and pricing
- **Google Shopping** - Price comparison

### **Backup Data Sources:**
- **Which?** - Product reviews and recommendations
- **Sleep Foundation** - Brand partnerships and reviews
- **Retail websites** - John Lewis, Argos, Dreams, etc.

---

## 📞 **Support**

If you encounter issues or need clarification:
1. Document the issue in the CSV `notes` field
2. Mark `verification_status` as "needs-review"
3. Continue with other entries
4. Review issues during weekly check-ins

**Happy hunting!** 🎯 