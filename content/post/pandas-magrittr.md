+++
date = "2015-12-06T12:02:06Z"
title = "Writing tidy pandas"
tags = ['pandas']

+++


[magrittr](https://github.com/smbache/magrittr) introduces some very pleasant syntax to R.
It gives you the `%>%` operator.
Whatever is on the left hand side of this operator gets passed into the right hand side.
This operator is known as a pipe - similar to [pipes in unix](http://www.december.com/unix/tutor/pipesfilters.html).

I really missed this syntax when I was writing python and pandas.
I've recently found that there's something pretty similar available in pandas,
which made me very happy.
<!--more-->

Have a look at this bit of R code,
written with the magrittr library.

```R
the_data <-
  read.csv('/path/to/data/file.csv') %>%
  subset(variable_a > x) %>%
  transform(variable_c = variable_a/variable_b) %>%
  head(100)
```

It looks a lot like how you would describe these operations in English.
First read the csv file,
then take a subset of it where `variable_a` is greater than `x`,
then create a new column called `variable_c` which is variable a divided by b,
and then finally take the first 100 rows of the data frame.

This gets really useful if you combine it with the [dplyr](https://cran.rstudio.com/web/packages/dplyr/vignettes/introduction.html) library.
This gives you a whole load of different verbs you can apply to your data.
You can easily filter, sort, aggregate, select specific columns and so on.
When writing R, this makes your code easier to understand and makes you more productive.

## Method chaining in pandas

The similar operation in pandas is known as *method chaining*,
and makes your code look pretty similar to that `magrittr` example from above.
*This has been around since pandas v0.16.2, so I'm a little late to the party.*

<blockquote class="twitter-tweet tw-align-center" lang="en"><p lang="en" dir="ltr">The new DataFrame.pipe in pandas is so heartwarming. Bravo team! <a href="http://t.co/SHMSASitPs">http://t.co/SHMSASitPs</a> <a href="https://twitter.com/hashtag/pydata?src=hash">#pydata</a></p>&mdash; Wes McKinney (@wesmckinn) <a href="https://twitter.com/wesmckinn/status/610550651114754048">June 15, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[This section](http://pandas.pydata.org/pandas-docs/stable/basics.html#tablewise-function-application)
of the official documentation describes how it works.
The example there is quite short, so you can easily miss how important an idea this is.
I've got an [ipython notebook](https://github.com/dataewan/country-borders-wikipedia/blob/master/Land%20borders%20from%20wikipedia.ipynb) that uses this idea of method chaining extensively.

I don't think that I've completely got the hang of this yet,
but by following the tips below I feel my code is a lot neater,
and makes me feel a lot happier.

## Put your long lines in brackets

When I started writing pandas,
I would write a lot of lines like this one.

```python
islands = clean.loc[clean.land_border_length == 0][['country', "number_neighbours"]]
```

Conceptually this is doing something pretty simple.
It is querying my `clean` dataframe,
finding all the rows where the `land_border_length` column is zero,
and then just selecting the `country` and `number_neighbours` fields of those rows that match.

It isn't very easy to read this.
It is hard to see where one section ends and the next one begins.
Also, if you write something more complicated than this then you'll get very long lines in your code,
which might not be the style of python you like to write.

You might be tempted to use temporary dataframes to break your code into smaller chunks.
So maybe do something like this:

```python
zero_border_length = clean.loc[clean.border_length == 0]
islands = zero_border_length[["country", "number_neighbours"]]
```

This is a bit easier to read,
but you end up with a lot of temporary dataframes that you never use again.

Instead of doing this,
just wrap your code in brackets.
The following section of code gives exactly the same results as the previous two sections.

```python
islands = (
    clean
    .loc[clean.land_border_length == 0]
    [['country', "number_neighbours"]]
)
```

I find this much easier to read
and it doesn't create a lot of temporary data frames.
This is my favourite way to write pandas.

## Use different functions

The other thing that made a difference to my pandas writing was starting to use more functions.
All these functions take a dataframe,
do something to the dataframe,
and then return a copy of the dataframe with the changes applied.
This makes them perfect for chaining together using the bracket method from above.

### query

[query](http://pandas.pydata.org/pandas-docs/version/0.17.0/generated/pandas.DataFrame.query.html)
performs filtering of the dataframe.
You give it logical expressions,
and it gives you back the rows that match that expression.

So this filters my data so that I get the countries with a zero land border length,
but that also have some neighbours.

```python
(
    clean
    .query("land_border_length == 0 & number_neighbours > 0")
)
```

### assign

[assign](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.assign.html)
lets you put new columns on the dataframe,
or assign new values to the old ones.

This example makes a new column in the dataframe `avgsegment` by dividing one column `land_border_length`
in the dataframe by another `number_borders`.

```python
(
    clean
    .assign(avgsegment = clean.land_border_length / clean.number_borders)
)
```

### rename

[rename](http://pandas.pydata.org/pandas-docs/version/0.17.1/generated/pandas.DataFrame.rename.html)
changes the names of the columns in the dataframe.
The knack here is to pass it a dictionary that contains the names of the columns you want to rename,
and what the column names should be afterwards like this: `{beforeName : afterName}`.

This example changes the name of the `country` column to `countryname`.

```python
(
    clean
    .rename(columns = {"country" : "countryname"})
)
```

### drop

[drop](http://pandas.pydata.org/pandas-docs/version/0.17.1/generated/pandas.DataFrame.drop.html)
lets you drop particular rows or columns of the dataframe.
This is useful if you want to remove some messy intermediary columns that you don't need any more.

### sort_values

[sort_values](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.sort_values.html)

### merge

[merge](http://pandas.pydata.org/pandas-docs/version/0.17.1/generated/pandas.DataFrame.merge.html)
is a lot like joining in SQL.
It lets you combine together different datasets.

The [full documentation](http://pandas.pydata.org/pandas-docs/stable/merging.html) on merging is well worth a read.
I'll probably write about that at some other point.

### groupby

This section of the documentation describes what the `groupby` function does [groupby](http://pandas.pydata.org/pandas-docs/stable/groupby.html#splitting-an-object-into-groups),
but it is worth looking at the [whole article](http://pandas.pydata.org/pandas-docs/stable/groupby.html) as well.

### agg

[agg](http://pandas.pydata.org/pandas-docs/stable/groupby.html#aggregation) lets you aggregate your dataframe.
This also works with 

-----

Now that I've got my head around these functions,
I can do pretty much everything that I could do in `dplyr`.

## Use the pipe function

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
