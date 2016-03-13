+++
date = "2016-03-13T13:12:12Z"
title = "Pandas assign function"
tags = ['pandas', 'data-verbs']

+++

[assign](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.assign.html)
lets you put new columns on the dataframe,
or assign new values to the old ones.

<!--more-->

This example makes a new column in the dataframe `avgsegment` by dividing one column `land_border_length`
in the dataframe by another `number_borders`.

```python
(
    clean
    .assign(avgsegment = clean.land_border_length / clean.number_borders)
)
```
