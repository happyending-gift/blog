---
title: mybatis
author: chengp
---

## MyBatis 分页实现

MyBatis 提供了多种方式来实现分页功能，以下是三种常见的方法。

### 1.使用 RowBounds 对象进行分页

RowBounds 是 MyBatis 提供的一个对象，用于在内存中实现分页。这种方法不直接在 SQL 语句中添加分页逻辑，而是在获取到 ResultSet 后进行分页处理。

### 2. 在 SQL 内直接使用 LIMIT 实现物理分页
这种方法是在 SQL 语句中直接使用数据库支持的分页语法（如 LIMIT 和 OFFSET），适用于大多数数据库

### 3. 使用 MyBatis 的 Interceptor 实现动态分页
这种方法是通过 MyBatis 的 Interceptor 机制，在 SQL 执行前动态拼接分页关键字。

## 分页插件基本原理

使用了mybatis插件接口，自定义实现插件，根据dialect方言，添加添加分页语句分页参数，在select执行前动态拼接分页关键字，

## mybatis实体属性与数据库属性名不同

1、在sql语句中通过别名的方式
```xml
<select id="selectUser" resultType="User">
  SELECT id AS "userId", name AS "userName", email AS "userEmail"
  FROM users
</select>
```
2、在xml文件中通过映射字段名与实体属性名一一对应
```xml
<resultMap id="UserResultMap" type="User">
  <result property="userId" column="id"/>
  <result property="userName" column="name"/>
  <result property="userEmail" column="email"/>
</resultMap>

<select id="selectUser" resultMap="UserResultMap">
  SELECT id, name, email FROM users
</select>
```

::: tip 获取自增主键

```xml
<insert id="insertUser" useGeneratedKeys="true" keyProperty="userId">
INSERT INTO users (name, email) VALUES (#{name}, #{email})
</insert>
```
:::

## MyBatis Mapper 传参方法

在 MyBatis 中，Mapper 接口是与数据库交互的重要组件。正确地传递参数对于编写高效的数据库操作至关重要。以下是几种常见的 Mapper 传参方法：

### 1.使用占位符

在 MyBatis 中，可以使用 #{} 占位符来传递参数。这种方式简单直观，适用于大多数情况。

```xml
<select id="selectUserById" parameterType="int" resultType="User">
  SELECT * FROM users WHERE id = #{id}
</select>
```
### 2.使用 @Param注解

```javascript
public interface UserMapper {
User selectUserByNameAndEmail(@Param("name") String name, @Param("email") String email);
}
```

### 3.使用 Map装载

```javascript
public interface UserMapper {
    User selectUserByParams(Map<String, Object> params);
}
```
```xml
<select id="selectUserByParams" parameterType="map" resultType="User">
    SELECT * FROM users WHERE name = #{name} AND email = #{email}
</select>
```

## MyBatis 动态 SQL

MyBatis 提供了强大的动态 SQL 功能，允许开发者根据不同的条件构建 SQL 语句。这对于处理复杂的查询条件和生成动态 SQL 非常有用。

### 动态 SQL 标签

MyBatis 支持多种动态 SQL 标签，以下是一些常用的标签：

- **<if>**：根据条件包含 SQL 片段。
- **<choose>**、**<when>**、**<otherwise>**：类似于 Java 中的 switch-case 结构。
- **<foreach>**：用于处理集合类型的参数，生成 IN 子句或批量操作 SQL。
- **<trim>**：用于修剪 SQL 片段的前后缀，如 WHERE 子句的前后空格。
- **<set>**：用于动态生成 SET 子句，只包含非空条件。

使用 <if> 标签

```xml
<select id="selectUsers" resultType="User">
  SELECT * FROM users
  <where>
    <if test="id != null">
      id = #{id}
    </if>
    <if test="name != null">
      AND name = #{name}
    </if>
    <if test="email != null">
      AND email = #{email}
    </if>
  </where>
</select>
```

