---
title: springboot
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