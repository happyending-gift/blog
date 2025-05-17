---
title: 多线程
---
## 线程池种类

### 创建固定线程数的线程池

```java
public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads,0L, TimeUnit.MILLISECONDS,new LinkedBlockingQueue<Runnable>());
}
```


核心线程数与最大线程数一样：没有救急线程。

阻塞队列是 LinkedBlockingQueue：最大容量为 Integer.MAX_VALUE。


### 单线程化的线程池

```java
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService(
        new ThreadPoolExecutor(1, 1,
            0L, TimeUnit.MILLISECONDS,
            new LinkedBlockingQueue<Runnable>()));
}
```


核心线程数和最大线程数都是 1。

阻塞队列是 LinkedBlockingQueue，最大容量为 Integer.MAX_VALUE。


### 可缓存线程池

```java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
        60L, TimeUnit.SECONDS,
        new SynchronousQueue<Runnable>());
}
```

核心线程数为 0：线程池不会保留核心线程。

最大线程数是 Integer.MAX_VALUE：理论上可以创建无限多的线程。

阻塞队列为 SynchronousQueue：不存储元素的阻塞队列，每个插入操作都必须等待一个移出操作。


### 定时线程池

核心线程自己定，最大线程MAX




## ThreadLocalMap的引用类型

::: tip answer
ThreadLocalMap 的 key 是弱引用，而 value 是强引用。
::: 

### 为什么 ThreadLocalMap 的键（Key）是弱引用（Weak Reference）？

  弱引用意味着，如果没有其他引用对象的强引用关系，那么这个仅被弱引用的对象在下次垃圾回收（GC）时就会被回收掉，这样在一定程度上降低了内存泄漏的风险。但同时也引入了新的问题，即键虽然被回收了，但是值对象还在，我们无法获取，也无法删除，这样也会存在内存泄漏的风险。虽然 ThreadLocalMap 中在进行 set 和 get 操作时会进行启发式清理和探测式清理，清理一部分键为 null 的 Entry 对象，但是这只是一种后备选择，最重要的还是开发人员在编写代码时记得在使用完数据后及时调用 remove() 方法手动清理。

::: tip 内存泄漏
有些对象已经不再使用了，但是由于没有正确处理对象的引用关系，使得这个无用的对象还一直被 GC Root 直接或间接引用着，垃圾回收时就无法清理掉这些对象，如果这类对象存在很多，就会导致内存泄漏。
::: 

### 为什么 ThreadLocalMap的值（Value）是强引用？
  如果值是弱引用，那么在没有其他强引用指向这个值的情况下，值可能会在任何时候被垃圾回收器回收。这将导致 ThreadLocal 无法正确地存储和检索数据，因为它们可能会在不被期望的情况下突然消失。
    
  强引用保证数据完整性：使用强引用作为 ThreadLocalMap的值确保了只要ThreadLocal对象存在，其关联的数据值也会一直存在，直到显式地通过remove()方法或线程结束时清理。这样可以保证数据的完整性和一致性，避免因垃圾回收导致的潜在错误。

