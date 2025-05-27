---
title: springboot
author: chengp
---

## Spring Boot 与 Spring MVC 的区别

Spring Boot 和 Spring MVC 都是 Spring 家族中的重要成员，但它们的定位和用途有所不同。

### Spring Boot

- **定义**：Spring Boot 是基于 Spring 框架的快速开发框架。
- **特点**：
    - 提供了快速开发的便利性。
    - 简化了 Spring 应用的初始搭建和开发过程。
    - 内嵌了 Tomcat、Jetty 等服务器，无需部署 WAR 文件。
    - 提供了生产就绪的特性，如健康检查、外部化配置等。
- **用途**：适用于构建独立的、生产级别的 Spring 应用。

### Spring MVC

- **定义**：Spring MVC 是 Spring 框架中的一个模块，专注于构建 Web 应用。
- **特点**：
    - 提供了模型-视图-控制器（MVC）架构的支持。
    - 支持 RESTful Web 服务。
    - 可以与 Spring 框架的其他模块无缝集成。
- **用途**：适用于构建 Web 应用，特别是需要与 Spring 框架集成的应用。

### Spring Cloud

- **定义**：Spring Cloud 是一个完整的微服务框架。
- **特点**：
    - 提供了微服务架构下的各种解决方案，如服务发现、配置管理、断路器、智能路由等。
    - 依赖于 Spring Boot，利用 Spring Boot 的特性简化了微服务的开发。
- **用途**：适用于构建和管理微服务架构。

### Spring Boot 与 Spring MVC 的关系

Spring Boot 提供了集成 Spring MVC 的能力。当开发 Web 应用时，Spring Boot 默认使用 Spring MVC 作为 Web 层的框架。这意味着在 Spring Boot 应用中开发 Web 功能，本质上就是在使用 Spring MVC。


## Controller 与 RestController 的区别

在 Spring MVC 框架中，Controller 和 RestController 都用于处理 HTTP 请求，但它们在返回类型和用途上有所不同。

### RestController

特点

- @RestController 是@Controller 和@ResponseBody的组合注解。
- 主要用于构建 RESTful Web 服务。

返回类型

- 默认返回 JSON 或 XML 格式的数据。
- 适用于需要直接返回数据而不是视图的 API 接口。

### Controller

特点

- @Controller用于定义一个控制器，处理 HTTP 请求并返回响应。
- 可以返回ModelAndView，即模型数据和视图的组合。

返回类型

- 可以返回视图（View），通常用于 Web 应用。
- 需要通过视图解析器将模型数据渲染到页面上。

### @ResponseBody
作用

-@ResponseBody注解用于将返回对象直接转换为 JSON 或 XML 格式，并写入 HTTP 响应体中。
- 不经过视图解析器处理，直接返回数据。

## Spring Boot 自动配置类

Spring Boot 的自动配置机制是其核心特性之一，它简化了 Spring 应用的配置过程。以下是 Spring Boot 自动配置类的工作原理：

引入@EnableConfigurationProperties

通过@SpringBootConfiguration注解引入@EnableConfigurationProperties注解，它负责自动配置。

引入@Import

通过@EnableConfigurationProperties注解引入@Import注解。容器启动时，加载 IOC 容器会解析@Import注解。

Deferred Import Selector

@Import注解导入了一个 DeferredImportSelector，其目的是使自动配置类最后执行。

读取META-INF/spring.factories

Spring Boot 读取META-INF目录下的spring.factories文件，该文件中列出了所有自动配置类。

使用@Conditional 注解

最后，通过@Conditional注解排除无效配置类，确保只有符合条件的配置类被加载。

### 工作流程总结

1. **启动应用**：Spring Boot 应用启动。
2. **加载配置**：读取 spring.factories 文件中的自动配置类。
3. **条件判断**：使用 @Conditional 注解进行条件判断。
4. **执行配置**：符合条件的配置类被执行，完成自动配置。


## Spring 注解概览

在 Spring 框架中，注解（Annotations）是实现依赖注入（Dependency Injection）和配置类的重要手段。以下是一些常用的注解及其说明：

