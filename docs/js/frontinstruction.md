---
title: 前端有关指令
author: chengp
---

## nvm 常用命令

| 命令                           | 描述                                                         |
|------------------------------|------------------------------------------------------------|
| nvm list available         | 列出所有可用的 Node.js 版本，可以安装的版本。                           |
| nvm install [版本号]       | 安装指定版本的 Node.js。将 [版本号] 替换为实际的版本号，例如 14.17.0。 |
| nvm list                   | 列出本地已安装的所有 Node.js 版本。                                   |
| nvm use [版本号]           | 切换到已安装的指定版本的 Node.js。将 [版本号] 替换为实际的版本号。         |
| node -v                    | 查看当前正在使用的 Node.js 版本。                                   |
| nvm uninstall [版本号]     | 卸载已安装的指定版本的 Node.js。将 [版本号] 替换为实际的版本号。           |
| nvm alias default [版本号] | 设置默认的 Node.js 版本。将 [版本号] 替换为实际的版本号。    

## npm 常用命令

| npm init                              | 初始化一个新的 npm 项目，创建 package.json 文件。                     |
| npm install                           | 安装一个包或一组包，并且会在当前目录存放一个 node_modules。          |
| npm install <package-name>            | 安装指定的包。                                                 |
| npm install <package-name> --save     | 安装指定的包，并将其添加到 package.json 文件中的依赖列表中。            |
| npm install <package-name> --save-dev | 安装指定的包，并将其添加到 package.json 文件中的开发依赖列表中。          |
| npm install -g <package-name>         | 全局安装指定的包。                                             |
| npm update <package-name>             | 更新指定的包。                                                 |
| npm uninstall <package-name>          | 卸载指定的包。                                                 |
| npm run <script-name>                | 执行 package.json 文件中定义的脚本命令。                             |
| npm search <keyword>                  | 搜索 npm 库中包含指定关键字的包。                                   |
| npm info <package-name>               | 查看指定包的详细信息。                                           |
| npm list                              | 列出当前项目中安装的所有包。                                      |
| npm outdated                          | 列出当前项目中需要更新的包。                                      |
| npm get registry                        | 显示当前npm客户端配置的包注册表地址                               |

::: tip 
npm install 命令用途：
在项目的根目录下运行 npm install 命令，会根据 package.json 文件中的 dependencies 部分安装所有列出的包，并将它们添加到 node_modules 目录中。
同时，npm install 会更新 package-lock.json 文件（或 npm-shrinkwrap.json），以确保在不同环境中安装相同版本的依赖。
:::


## docker有关指令
| 命令            | 说明                           | 指令                  |
|-----------------|--------------------------------|---------------------------|
| docker pull     | 拉取镜像                       | docker pull  |
| docker push     | 推送镜像到DockerRegistry       | docker push  |
| docker images   | 查看本地镜像                   | docker images |
| docker rmi      | 删除本地镜像                   | docker rmi    |
| docker run      | 创建并运行容器（不能重复创建）  | docker run    |
| docker stop     | 停止指定容器                   | docker stop   |
| docker start    | 启动指定容器                   | docker start |
| docker restart  | 重新启动容器                   | docker restart |
| docker rm       | 删除指定容器                   | docs.docker.com |
| docker ps       | 查看容器                       | docker ps     |
| docker logs     | 查看容器运行日志               | docker logs   |
| docker exec     | 进入容器                       | docker exec  |
| docker save     | 保存镜像到本地压缩文件         | docker save  |
| docker load     | 加载本地压缩文件到镜像         | docker load  |


## docker中登录mysql

进入容器


docker exec -it mysql bash


打开交互终端(-i 交互，-t 终端)


mysql -u root -p123456



## conda 配置清华镜像

| 命令                                                         | 说明                                       |
|--------------------------------------------------------------|--------------------------------------------|
| conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/ | 添加清华大学镜像站点的免费包频道             |
| conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/ | 添加清华大学镜像站点的主包频道               |

::: tip 
安装指定下载源

install zhihuai -i https://pypi.tuna.tsinghua.edu.cn/simple

在anaconda安装pytoch

pip3 install torch torchvision torchaudio
:::


::: tip 直接用pycharm不就可以了，一站式，全搞定
anaconda可以管理多个环境，比如我可以创建两个conda环境，一个用来做开发，只需要Python和常见的几个库，另一个用来学习神经网络，

安装pytorch以及配套的深度学习库，不用担心冲突
:::