---
title: Data ingestion and back-end
client: FellowBridge
summary: A pipeline that gathers scholarships published across the web, plus the back-end that serves them on the site.
role: Data & Back-end Engineer
period: Jan – Apr 2026
stack: [AWS Lambda, TypeScript, S3, Athena, Web scraping]
url: https://fellowbridge.com
order: 3
---

FellowBridge helps students and researchers find opportunities abroad and connect with mentors who've already been through the process.

- **Ingestion:** scholarships are spread across many sites in many formats. I built the scrapers that collect them and land them in an S3 data lake, with Athena on top so they can be queried with SQL.
- **Back-end:** I wrote TypeScript services on AWS Lambda that power the endpoints behind the site.
