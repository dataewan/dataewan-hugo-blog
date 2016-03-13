+++
date = "2016-03-13T13:12:12Z"
title = "Pandas pipe function"
tags = ['pandas', 'data-verbs']

+++

Pipes in pandas

<!--more-->

[pipe](http://pandas.pydata.org/pandas-docs/version/0.17.0/generated/pandas.DataFrame.pipe.html)

```python
import statsmodels.formula.api as sm

bb = pd.read_csv('data/baseball.csv', index_col='id')

(bb.query('h > 0')
   .assign(ln_h = lambda df: np.log(df.h))
   .pipe((sm.poisson, 'data'), 'hr ~ ln_h + year + g + C(lg)')
   .fit()
   .summary()
)
```