### @Component 与 @Bean

- **@Component**
  - 注解作用于类。
  - 标识该类为一个 Spring 管理的组件（Bean）。

- **@Bean**
  - 注解作用于方法。
  - 用于显式地声明一个 Bean，自定义性更强。
  - 在某些情况下，只能通过@Bean注解注册 Bean。

### @Autowired 与 @Resource

- **@Autowired**
  - Spring 提供的注解。
  - 默认的注入方式为 byType（根据类型进行匹配）。
  - 可以通过@Qualifier注解来显式指定名称。
  - 支持在构造函数、方法、字段和参数上使用。

- **@Resource**
  - JDK 提供的注解。
  - 默认注入方式为 byName（根据名称进行匹配）。
  - 可以通过name属性来显式指定名称。
  - 主要用于字段和方法上的注入，不支持在构造函数或参数上使用。



## @Bean 的生命周期

在 Spring 框架中，@Bean 注解用于声明一个由 Spring 容器管理的 Bean。以下是 Bean 的完整生命周期流程：

1. **实例化（Instantiation）**
  - IOC 容器启动后，通过反射机制实例化 Bean。

2. **属性赋值（Populate properties）**
  - 为 Bean 的属性赋值。

3. **Aware 接口检查**
  - 检查实现了Aware接口的 Bean，并调用相应的方法，如setBeanFactory、setApplicationContext等。

4. **BeanPostProcessor 前置处理**
  - 在初始化方法调用之前执行BeanPostProcessor接口的postProcessBeforeInitialization方法。

5. **InitializingBean 接口和 init-method**
  - 检查实现了InitializingBean接口的 Bean，并调用其afterPropertiesSet方法。
  - 检查定义了init-method的 Bean，并调用指定的初始化方法。

6. **BeanPostProcessor 后置处理**
  - 在初始化方法调用之后执行BeanPostProcessor接口的postProcessAfterInitialization方法。

7. **使用（Usage）**
  - Bean 准备就绪，可以被应用程序使用了。

8. **销毁前处理（Destruction）**
  - 当容器关闭时，如果 Bean 实现了DisposableBean 接口，将调用其destroy方法。
  - 如果 Bean 定义了destroy-method，则调用该方法进行销毁。


## Bean 的线程安全性

在 Spring 框架中，Bean 的线程安全性是一个重要的考虑因素，特别是对于那些有状态的 Bean。

### 有状态 Bean

- **定义**：有状态 Bean 是指包含可变成员变量的对象。
- **问题**：如果多个线程同时访问和修改这些可变的成员变量，就可能引发线程安全问题。

### 无状态 Bean

- **定义**：无状态 Bean 是指不包含可变成员变量的对象，或者其成员变量不会影响其业务逻辑的对象。
- **优势**：无状态 Bean 更容易保证线程安全，因为它们不会受到并发访问的影响。

## Spring MVC 工作原理

Spring MVC 是基于模型-视图-控制器（Model-View-Controller，简称 MVC）设计模式的 Web 框架。其核心思想是通过将业务逻辑、数据、显示分离来组织代码。

1. **客户端请求**
  - 客户端（通常是浏览器）发送 HTTP 请求。

2. **DispatcherServlet 拦截**
  - DispatcherServlet拦截请求并作为前端控制器。

3. **HandlerMapping 匹配**
  - DispatcherServlet调用HandlerMapping。
  - HandlerMapping 根据 URL 匹配查找能处理请求的Handler（即Controller 控制器）。
  - 将请求涉及到的拦截器和Handler一起封装。

4. **HandlerAdapter 执行**
  - DispatcherServlet 调用HandlerAdapter适配器执行Handler。

5. **返回 ModelAndView**
  - Handler完成对用户请求的处理后，返回一个ModelAndView对象给DispatcherServlet。
  - ModelAndView 包含了数据模型以及相应的视图信息。
    - **Model**：返回的数据对象。
    - **View**：逻辑上的视图。

6. **ViewResolver 解析**
  - ViewResolver根据逻辑视图查找实际的视图。

