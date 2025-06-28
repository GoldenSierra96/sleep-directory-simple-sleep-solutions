# 💤 Sleep Directory: Brand Data Management Workflow

## Overview
This guide explains how to manage brand data in your Sleep Directory project, including:
- Seeding the database with brands (including test data like "Not Swiss Cheese")
- Adding/editing brands via the admin UI or directly in the database
- Troubleshooting common issues
- Best practices and suggested team workflows

---

## 1. Environment Setup
- Ensure your `.env` file contains the correct `DATABASE_URL` (Session Pooler connection string from Supabase).
- Example:
  ```
  DATABASE_URL=postgresql://postgres.<user>@aws-0-eu-west-2.pooler.supabase.com:5432/postgres
  ```

---

## 2. Seeding Brand Data

### A. Edit the Seed Script
- The seed script is at: `prisma/seed.ts`
- Add or edit brand entries in this file using the Prisma client, e.g.:
  ```ts
  await prisma.brand.create({
    data: {
      name: "Not Swiss Cheese",
      slug: "not-swiss-cheese",
      // ...other fields
    }
  });
  ```

### B. Run the Seed Script
1. Make sure dependencies are installed:
   ```sh
   npm install --save-dev tsx
   ```
2. Ensure your `package.json` has:
   ```json
   "prisma": {
     "seed": "tsx prisma/seed.ts"
   }
   ```
3. Run the seed:
   ```sh
   npx prisma db seed
   ```
- Check the terminal for success messages or errors.
- Verify in Supabase Table Editor that brands are present.

---

## 3. Managing Brands via the Admin UI
- Go to `/admin/brands` in your app (sign in as an admin if required).
- Use the UI to:
  - Add new brands
  - Edit existing brands
  - Delete brands
- Changes are reflected immediately in the database and on the public `/brands` page.

---

## 4. Manual Brand Data Entry (Advanced)
- You can also add/edit brands directly in the Supabase Table Editor.
- Be careful with unique fields (`slug`, `name`) to avoid conflicts.
- Always refresh your app after manual changes.

---

## 5. Brand Data Fields (Reference)
Each brand should have:
- `name` (string, unique)
- `slug` (string, unique, URL-friendly)
- `logo` (URL or path)
- `description` (string)
- `websiteUrl` (URL)
- `tags` (array of strings)
- `locations` (array of strings)
- `isOnline` (boolean)
- `socialLinks` (JSON: instagram, facebook, tiktok, etc.)
- `featured` (boolean)
- `awards` (array of strings)
- `productGallery` (array of image URLs)
- `categories` (relation to categories)

---

## 6. Troubleshooting
- **No brands showing up?**
  - Check your `.env` for the correct `DATABASE_URL`.
  - Make sure you seeded the correct database.
  - Check for errors in the seed script output.
- **Seed script not running?**
  - Ensure you have `tsx` installed and the correct `prisma.seed` config in `package.json`.
  - Run `npx prisma db seed` and check for logs.
- **Database connection errors?**
  - Double-check your Supabase project is running and your password is correct.
  - Test with DBeaver or another client.
- **Unique constraint errors?**
  - Make sure `name` and `slug` are unique for each brand.

---

## 7. Suggested Workflows & Team Responsibilities

### A. **Brand Data Entry & QA**
- **Responsibility:** Content/Data Team
- **Workflow:**
  1. Add new brands via the admin UI or seed script.
  2. Double-check all required fields are filled and slugs are unique.
  3. Use the public `/brands` page to verify correct display.
  4. Periodically review and update brand data for accuracy.

### B. **Technical Maintenance**
- **Responsibility:** Developer/Engineering Team
- **Workflow:**
  1. Maintain the seed script and Prisma schema.
  2. Run migrations and seeds as needed for new features or data corrections.
  3. Monitor for errors in logs and address database connection issues.
  4. Keep dependencies up to date and `.env` secure.

### C. **Admin Moderation**
- **Responsibility:** Admin/Moderator Team
- **Workflow:**
  1. Approve or reject new brand submissions (if user-submitted brands are enabled).
  2. Remove or edit brands that violate guidelines.
  3. Use the admin UI for all moderation actions.

### D. **Database Backups & Security**
- **Responsibility:** DevOps/Technical Lead
- **Workflow:**
  1. Schedule regular database backups via Supabase or another tool.
  2. Ensure `.env` and credentials are not committed to version control.
  3. Review access permissions for team members.

---

## 8. Best Practices
- Always backup your database before making bulk changes.
- Use the seed script for reproducible test data.
- Use the admin UI for day-to-day brand management.
- Keep your `.env` secure and never commit secrets to version control.
- Document any manual changes for team transparency.

---

## 9. Useful Commands
- **Seed database:**  
  `npx prisma db seed`
- **Push schema changes:**  
  `npx prisma db push`
- **Generate Prisma client:**  
  `npx prisma generate`
- **Start dev server:**  
  `npm run dev`

---

## 10. Support
If you get stuck:
- Check the logs/output for errors.
- Review this README for troubleshooting steps.
- Ask your dev team or reach out for help!

---

**Happy brand managing!** 