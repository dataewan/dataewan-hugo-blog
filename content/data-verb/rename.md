+++
date = "2016-03-13T13:12:12Z"
title = "Pandas rename function"
tags = ['pandas', 'data-verbs']

+++
[rename](http://pandas.pydata.org/pandas-docs/version/0.17.1/generated/pandas.DataFrame.rename.html)
changes the names of the columns in the dataframe.

<!--more-->

The knack here is to pass it a dictionary that contains the names of the columns you want to rename,
and what the column names should be afterwards like this: `{beforeName : afterName}`.

This example changes the name of the `country` column to `countryname`.

```python
(
    clean
    .rename(columns = {"country" : "countryname"})
)
```
