---
title: python
author: chengp
---

::: info 

此章节带你回顾，与大模型有关的python代码

:::

## Python的输入/输出方法

### 输出

```python

print("Hello, world!")

```

### 输入

```python
name = input("请输入你的名字: ")
print("我的名字是: ", name)
```

## 注释


### 注释

```python
"""
这是一个多行注释
可以用来描述代码的功能
"""
# 输出Hello world
print("Hello world!") 
```

## 变量的命名规则

- 变量名的长度不受限制
- 变量名由字符、数字与下划线组成，**不能以数字开头**
- 变量名不能与**关键字**重名
- 变量名大小写敏感，通常使用**全小写**
- 变量命名应尽量做到 **“见名知意”**

::: info 输出关键字
```python
import keyword
print(keyword.kwlist)
```
:::


## 常量的定义

- 指的是在程序执行过程中其值**不能被改变**的变量
- 通常将常量的所有字母都**大写**（约定俗成）


## Python 基本数据类型

- 数值
    - 整数
    - 浮点数
    - 复数
- 布尔
- 列表
- 元组
- 集合
- 字典