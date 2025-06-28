"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface TabConfig {
  key: string;
  label: string;
  href: string;
  count?: number;
}

interface TabbedNavigationProps {
  tabs: TabConfig[];
  basePath: string;
  className?: string;
}

export function TabbedNavigation({ tabs, basePath, className }: TabbedNavigationProps) {
  const pathname = usePathname();

  return (
    <div className={cn("border-b border-border", className)}>
      <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/');
          
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-2 py-0.5 px-2 text-xs bg-muted rounded-full">
                  {tab.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// Layout wrapper for tabbed pages
interface TabbedLayoutProps {
  children: React.ReactNode;
  tabs: TabConfig[];
  basePath: string;
  title: string;
  description?: string;
  headerContent?: React.ReactNode;
}

export function TabbedLayout({ 
  children, 
  tabs, 
  basePath, 
  title, 
  description, 
  headerContent 
}: TabbedLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b bg-muted/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-2">{description}</p>
              )}
            </div>
            {headerContent && (
              <div className="flex-shrink-0">
                {headerContent}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabbed Navigation */}
      <div className="container mx-auto px-4">
        <TabbedNavigation tabs={tabs} basePath={basePath} />
      </div>

      {/* Tab Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 