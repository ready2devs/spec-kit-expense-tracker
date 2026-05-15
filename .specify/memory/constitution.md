<!--
Version change: 1.0.0 -> 1.1.0
Modified principles:
- Modern Next.js Standards -> Next.js 15 Best Practices (expanded to 15 points)
Templates updated:
- .specify/memory/constitution.md ✅ updated
-->
# prueba_spec Constitution

## Core Principles

### I. Dark Mode by Default
The user interface must be designed with a dark theme as the default preference. High contrast, accessible colors, and modern aesthetics (vibrant colors, glassmorphism, dynamic animations) should be prioritized to create a premium impression.

### II. Clean and Modular Code
Code must be organized into small, reusable, and self-contained components or modules. Follow SOLID principles, maintain high readability, and avoid large, monolithic files. Logic should be separated from presentation where possible.

### III. Next.js 15 Best Practices
Strict adherence to these 15 essential practices for Next.js and the App Router:
1.  **Prioritize Server Components (RSC):** Default to Server Components; use `'use client'` only for interactivity or browser APIs.
2.  **Respect the Client-Server Boundary:** Never import server-only code into Client Components.
3.  **Feature-Based Folder Structure:** Group code by feature (e.g., `features/auth/`) rather than by technical type.
4.  **Colocate Special Files:** Keep `page.tsx`, `layout.tsx`, and `loading.tsx` together in route segment folders.
5.  **Use Route Groups:** Organize URL structures without affecting paths using `(group-name)`.
6.  **Parallel Data Fetching:** Avoid waterfalls by using `Promise.all()` for independent data requests.
7.  **Strategic Streaming with Suspense:** Use `<Suspense>` to improve perceived performance.
8.  **Granular Error Handling:** Place `error.tsx` at the most specific level possible.
9.  **Leverage Server Actions:** Use Server Actions for all mutations (forms/database updates).
10. **Explicit Caching Strategies:** Use `revalidate` tags or `no-store` based on data freshness needs.
11. **Optimize Client Components:** Keep Client Components at the "leaf" of the tree to minimize JS bundles.
12. **Middleware for Edge Logic:** Use `middleware.ts` only for lightweight request-time decisions.
13. **Centralize Reusable Logic:** Keep shared connectors and helpers in a dedicated `lib/` directory.
14. **Regular Performance Audits:** Monitor Core Web Vitals and analyze bundles for bloat.
15. **End-to-End Type Safety:** Ensure strict typing from database to UI, using Zod for validation.

## Development Standards
All implementation tasks must prioritize visual excellence and performance. Placeholder content is prohibited; high-quality assets should be generated or sourced.

## Project Structure
The project follows a standard Next.js directory structure with an emphasis on the feature-based organization defined in Principle III.

## Governance
This Constitution supersedes all other project practices. Amendments require documentation and a version increment (MINOR for new best practices).

**Version**: 1.1.0 | **Ratified**: 2026-05-15 | **Last Amended**: 2026-05-15
