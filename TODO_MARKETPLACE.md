# Resource Marketplace Implementation Plan

## Overview
Build a comprehensive digital library/marketplace where therapists, educators, and creators can find, share, customize, buy, or download therapy resources.

## Database Schema (Supabase)
- [x] Create resources table (id, title, description, type, category, price, creator_id, file_data, preview_image, downloads_count, rating_avg, created_at)
- [x] Create resource_categories table (id, name, description, icon)
- [x] Create resource_downloads table (id, resource_id, user_id, downloaded_at)
- [x] Create resource_ratings table (id, resource_id, user_id, rating, review, created_at)
- [x] Create resource_purchases table (id, resource_id, user_id, amount, purchased_at)
- [x] Add RLS policies for resources (public read, authenticated create/update own)
- [x] Add RLS policies for downloads, ratings, purchases

## API Layer
- [x] Create @/db/api.ts functions for:
  - [x] getResources() - Browse all resources with filters
  - [x] getResourceById() - Get single resource details
  - [x] createResource() - Upload new resource
  - [x] updateResource() - Update own resource
  - [x] deleteResource() - Delete own resource
  - [x] downloadResource() - Track download
  - [x] rateResource() - Add rating/review
  - [x] getMyResources() - Get user's uploaded resources
  - [x] getMyDownloads() - Get user's downloaded resources
  - [x] searchResources() - Search functionality (integrated in getResources)

## Type Definitions
- [x] Update @/types/index.ts with:
  - [x] Resource interface
  - [x] ResourceCategory interface
  - [x] ResourceDownload interface
  - [x] ResourceRating interface
  - [x] ResourcePurchase interface
  - [x] ResourceType enum
  - [x] ResourceFilter interface

## Pages
- [x] Create @/pages/marketplace/MarketplacePage.tsx - Main marketplace browsing
- [x] Create @/pages/marketplace/ResourceDetailPage.tsx - Individual resource view
- [x] Create @/pages/marketplace/UploadResourcePage.tsx - Upload new resource
- [x] Create @/pages/marketplace/MyResourcesPage.tsx - User's uploaded/downloaded resources

## Components
- [x] Create @/components/marketplace/ResourceCard.tsx - Resource preview card
- [x] Create @/components/marketplace/ResourceFilters.tsx - Filter sidebar
- [ ] Create @/components/marketplace/ResourceGrid.tsx - Grid of resources (using inline grid)
- [ ] Create @/components/marketplace/ResourceSearch.tsx - Search bar (using inline search)
- [ ] Create @/components/marketplace/ResourcePreview.tsx - Preview modal (not needed yet)
- [ ] Create @/components/marketplace/UploadResourceForm.tsx - Upload form (inline in page)
- [ ] Create @/components/marketplace/RatingDisplay.tsx - Star rating display (inline)
- [ ] Create @/components/marketplace/RatingForm.tsx - Add rating/review (inline)
- [ ] Create @/components/marketplace/DownloadButton.tsx - Download/purchase button (inline)

## Routes
- [x] Add marketplace routes to @/routes.tsx
- [ ] Update Header navigation with Marketplace link

## Features
- [x] Browse resources by category
- [x] Search resources by name/description
- [x] Filter by: type, category, price (free/paid), rating
- [x] Sort by: newest, popular, highest rated
- [x] Preview resource before download
- [x] Download free resources
- [x] Purchase paid resources (basic flow)
- [x] Upload/share resources
- [x] Rate and review resources
- [x] Track downloads count
- [x] My Resources page (uploaded + downloaded)
- [x] Edit/delete own resources

## Resource Types
- [x] AAC Board
- [x] Visual Schedule
- [x] Matching Activity
- [x] Sorting Activity
- [x] Custom Activity

## Testing
- [ ] Test resource upload
- [ ] Test resource download
- [ ] Test search and filters
- [ ] Test rating system
- [ ] Test permissions (own resources only)
- [x] Run lint check

## Documentation
- [ ] Create MARKETPLACE_GUIDE.md
- [ ] Update DOCUMENTATION_INDEX.md

## Notes
- Use existing auth system (profiles table)
- Store resource data as JSONB (activity configurations)
- Free resources: price = 0
- Paid resources: price > 0 (basic implementation, no actual payment processing)
- All users can browse and download free resources
- Authenticated users can upload, rate, and purchase
