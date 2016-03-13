+++
date = "2016-03-13T13:12:12Z"
title = "Pandas query function"
tags = ['pandas', 'data-verbs']

+++

[query](http://pandas.pydata.org/pandas-docs/version/0.17.0/generated/pandas.DataFrame.query.html)
performs filtering of the dataframe.
You give it logical expressions,
and it gives you back the rows that match that expression.

<!--more-->

So this filters my data so that I get the countries with a zero land border length,
but that also have some neighbours.

```python
(
    clean
    .query("land_border_length == 0 & number_neighbours > 0")
)
```
