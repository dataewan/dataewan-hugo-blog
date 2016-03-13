+++
date = "2015-12-06T12:02:06Z"
title = "Writing tidy pandas"
tags = ['pandas']

+++

I've been writing `pandas` code extensively over the past few months.
I've collected a few tips for making your pandas neater,
easier to understand,
and make your life a little happier.

<!--more-->

# Method chaining in pandas

*Method chaining* in pandas lets you apply multiple functions to your dataframe.
If you've used `dplyr` in R at all,
you'll recognise this pattern.

[This section](http://pandas.pydata.org/pandas-docs/stable/basics.html#tablewise-function-application)
of the official documentation describes how it works.
The example there is quite short, so you can easily miss how important an idea this is.
I've got an [ipython notebook](https://github.com/dataewan/country-borders-wikipedia/blob/master/Land%20borders%20from%20wikipedia.ipynb) that uses this idea of method chaining extensively.

The idea behind method chaining is this.
Instead of calling multiple functions on a data frame like this:

```python
result = f(g(h(df)))
```

you call all your functions in a chain like this:

```python
result = df.f().g().h()
```

This works because many pandas functions work by returning a copy of the dataframe.
So you can apply multiple functions in order very easily using this pattern.


# Avoid long lines in pandas

Another big change you can make is to split your long lines of code into multiple lines.
You do this by wrapping them in brackets.
This is the code style that pandas encourages.

For example, here I've got a very long line of pandas code:

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

The first thing that I did to try and make this simpler was to start splitting the code into logical chunks.
I'd do something like this:

```python
zero_border_length = clean.loc[clean.border_length == 0]
islands = zero_border_length[["country", "number_neighbours"]]
```

This is a bit easier to read, because your code is in sections.
The downside is that you end up with a lot of unecessary temporary dataframes that you never use again.

Instead of doing this,
just wrap your code in brackets.
The following section of code gives exactly the same results as the previous two sections.

```python
islands = (
    clean
    # select the rows where the `land_border_length` is zero
    .loc[clean.land_border_length == 0]
    # only take the country and number_neighbours columns
    [['country', "number_neighbours"]]
)
```

I find this much easier to read
and it doesn't create a lot of temporary data frames.
This is my favourite way to write pandas.

# Know your data verbs

The other thing that made a difference to my pandas writing was starting to use a different set of functions.
All these functions take a dataframe,
do something to the dataframe,
and then return a copy of the dataframe with the changes applied.
This makes them perfect for chaining them together,
wrapping the big long lines in brackets to make them easier to read.

I think of these as *data verbs*,
because they are operations that you perform on your data.


 * [query](/data-verb/query)
     * The query function lets you select subsets of your data frame, filtering just for the rows you want.
 * [assign](/data-verb/assign)
     * Assign lets you create new columns in your data frame, or alter the values that are there already
 * [rename](/data-verb/rename)
     * Rename columns in your data frame
 * [drop](/data-verb/drop)
     * Remove columns that you don't want
 * [sort_values](/data-verb/sort_values)
     * Orders your dataframe
 * [merge](/data-verb/merge)
     * Join two data frames together
 * [groupby](/data-verb/groupby)
     * Make your data frame into groups. Apply functions on those groups.
 * [pipe](/data-verb/pipe)
     * Pass your data frame into a function. Useful if you're chaining together functions that work on data frames with other arguments.

Learning what all these functions do in detail helps make your code a lot more readable.
If you use these verbs in chains,
your code starts to look much more like a description in natrual language of the steps you perform on your data.
