# 🛏️ Sleep Directory Data Collection System
*Complete Notion workspace for collecting 1,000+ sleep product brands & stores*

---

## 📊 Database Overview

### 🏢 **Brands Database**
Primary database for sleep product manufacturers and direct-to-consumer companies.

**Database Properties:**
- **Brand Name** (Title) - Text
- **Status** (Select) - Draft | In Progress | Verified | Published
- **Category** (Multi-select) - Mattresses, Pillows, Bedding, etc.
- **Country** (Select) - UK, US, CA, AU, Other
- **Website** (URL)
- **Founded** (Number)
- **Type** (Select) - D2C, Manufacturer, Distributor, Marketplace
- **Rating** (Number) - 0-5 stars
- **Last Updated** (Date)
- **Collector** (Person)
- **Notes** (Text)

### 🏪 **Stores Database**
Database for retail stores, local shops, and physical locations.

**Database Properties:**
- **Store Name** (Title) - Text
- **Status** (Select) - Draft | In Progress | Verified | Published
- **Store Type** (Select) - Chain, Independent, Department, Online, Showroom, Outlet
- **Address** (Text)
- **City** (Text)
- **Postcode** (Text)
- **Phone** (Phone)
- **Website** (URL)
- **Google Business** (URL)
- **Rating** (Number) - 0-5 stars
- **Brands Carried** (Relation to Brands)
- **Categories** (Multi-select)
- **Services** (Multi-select) - Delivery, Assembly, Consultation, etc.
- **Opening Hours** (Text)
- **Last Updated** (Date)
- **Collector** (Person)
- **Local Keywords** (Text)
- **Notes** (Text)

### 🎯 **SubNiche Entries Database**
Individual entries linking brands/stores to specific subniches.

**Database Properties:**
- **Entry Title** (Title) - Text
- **Status** (Select) - Draft | In Progress | Verified | Published
- **Type** (Select) - Brand | Store
- **Brand** (Relation to Brands)
- **Store** (Relation to Stores)
- **Category** (Select)
- **SubNiche** (Select)
- **Specific URL** (URL)
- **Price Min** (Number)
- **Price Max** (Number)
- **Currency** (Select) - GBP, USD, CAD, AUD
- **Key Features** (Text)
- **Target Audience** (Text)
- **SEO Title** (Text)
- **SEO Description** (Text)
- **Last Updated** (Date)
- **Collector** (Person)
- **Priority** (Select) - High, Medium, Low
- **Notes** (Text)

---

## 🎯 Collection Workflow

### **Phase 1: Setup (Week 1)**

#### 📋 **Daily Checklist Template**
```
## Daily Collection - [DATE]

### Morning Setup (30 mins)
- [ ] Choose target category: ___________
- [ ] Set daily target: ___ entries
- [ ] Prepare GPT prompts
- [ ] Check internet connection & tools

### Research Session 1 (2 hours)
**Target:** Brand Discovery
- [ ] Run GPT search for top brands in category
- [ ] Verify websites are accessible
- [ ] Initial brand entries created: ___/___

### Research Session 2 (2 hours) 
**Target:** Store Discovery
- [ ] Find local stores for category
- [ ] Check Google Maps for locations
- [ ] Store entries created: ___/___

### Research Session 3 (2 hours)
**Target:** SubNiche Mapping
- [ ] Map brands to specific subniches
- [ ] Find product-specific URLs
- [ ] SubNiche entries created: ___/___

### End of Day Review (30 mins)
- [ ] Quality check all entries
- [ ] Update status to "Verified"
- [ ] Plan tomorrow's focus
- [ ] Backup progress

**Total Today:** ___ Brands | ___ Stores | ___ Entries
**Week Progress:** ___/150 target
```

### **Phase 2: Categories & Targets**

#### 🗓️ **6-Week Schedule**

**Week 1: Foundation Categories**
- Monday: Mattresses (Target: 15 brands, 10 stores, 25 entries)
- Tuesday: Mattresses continued
- Wednesday: Pillows (Target: 12 brands, 8 stores, 20 entries)
- Thursday: Pillows continued  
- Friday: Quality review & catch-up
- **Week 1 Total:** 27 brands, 18 stores, 45 entries

