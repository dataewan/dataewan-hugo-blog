+++
date = "2016-03-13T13:12:12Z"
title = "Pandas drop function"
tags = ['pandas', 'data-verbs']

+++

[drop](http://pandas.pydata.org/pandas-docs/version/0.17.1/generated/pandas.DataFrame.drop.html)
lets you drop particular rows or columns of the dataframe.

<!--more-->

The thing I find this most useful for is removing messy intermediary columns that you don't need any more.
If you do this, you need to specify that the `axis=1` to drop the columns.

```python
(
    clean
    .drop('land_border_length', axis = 1)
)
```
