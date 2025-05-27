---
home: true
heroImage: /comet.png
heroText: 小陈文档
tagline: 繁星似海 熠熠生辉
actions:
  - text: java后端
    link: /js/
    type: primary
    
  - text: 项目总结
    link: /program/
    type: secondary
  - text: 关于
    link: about.md
    type: success
  - text: java
    link: /js/
    type: primary



footer: MIT Licensed | Copyright © 2025-present chengp
---

# 关于

<div class="relative mt-2">
  <button type="button" class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
    <span class="flex items-center">
      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-5 w-5 flex-shrink-0 rounded-full">
      <span class="ml-3 block truncate">陈国鹏  24  汉族   江西南昌    南昌大学    计算机技术    随时到岗  </span>
    </span>
    <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
      <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
      </svg>
    </span>
  </button>
</div>

## 联系信息

- [qqmail](mailto:1787536379@qq.com)      
- [163邮箱](mailto:13217958672@163.com)


<button id="show-wechat-qr" style="background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;">显示微信二维码</button>

<!-- 微信二维码模态框 -->
<div id="wechat-modal" style="display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4);">
  <!-- 模态框内容 -->
  <div style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 300px; text-align: center; position: relative;">
    <span id="hide-wechat-qr" style="color: #aaa; position: absolute; top: 10px; right: 10px; font-size: 28px; font-weight: bold; cursor: pointer;">&times;</span>
    <p>我的微信二维码</p>
    <img src="/wechat.jpg" alt="微信二维码" style="max-width: 100%; height: auto;">
  </div>
</div>

<script>
// 获取模态框
var modal = document.getElementById("wechat-modal");

// 获取打开模态框的按钮
var btn = document.getElementById("show-wechat-qr");

// 获取关闭模态框的 span 元素
var span = document.getElementById("hide-wechat-qr");

// 当用户点击按钮时，打开模态框
btn.onclick = function() {
  modal.style.display = "block";
}

// 当用户点击 (x) 或模态框外部时关闭模态框
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
</script>