**Week 2: Comfort & Support**
- Monday: Bedding (Target: 10 brands, 15 stores, 25 entries)
- Tuesday: Mattress Toppers (Target: 8 brands, 5 stores, 15 entries)
- Wednesday: Sleep Aids (Target: 12 brands, 8 stores, 20 entries)
- Thursday: Sleep Masks (Target: 8 brands, 3 stores, 12 entries)
- Friday: Quality review & catch-up
- **Week 2 Total:** 38 brands, 31 stores, 72 entries

**Week 3: Health & Wellness**
- Monday: Supplements (Target: 15 brands, 12 stores, 25 entries)
- Tuesday: Air Quality (Target: 10 brands, 8 stores, 18 entries)
- Wednesday: Sleep Tracking (Target: 8 brands, 5 stores, 15 entries)
- Thursday: Sleepwear (Target: 10 brands, 10 stores, 20 entries)
- Friday: Quality review & catch-up
- **Week 3 Total:** 43 brands, 35 stores, 78 entries

**Week 4: Furniture & Decor**
- Monday: Beds (Target: 12 brands, 15 stores, 25 entries)
- Tuesday: Bedroom Decor (Target: 15 brands, 20 stores, 30 entries)
- Wednesday: Travel Sleep (Target: 8 brands, 5 stores, 15 entries)
- Thursday: Catch-up & new discoveries
- Friday: Mid-point review & optimization
- **Week 4 Total:** 35 brands, 40 stores, 70 entries

**Week 5: Expansion & Quality**
- Monday-Wednesday: Fill gaps in all categories
- Thursday: New subniches & discoveries
- Friday: Quality assurance & data cleaning
- **Week 5 Total:** Variable based on gaps

**Week 6: Finalization**
- Monday-Tuesday: Final data collection
- Wednesday: Comprehensive quality review
- Thursday: Data export & preparation
- Friday: Import into system & testing
- **Week 6 Total:** Complete 1,000+ entries

---

## 🔍 GPT Research Templates

### **Template 1: Brand Discovery**
```
I need to research UK sleep product brands for [CATEGORY]. 

Please search and provide:
1. Top 15 brands in this category available in UK
2. Their official websites
3. Brief description (1 sentence)
4. Estimated price range in GBP
5. Whether they're UK-based or international

Format as table:
| Brand | Website | Description | Price Range | Origin |

Category: [INSERT CATEGORY]
```

### **Template 2: Store Discovery**
```
Find UK retail stores that sell [CATEGORY] products.

Include:
1. Chain stores (Dreams, John Lewis, etc.)
2. Independent local shops
3. Department stores with sleep sections
4. Online-only retailers

For each store provide:
- Store name
- Website
- Store type (chain/independent/department/online)
- Approximate number of UK locations
- Brands they typically carry

Focus on stores with strong UK presence.

Category: [INSERT CATEGORY]
```

### **Template 3: Local Store Research**
```
Find [STORE_CHAIN] locations in [CITY/REGION].

For each location provide:
- Full address including postcode
- Phone number
- Opening hours
- Any location-specific services
- Google Maps URL
- Google My Business rating if available

Store Chain: [INSERT CHAIN]
Region: [INSERT REGION]
```

### **Template 4: Product-Specific Research**
```
Analyze [BRAND_WEBSITE] for [SPECIFIC_SUBNICHE] products.

Extract:
**Product Information:**
- Specific product page URL for [SUBNICHE]
- Product name/title
- Price range in GBP
- Key features (5-6 points)
- Materials used
- Target audience

**Business Details:**
- Shipping to UK (cost & time)
- Return policy
- Warranty information
- Customer service contact

**Marketing:**
- Current promotions/discount codes
- Customer rating/reviews
- Social media presence
- SEO title suggestion (under 60 chars)

Brand: [INSERT BRAND]
SubNiche: [INSERT SUBNICHE]
```

---

## 📋 Quality Assurance Checklists

