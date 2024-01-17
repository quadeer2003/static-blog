---
title: "Basic R"
date: 2023-11-05T21:55:57+05:30
draft: false
---
# R Programming Language

## Introduction

R is a robust programming language and environment designed for statistical computing and data analysis. Developed by Ross Ihaka and Robert Gentleman at the University of Auckland, it has evolved into a versatile tool for professionals in various fields, including statistics, data science, and academia.

## Basics

### R Basics

#### Assigning Values

Use the `<-` operator to assign values to variables:

```R
x <- 10
```

#### Data Types

R supports various data types, including numeric, character, logical, and factors.

#### Vectors

Create a numeric vector:

```R
numeric_vector <- c(1, 2, 3, 4, 5)
```

#### Matrices

Generate a matrix:

```R
matrix_data <- matrix(c(1, 2, 3, 4, 5, 6), nrow = 2, ncol = 3)
```

#### Data Frames

Build a data frame:

```R
data_frame <- data.frame(Name = c("John", "Jane"), Age = c(25, 30))
```

### Basic Operations

#### Addition of Two Numbers

```R
a <- 5
b <- 7
sum_result <- a + b
```

#### Subtraction of Two Numbers

```R
difference_result <- a - b
```

#### Multiplication of Two Numbers

```R
product_result <- a * b
```

#### Division of Two Numbers

```R
quotient_result <- a / b
```

## Data Manipulation

### Data Import/Export

#### Reading CSV

Read data from a CSV file:

```R
data <- read.csv("filename.csv")
```

#### Writing CSV

Write data to a CSV file:

```R
write.csv(data, "output.csv")
```

### Data Exploration

#### Summary Statistics

Get summary statistics of a data frame:

```R
summary(data)
```

#### Head and Tail

View the first or last few rows of a data frame:

```R
head(data)
tail(data)
```

### Data Manipulation

#### Subset Data

Subset data based on a condition:

```R
subset_data <- data[data$Age > 25, ]
```

#### Filter Data (dplyr package)

Filter data using the `dplyr` package:

```R
library(dplyr)
filtered_data <- filter(data, Age > 25)
```

## Statistical Analysis

### Descriptive Statistics

#### Mean

Calculate the mean of a variable:

```R
mean(data$variable)
```

#### Median

Calculate the median of a variable:

```R
median(data$variable)
```

### Hypothesis Testing

#### t-test

Perform a t-test between two groups:

```R
t.test(variable ~ group, data = data)
```

#### ANOVA

Perform ANOVA:

```R
anova_model <- aov(variable ~ group, data = data)
summary(anova_model)
```

## Data Visualization

### Base Plotting

#### Scatter Plot

Create a scatter plot using base plotting:

```R
plot(data$X, data$Y, main = "Scatter Plot", xlab = "X-axis", ylab = "Y-axis")
```

#### Histogram

Create a histogram using base plotting:

```R
hist(data$variable, main = "Histogram", xlab = "Value", col = "lightblue")
```

### ggplot2

#### Scatter Plot

Create a scatter plot using the `ggplot2` package:

```R
library(ggplot2)
ggplot(data, aes(x = X, y = Y)) + geom_point() + labs(title = "Scatter Plot", x = "X-axis", y = "Y-axis")
```

#### Boxplot

Create a boxplot using the `ggplot2` package:

```R
ggplot(data, aes(x = group, y = variable)) + geom_boxplot() + labs(title = "Boxplot", x = "Group", y = "Variable")
```