7. **视图渲染**
  - DispatcherServlet把返回的Model传给视图（视图渲染）。

8. **返回响应**
  - 将渲染后的视图返回给请求者（浏览器）。

## 统一异常处理

在 Spring 应用中，统一异常处理是一种常见的需求，它有助于集中管理和响应应用程序中的各种异常。推荐使用注解的方式进行统一异常处理，具体会使用到 @ControllerAdvice 和 @ExceptionHandler 这两个注解。

### @ControllerAdvice

- @ControllerAdvice 是一个类级别的注解，用于定义全局异常处理。
- 它可以指定所要应用的组件（如 @Controller、@RestController 等）。
- 通过定义一个或多个 @ControllerAdvice 类，可以集中处理特定类型的异常。

### @ExceptionHandler

- @ExceptionHandler 是一个方法级别的注解，用于处理特定的异常类型。
- 在 @ControllerAdvice 类中定义方法，并使用 @ExceptionHandler 注解指定该方法处理哪种异常。
- 可以针对不同的异常类型定义不同的处理逻辑。

### 示例

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return new ResponseEntity<>("Global exception handler: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<String> handleCustomException(CustomException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
```


## 循环依赖及其解决方案

在 Spring 框架中，循环依赖（Circular Dependency）指的是两个或多个 Bean 相互引用，导致无法完成初始化。为了解决这个问题，Spring 框架通过使用三级缓存机制来处理循环依赖。

### 使用@Lazy注解
- 通过在构造函数注入上添加@Lazy注解，可以延迟 Bean 的初始化，从而避免循环依赖。

### 三级缓存机制

1. **第一级缓存（Singleton Cache）**
  - 保存已经经过完整生命周期的 Bean 实例。

2. **第二级缓存（Early Singleton Cache）**
  - 保存尚未经过完整生命周期的 Bean 实例。

3. **第三级缓存（Singleton Factories Cache）**
  - 可以生成原始 Bean 对象或代理对象（如果 Bean 被 AOP 切面代理）。
  - 仅对单例 Bean 生效。

### 处理循环依赖

当发生循环依赖时：
- Spring 会从第三级缓存singletonFactories中获取ObjectFactory。
- 调用ObjectFactory的 getObject()方法来获取循环依赖对象的前期暴露对象（虽然还没有初始化完成，但可以获取到该对象在堆中的存储地址）。
- 将这个前期暴露对象放入第二级缓存中。

通过这种方式，Spring 允许 Bean 在初始化过程中引用其他 Bean，从而解决了循环依赖的问题。

## Spring Bean 作用域

在 Spring 框架中，Bean 的作用域（Scope）定义了 Bean 实例的生命周期和可见性。以下是几种常见的作用域：

### Singleton

- **描述**：唯一 Bean 实例。
- **特点**：在 Spring 应用的整个生命周期中，每个由 Spring 容器管理的 singleton 作用域的 Bean 只有一个实例。
- **使用场景**：当 Bean 可以被多个地方安全共享时。

### Prototype

- **描述**：每次请求都会创建一个新的 Bean 实例。
- **特点**：每次请求该 Bean 时，Spring 容器都会创建一个新的实例。
- **使用场景**：当 Bean 的实例化需要特定的配置或状态时。

### Request

- **描述**：每一次 HTTP 请求都会产生一个新的 Bean。
- **特点**：Bean 的生命周期与 HTTP 请求相同，请求结束后 Bean 被销毁。
- **使用场景**：处理每个 HTTP 请求所需的临时数据。

### Session

- **描述**：每一个 HTTP Session 会产生一个新的 Bean。
- **特点**：Bean 的生命周期与 HTTP 会话相同，会话结束后 Bean 被销毁。
- **使用场景**：当需要在同一个会话中保持 Bean 状态时。


## 异常处理类

在 Spring 框架中，异常处理类用于集中处理应用程序中的异常。

### @ControllerAdvice
- @ControllerAdvice 注解用于定义全局异常处理类。
- 它可以捕获控制器层抛出的异常，并进行统一处理。

### @ExceptionHandler
- @ExceptionHandler 注解声明异常处理方法。
- 用于指定哪些异常将由特定的处理方法来处理。

---

## JPA注解

JPA（Java Persistence API）提供了一系列的注解，用于实体映射和操作。

### @Entity
- @Entity 注解声明一个类对应一个数据库实体。
- 被注解的类将映射到数据库中的一个表。

### @Id
- @Id 注解声明一个字段为主键。
- 使用 @Id 注解后，需要定义主键的生成策略。

### @GeneratedValue
- @GeneratedValue 注解指定主键生成策略。
- 例如，可以使用 @GeneratedValue(strategy = GenerationType.IDENTITY) 来指定主键的生成策略。

### @Transient
- @Transient 注解声明不需要与数据库映射的字段。
- 被注解的字段在保存时不会被保存到数据库中。

---

## 事务管理

### @Transactional
- @Transactional 注解用于声明事务管理。
- 可以指定在遇到特定异常时进行回滚。
- 例如，@Transactional(rollbackFor = Exception.class) 让事务在遇到非运行时异常时也回滚。


## spring事务传播行为
事务传播是指一个事务调用另一个事务时，这个事务方法对另一个事务方法（调用者）的态度，a\b方法开启事务，a方法中调用了B方法，b方法传播到a方法的事务中，产生传播行为，这时我们需要对b方法进行处理。
他分7种：

第一种b在运行时需要事务，require,required-new，mandatory{抛异常}

第二种b在运行时不需要事务，supports,{有融入}not supported{有挂起}，never{有抛异常}

Nested支持嵌套事务，实现独立回滚

## DAO接口工作原理

其工作原理时JDK动态代理， mybatis运行时会为dao接口生成动态代理对象，

对象会拦截方法，执行mappedstatement 的sql


## Spring 框架中的设计模式

Spring 框架广泛地应用了多种设计模式，以下是一些主要的设计模式及其在 Spring 中的应用：

### 工厂模式 (Factory Pattern)
- **应用**：BeanFactory 就用到了工厂模式。
- **描述**：工厂模式用于创建对象，而无需指定确切的类。Spring 通过 BeanFactory 提供了一个创建对象的接口。

### 单例模式 (Singleton Pattern)
- **应用**：Bean 的单例模式。
- **描述**：确保一个类只有一个实例，并提供一个全局访问点。Spring 中的 Bean 默认是单例的。

### 代理模式 (Proxy Pattern)
- **应用**：AOP 用到 JDK 的代理模式。
- **描述**：代理模式为其他对象提供一个代理以控制对这个对象的访问。Spring AOP（面向切面编程）功能就是基于代理模式实现的。

### 模板模式 (Template Pattern)
- **应用**：JDBC 模板。
- **描述**：定义一个操作中的算法骨架，而将一些步骤延迟到子类中。Spring 的 JdbcTemplate 就是模板模式的体现，它定义了数据库操作的通用步骤。

### 观察者模式 (Observer Pattern)
- **应用**：Spring 监听器的实现。
- **描述**：定义对象间的一种一对多的依赖关系，当一个对象改变状态时，所有依赖于它的对象都得到通知并被自动更新。Spring 事件监听器就是观察者模式的应用。

## Spring Boot 简介

Spring Boot 是一个基于 Spring 框架的快速开发框架，它简化了基于 Spring 的应用开发，提供了快速启动和部署 Spring 应用的能力。

### 优点

1. **自动依赖管理**：
- spring-boot-starter-web 会自动依赖其他组件，减少 Maven 配置。

2. **解决 Maven 依赖冲突**：
- Spring Boot 通过管理依赖版本来帮助解决 Maven 依赖冲突。

3. **内置服务器**：
- 内置 Tomcat、Jetty、Undertow 等服务器，不需要打成 WAR 包，只需要打成可执行的 JAR 包就可以执行，所有依赖包都在一个 JAR 包中。

4. **自动装配 Bean**：
- Spring Boot 会根据当前类路径下的类自动装配 Bean，例如添加 spring-boot-starter-web 就能拥有 Web 功能。

5. **无 XML 配置**：
- 配置过程无需 XML 文件就能完成所有配置工作，通过注解和 application.properties 或 application.yml 文件进行配置。


::: tip 配置文件类型
properties优先加载级大于yml。
:::

## Spring Boot 核心注解

Spring Boot 提供了一系列注解来简化 Spring 应用的开发，以下是几个核心注解：

### @SpringBootApplication
- 组合注解，包含了 @SpringBootConfiguration、@EnableAutoConfiguration 和 @ComponentScan。
- 表明这是一个 Spring Boot 应用的启动类。

### @SpringBootConfiguration
- 标识这是一个 Spring Boot 配置类。

### @EnableAutoConfiguration
- 像容器中导入一个 selector，扫描 classpath 下的自动配置类，将这些自动加载为配置类。

### @ComponentScan
- 标识扫描路径，默认扫描的是启动类所在的当前目录。
- 用于扫描并注册 Spring 组件，如 @Component、@Service、@Repository 和 @Controller 等。

::: tip

可以实现applicationrunner、commandlinerunner接口的runner方法实现，

可以用来进行一些定时任务（？），当然启动类也可以，在main方法中书写执行代码
:::


## Spring 设计模式

Spring 框架中广泛使用了多种设计模式，以下是一些核心的设计模式及其应用：

### 控制反转 (IoC) 模式
- **描述**：将对象的创建交给 Spring 管理，实现了依赖的注入 (DI)。
- **应用**：通过 @Autowired 注解注解实现 Bean 之间的依赖注入。

### 工厂模式
- **描述**：ApplicationContext 即 Spring 容器，充当工厂类，负责创建 Bean 实例。
- **应用**：通过配置文件或注解定义 Bean 的创建逻辑。

### 单例模式
- **描述**：ApplicationContext 是一个单例 Bean，而每个 Bean 默认也是单例的。
- **应用**：确保 Bean 在整个应用程序中只有一个实例。

### 模板方法模式
- **描述**：定义一个操作中的算法骨架，而将一些步骤延迟到子类中。
- **应用**：RedisTemplate 提供了一套统一的操作 Redis 的方法。

### 观察者模式
- **描述**：定义对象间的一种一对多的依赖关系，当一个对象改变状态时，所有依赖于它的对象都得到通知并被自动更新。
- **应用**：基于事件驱动的编程方式，如 ApplicationEvent、ApplicationListener。

### 策略模式
- **描述**：使用面向接口的编程思想定义策略层。
- **应用**：如 AuthenticationManager 策略接口等。

### 代理模式
- **描述**：为其他对象提供一个代理以控制对这个对象的访问。
- **应用**：AOP（面向切面编程）使用动态代理方式。

## 适配器模式
- **描述**：允许接口不兼容的类可以一起工作。
- **应用**：如 AdvisorAdapter 等，可以让任意类匹配某接口。


## Spring MVC 请求处理流程

Spring MVC 框架处理客户端请求的流程如下：

1. **发送请求**：
  - 客户端（通常是浏览器）发送一个 HTTP 请求到服务器。

2. **请求处理**：
  - 请求被 Spring 的 `DispatcherServlet` 捕获，它是 Spring MVC 的前端控制器。

3. **请求映射**：
  - `DispatcherServlet` 使用 `HandlerMapping` 来确定请求应该由哪个控制器（`Controller`）处理。

4. **调用控制器**：
  - `DispatcherServlet` 调用匹配的控制器方法。

5. **业务逻辑**：
  - 控制器执行业务逻辑，可能包括调用服务层和数据访问层。

6. **返回视图**：
  - 控制器返回一个视图名称，通常通过 `ModelAndView` 对象。

7. **视图解析**：
  - `DispatcherServlet` 使用 `ViewResolver` 来解析视图名称，并找到实际的视图模板。

8. **渲染响应**：
  - 视图模板（如 JSP、Thymeleaf 等）被渲染成 HTML 内容。

9. **返回客户端**：
  - 最终的响应（包括 HTML 内容）被发送回客户端。