### **Brand Entry Checklist**
```
Brand: ___________________

✅ **Basic Information**
- [ ] Brand name is official/accurate
- [ ] Website URL works and loads properly
- [ ] Founded year is realistic (1800-2024)
- [ ] Country is correctly identified
- [ ] Type (D2C/Manufacturer/etc.) is accurate

✅ **Content Quality**
- [ ] Description is informative (50+ words)
- [ ] Categories match our system
- [ ] Rating is from reliable source
- [ ] No spelling/grammar errors

✅ **Technical Validation**
- [ ] Website loads in under 5 seconds
- [ ] Site has UK delivery/pricing
- [ ] Contact information is provided
- [ ] SSL certificate is valid

✅ **SEO Verification**
- [ ] Brand appears in UK Google results
- [ ] Website has proper meta tags
- [ ] Social media presence confirmed
- [ ] No duplicate entries in database

**Quality Score:** ___/16
**Approved by:** ___________________
**Date:** ___________________
```

### **Store Entry Checklist**
```
Store: ___________________

✅ **Location Information**
- [ ] Full address including postcode
- [ ] Coordinates/map location accurate
- [ ] Phone number format correct (UK)
- [ ] Opening hours current and complete

✅ **Business Details**
- [ ] Store type correctly categorized
- [ ] Parent chain identified (if applicable)
- [ ] Services list is comprehensive
- [ ] Brands carried are verified

✅ **Local SEO**
- [ ] Google My Business URL works
- [ ] Local keywords are relevant
- [ ] Nearby landmarks identified
- [ ] City/region correctly specified

✅ **Contact & Reviews**
- [ ] Website/email addresses work
- [ ] Rating from Google/Trustpilot
- [ ] Recent reviews checked
- [ ] Business hours confirmed

**Quality Score:** ___/16
**Approved by:** ___________________
**Date:** ___________________
```

---

## 📊 Progress Tracking Dashboard

### **Weekly Progress Template**
```
# Week [X] Progress Report

## 📈 Numbers Summary
- **Brands Added:** ___/[target]
- **Stores Added:** ___/[target]  
- **SubNiche Entries:** ___/[target]
- **Quality Score Average:** ___%
- **Completion Rate:** ___%

## 🎯 Categories Completed
- [ ] Mattresses (__/__ entries)
- [ ] Pillows (__/__ entries)
- [ ] Bedding (__/__ entries)
- [ ] Sleep Aids (__/__ entries)
- [ ] Supplements (__/__ entries)
- [ ] Air Quality (__/__ entries)
- [ ] Mattress Toppers (__/__ entries)
- [ ] Sleep Masks (__/__ entries)
- [ ] Sleep Tracking (__/__ entries)
- [ ] Sleepwear (__/__ entries)
- [ ] Beds (__/__ entries)
- [ ] Bedroom Decor (__/__ entries)
- [ ] Travel Sleep (__/__ entries)

## 🔍 Quality Metrics
- **Verified Entries:** ___%
- **Complete Profiles:** ___%
- **Working URLs:** ___%
- **Local SEO Complete:** ___%

## 🚨 Issues Found
- Issue 1: ___________________
- Issue 2: ___________________
- Issue 3: ___________________

## 📝 Next Week Focus
- Priority 1: ___________________
- Priority 2: ___________________
- Priority 3: ___________________

## 💡 Discoveries
**New SubNiches Found:**
- ___________________
- ___________________

**Top Performing Brands:**
- ___________________
- ___________________

**Best Local Stores:**
- ___________________
- ___________________
```

---

## 🔄 Database Views & Filters

### **Recommended Database Views**

#### **📊 Collection Dashboard**
- **Group by:** Status
- **Filter:** Show all entries
- **Sort:** Last Updated (descending)
- **Properties:** Name, Status, Category, Collector, Last Updated

#### **🎯 Weekly Focus**
- **Group by:** Category
- **Filter:** Status = "In Progress" OR "Draft"
- **Sort:** Priority (High first)
- **Properties:** Name, Status, Priority, Collector

#### **✅ Quality Review**
- **Group by:** Collector
- **Filter:** Status = "Verified"
- **Sort:** Last Updated (ascending)
- **Properties:** Name, Category, Quality Score, Notes

