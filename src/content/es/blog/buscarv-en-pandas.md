---
title: BUSCARV en pandas, con merge
description: Cómo cruzar dos tablas en Python igual que con BUSCARV, y dos ventajas que Excel no te da.
date: 2026-11-04
tags: [pandas, excel, python]
translationKey: vlookup-merge
---

Si usás Excel, seguro usaste **BUSCARV** para traer el precio de un producto a tu planilla de ventas. En pandas, eso se hace con `merge`.

## El ejemplo

Tenemos las ventas de tres sucursales y un catálogo con los precios en guaraníes:

```python
import pandas as pd

ventas = pd.DataFrame({
    "producto_id": [101, 102, 101, 103],
    "sucursal": ["Asunción", "Encarnación", "Ciudad del Este", "Asunción"],
    "cantidad": [3, 1, 5, 2],
})

productos = pd.DataFrame({
    "producto_id": [101, 102, 103],
    "producto": ["Yerba 1 kg", "Aceite 900 ml", "Arroz 1 kg"],
    "precio_gs": [28000, 19500, 9500],
})
```

En Excel escribirías `=BUSCARV(A2; Productos!A:C; 3; FALSO)` y arrastrarías la fórmula. En pandas es una línea:

```python
reporte = ventas.merge(productos, on="producto_id", how="left")
reporte["total_gs"] = reporte["cantidad"] * reporte["precio_gs"]
```

`how="left"` mantiene todas las filas de `ventas`, como BUSCARV. Si un producto no está en el catálogo, en vez de `#N/A` vas a ver `NaN`.

## Dos ventajas sobre BUSCARV

**1. Te avisa si el catálogo tiene duplicados.** BUSCARV agarra la primera coincidencia y sigue de largo. Con `validate`, pandas frena si un `producto_id` aparece dos veces:

```python
ventas.merge(productos, on="producto_id", how="left", validate="many_to_one")
```

**2. Encontrás lo que no cruzó en un paso:**

```python
sin_precio = reporte[reporte["precio_gs"].isna()]
```

En la clase 4 del curso hacemos esto mismo con el dataset de Distribuidora Ñandutí, con miles de filas en lugar de cuatro.
