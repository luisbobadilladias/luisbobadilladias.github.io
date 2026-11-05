---
title: Ingesta de datos y back-end
client: FellowBridge
summary: Un pipeline que junta becas publicadas en toda la web y el back-end que las sirve en el sitio.
role: Data & Back-end Engineer
period: ene – abr 2026
stack: [AWS Lambda, TypeScript, S3, Athena, Web scraping]
url: https://fellowbridge.com
order: 3
---

FellowBridge ayuda a estudiantes e investigadores a encontrar oportunidades en el exterior y a conectar con mentores que ya pasaron por ese camino.

- **Ingesta:** las becas están repartidas en muchos sitios y en formatos distintos. Construí los scrapers que las recolectan y las guardan en un data lake en S3, con Athena encima para consultarlas con SQL.
- **Back-end:** escribí servicios en TypeScript sobre AWS Lambda que exponen los endpoints que usa el sitio.