#### **📍 Local SEO Tracker**
- **Database:** Stores only
- **Group by:** City
- **Filter:** Store Type ≠ "Online"
- **Sort:** Rating (descending)
- **Properties:** Name, Address, Rating, Local Keywords

#### **🔍 Research Pipeline**
- **Group by:** Category
- **Filter:** Status = "Draft"
- **Sort:** Created (ascending)
- **Properties:** Name, Category, Website, Collector

---

## 🎨 Template Gallery

### **Brand Entry Template**
```
🏢 [Brand Name]

**Category:** [Primary Category]
**Founded:** [Year]
**HQ:** [Location]
**Type:** [Business Model]

**Description:**
[2-3 sentence brand description]

**Key Products:**
• [Product 1]
• [Product 2] 
• [Product 3]

**UK Presence:**
✅ Ships to UK: [Yes/No]
✅ UK Warehouse: [Yes/No]
✅ Local Support: [Yes/No]

**Pricing:** £[min] - £[max]
**Rating:** ⭐⭐⭐⭐⭐ ([X]/5)

**Contact:**
📞 [Phone]
📧 [Email]
🌐 [Website]

**Social:**
📘 [Facebook]
📷 [Instagram]
🐦 [Twitter]

**Notes:**
[Any additional observations]
```

### **Store Entry Template**
```
🏪 [Store Name]

**Location:** [Full Address with Postcode]
**Type:** [Chain/Independent/Department/etc.]
**Parent:** [Chain Name if applicable]

**Contact:**
📞 [Local Phone]
🌐 [Website]
📍 [Google Maps URL]

**Hours:**
Monday: [hours]
Tuesday: [hours]
Wednesday: [hours]
Thursday: [hours]
Friday: [hours]
Saturday: [hours]
Sunday: [hours]

**Brands Carried:**
• [Brand 1]
• [Brand 2]
• [Brand 3]

**Services:**
✅ [Service 1]
✅ [Service 2]
✅ [Service 3]

**Local SEO:**
🎯 Keywords: [local keywords]
🏛️ Landmarks: [nearby landmarks]
⭐ Rating: [X]/5 ([Y] reviews)

**Notes:**
[Local insights, special offers, etc.]
```

---

## 🚀 Export & Import Instructions

### **Export for System Import**

#### **Step 1: Prepare Notion Export**
1. Go to each database
2. Click "..." → "Export"
3. Choose "CSV" format
4. Download all databases

#### **Step 2: Data Formatting**
1. Open CSV files
2. Ensure column headers match our template
3. Remove Notion-specific columns (ID, Created, etc.)
4. Validate all URLs and data formats

#### **Step 3: System Import**
1. Use our import script: `npm run import-brands`
2. Monitor for errors and duplicates
3. Verify data in Sanity Studio
4. Update sitemap and test URLs

---

## 🎯 Success Metrics

### **Weekly Targets**
- **Week 1-2:** 200 total entries
- **Week 3-4:** 400 total entries  
- **Week 5-6:** 600+ total entries
- **Final:** 1,000+ verified entries

### **Quality Standards**
- **95%+ working URLs**
- **90%+ complete profiles** 
- **100% UK delivery confirmed**
- **85%+ local SEO complete** (for stores)

### **Coverage Goals**
- **5+ brands per subniche minimum**
- **3+ stores per major UK city**
- **All 13 categories represented**
- **Geographic spread across UK**

---

## 📞 Support & Resources

### **GPT Research Prompts Library**
*Save these as Notion templates for quick access*

### **UK Business Verification**
- Companies House: gov.uk/government/organisations/companies-house
- Postcode Lookup: royalmail.com/find-a-postcode
- VAT Number Check: gov.uk/check-uk-vat-number

### **Local SEO Resources**
- Google My Business
- Bing Places
- Yell.com
- Thomson Local

### **Quality Assurance Tools**
- Website uptime checker
- SSL certificate validator
- Mobile-friendly test
- Page speed insights

---

*This guide is optimized for Notion's database structure and templating system. Copy each section into your Notion workspace and customize the properties to match your team's workflow.* 