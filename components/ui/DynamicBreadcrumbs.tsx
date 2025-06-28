"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

// Map route segments to human-readable names
const SEGMENT_LABELS: Record<string, string> = {
  directory: "Directory",
  categories: "Categories",
  products: "Products",
  brands: "Brands",
  blog: "Blog",
  admin: "Admin",
};

function toTitleCase(str: string) {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const DynamicBreadcrumbs: React.FC = () => {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  let href = "";

  return (
    <Breadcrumb
      className="px-4 py-2 text-xs sm:text-sm"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <BreadcrumbList>
        <BreadcrumbItem itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <BreadcrumbLink asChild itemProp="item" href="/">
            <Link href="/">Home</Link>
          </BreadcrumbLink>
          <meta itemProp="position" content="1" />
        </BreadcrumbItem>
        {segments.map((segment, idx) => {
          href += `/${segment}`;
          const isLast = idx === segments.length - 1;
          const label = SEGMENT_LABELS[segment] || toTitleCase(segment);
          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                {isLast ? (
                  <BreadcrumbPage itemProp="name">{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild itemProp="item" href={href}>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
                <meta itemProp="position" content={(idx + 2).toString()} />
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}; 