::: tip 不同xml文件,id可以重复吗
MyBatis 中，不同 XML 文件中的 ID **可以重复**，
但需要确保每个 ID 在其所属的命名空间（Namespace）下是唯一的。
这是因为 MyBatis 使用命名空间和 ID 的组合来唯一标识每个语句。
:::

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mapper.UserMapper">
  <select id="selectUser" parameterType="int" resultType="com.example.model.User">
    SELECT * FROM users WHERE id = #{id}
  </select>
</mapper>
```

## mybatis分页

使用rowbounds对象分页，针对resultset结果集进行的分页，不是物理分页，

当然也可以直接在sql上写物理分页参数

## MyBatis 执行器类型及区别

在 MyBatis 中，执行器（Executor）是负责执行 SQL 语句的对象。MyBatis 提供了几种不同的执行器类型，每种类型都有其特定的用途和行为。


### 1. SimpleExecutor

SimpleExecutor 是最简单的执行器类型，它不进行 SQL 语句的重用。

- **特点**：每次执行 select 或 update 语句时，都会开启一个新的 Statement 对象，执行完毕后立即关闭。
- **适用场景**：适用于那些不需要重用 Statement 对象的场景。

### 2. ReuseExecutor

ReuseExecutor 会重用 Statement 对象。

- **特点**：执行 update 或 select 语句时，会将 SQL 作为键在 map 中查询 Statement 对象。如果存在，则重用；如果不存在，则创建一个新的 Statement 对象，并放入 map 中，实现重复利用。
- **适用场景**：适用于需要重用 Statement 对象以提高性能的场景。

### 3. BatchExecutor

BatchExecutor 专门用于执行批处理操作。

- **特点**：只执行 update 语句，将所有语句添加到批处理中，等待统一执行。批处理会使用多个 Statement 对象，每个 Statement 对象都是在 addBatch() 完毕后，等待逐一执行 executeBatch()。
- **适用场景**：适用于需要执行大量更新操作且希望提高性能的场景。

### ResultType 和 ResultMap

在 MyBatis 中，ResultType 和 ResultMap 用于定义如何将查询结果映射到 Java 对象。

ResultType

- **作用**：指定返回结果的类型，通常是实体类的全限定名。
- **示例**：

```xml
  <select id="selectUser" resultType="com.example.model.User">
    SELECT * FROM users WHERE id = #{id}
  </select>
```

ResultMap

- **作用**：当返回的结果集与实体类的字段不完全对应时，可以使用 ResultMap 来定义字段与实体类属性之间的映射关系。

```xml
 <resultMap id="UserResultMap" type="com.example.model.User">
  <result property="id" column="user_id"/>
  <result property="name" column="username"/>
  <result property="email" column="user_email"/>
 </resultMap>

 <select id="selectUser" resultMap="UserResultMap">
  SELECT user_id AS id, username AS name, user_email AS email FROM users WHERE id = #{id}
 </select>
```

## MyBatis 一级缓存与二级缓存

MyBatis 提供了两级缓存机制：一级缓存和二级缓存，以提高数据访问的效率和性能。

### 一级缓存（Session 缓存）

一级缓存是SqlSession级别的缓存，它是本地缓存，也是 MyBatis 中的默认缓存。

特点：

- 每个 SqlSession 都有自己的一级缓存。
- 当执行查询操作时，MyBatis 会先在一级缓存中查找结果，如果命中缓存，则直接返回缓存中的数据。
- 一级缓存是强制性的，不能关闭。
- 一级缓存的范围限定在 SqlSession 的生命周期内，当 SqlSession 关闭后，缓存也就失效了。

###二级缓存（Mapper 缓存）

二级缓存是 Mapper 级别的缓存，它可以跨 SqlSession 共享。

特点：
- 二级缓存是可选的，需要在 MyBatis 配置文件中显式开启。
- 多个 SqlSession 可以共享同一个二级缓存。
- 二级缓存的范围限定在 Mapper 的生命周期内，当应用程序关闭或者刷新缓存时，缓存会失效。