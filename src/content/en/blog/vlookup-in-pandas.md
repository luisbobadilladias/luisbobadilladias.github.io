---
title: VLOOKUP in pandas, with merge
description: How to join two tables in Python the way you would with VLOOKUP, plus two things Excel won't do for you.
date: 2026-11-04
tags: [pandas, excel, python]
translationKey: vlookup-merge
---

If you work in Excel, you've probably used **VLOOKUP** to pull a product's price into your sales sheet. In pandas, that's what `merge` is for.

## The example

We have sales from three branches and a product catalog with prices in guaraníes:

```python
import pandas as pd

sales = pd.DataFrame({
    "product_id": [101, 102, 101, 103],
    "branch": ["Asunción", "Encarnación", "Ciudad del Este", "Asunción"],
    "quantity": [3, 1, 5, 2],
})

products = pd.DataFrame({
    "product_id": [101, 102, 103],
    "product": ["Yerba mate 1 kg", "Cooking oil 900 ml", "Rice 1 kg"],
    "price_pyg": [28000, 19500, 9500],
})
```

In Excel you'd write `=VLOOKUP(A2, Products!A:C, 3, FALSE)` and drag it down. In pandas it's one line:

```python
report = sales.merge(products, on="product_id", how="left")
report["total_pyg"] = report["quantity"] * report["price_pyg"]
```

`how="left"` keeps every row in `sales`, just like VLOOKUP. If a product is missing from the catalog, you get `NaN` instead of `#N/A`.

## Two advantages over VLOOKUP

**1. It tells you when the catalog has duplicates.** VLOOKUP takes the first match and moves on. With `validate`, pandas stops if a `product_id` shows up twice:

```python
sales.merge(products, on="product_id", how="left", validate="many_to_one")
```

**2. You can find what didn't match in one step:**

```python
missing_price = report[report["price_pyg"].isna()]
```

In class 4 of the course we do exactly this with the Distribuidora Ñandutí dataset, using thousands of rows instead of four.
