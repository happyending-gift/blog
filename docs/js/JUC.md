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

::: warning  不建议用 Executors 创建线程池
1. **FixedThreadPool 和 SingleThreadPool**：
    - 允许的请求队列长度为Integer.MAX_VALUE，可能会堆积大量的请求，从而导致 OOM。

2. **CachedThreadPool**：
    - 允许的创建线程数量为 Integer.MAX_VALUE，可能会创建大量的线程，从而导致 OOM。

推荐的做法

使用ThreadPoolExecutor直接创建线程池，明确线程池的各项参数，避免资源耗尽的风险
:::

::: tip CountDownLatch
CountDownLatch能够使一个线程在等待另外一些线程完成各自工作之后，再继续执行。

CountDownLatch latch = new CountDownLatch(count);

latch.countDown();

latch.await();
:::


## 核心线程数的确定

IO密集型任务

一般来说：文件读写、DB读写、网络请求等

核心线程数大小设置为 2N+1

CPU密集型任务

一般来说：计算型代码、Bitmap转换、Gson转换等

核心线程数大小设置为 N+1

## 阻塞队列

### ArrayBlockingQueue

- **适用场景**：适用于固定数量任务的排队处理，例如，当需要限制线程池中任务的数量时使用，防止生产速度大于消费速度。
- **线程安全**：使用 ReentrantLock在操作前后加锁来保证线程安全。
- **公平性**：初始化时，可以指定使用公平锁或者非公平锁。

### LinkedBlockingQueue

- **适用场景**：适用于任务量较大的场景，例如一个大型电商平台的订单处理系统，每天会接收到大量的订单请求，这些请求需要被逐一处理和记录。
- **线程安全**：分别使用了读写两把锁，比 ArrayBlockingQueue性能更好。
- **公平性**：只支持非公平锁。
- **使用示例**：FixedThreadPool 和 SingleThreadExecutor。

### SynchronousQueue

- **特点**：不存储元素的阻塞队列，每个插入操作必须等到另一个线程调用移除操作。
- **适用场景**：适用于任务直接提交给线程而不进行排队的场景，可以指定使用公平策略还是非公平策略。
- **优势**：适用于生产者与消费者速度相匹配的场景，可减少任务执行的等待时间。

### DelayedWorkQueue

- **特点**：ScheduledThreadPoolExecutor 常见的例子，例如使用一个 DelayedWorkQueue 来管理一个超时未响应的连接队列。
- **线程安全**：内部使用 ReentrantLock 加锁。

## 拒绝策略

1. **AbortPolicy**：
   - 直接抛出异常，默认策略。

2. **CallerRunsPolicy**：
   - 用调用者所在的线程来执行任务。

3. **DiscardOldestPolicy**：
   - 丢弃阻塞队列中最靠前的任务，并执行当前任务。

4. **DiscardPolicy**：
   - 直接丢弃任务。


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


::: tip Java中的引用类型
- **强引用（Strong Reference）**：
   - 只要引用还存在就不会被回收。

- **软引用（Soft Reference）**：
   - JVM内存不足时，才会回收软引用指向的对象。

- **弱引用（Weak Reference）**：
   - 被垃圾回收线程发现就会被回收。

- **虚引用（Phantom Reference）**：
   - 必须和引用队列一起使用，主要是跟踪垃圾回收。。
::: 

## InheritableThreadLocal原理

InheritableThreadLocal在子线程创建时从父线程拷贝值。具体来说，这个拷贝过程发生在 Java 线程创建时的初始化阶段。

当一个线程（父线程）创建一个新的线程（子线程）时，JVM 会检查父线程中的 InheritableThreadLocal变量，并将这些变量的值复制到子线程中。这样，子线程就可以访问到父线程中 InheritableThreadLocal 变量的值。

线程池中的线程在完成任务后不会立即销毁，而是会被放回池中重用。这意味着如果使用 InheritableThreadLocal存储上下文信息，那么这些信息可能会被重用的线程意外地继承，导致数据错乱。

在使用InheritableThreadLocal 时，需要特别注意线程池的使用场景，确保不会因线程重用而导致数据不一致的问题。通常建议在任务执行完毕后清除InheritableThreadLocal的值，以避免潜在的数据泄露风险。

