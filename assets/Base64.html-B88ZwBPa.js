import{_ as t,c as r,b as e,o as i}from"./app-DI5GBXpc.js";const a={};function c(s,n){return i(),r("div",null,n[0]||(n[0]=[e("p",null,"import java.util.Base64;",-1),e("p",null,"public class Base64Util { public Base64Util() { }",-1),e("pre",null,[e("code",null,`public static String decode(String base64String) {
    if (base64String == null) {
        return base64String;
    } else {
        try {
            byte[] decodedBytes = Base64.getDecoder().decode(base64String);
            String decodedString = new String(decodedBytes);
            return decodedString;
        } catch (Exception var3) {
            Exception e = var3;
            throw new RuntimeException(e);
        }
    }
}

public static String encode(String str) {
    String s = null;
    if (str == null) {
        return str;
    } else {
        try {
            s = Base64.getEncoder().encodeToString(str.getBytes());
            return s;
        } catch (Exception var3) {
            Exception e = var3;
            throw new RuntimeException(e);
        }
    }
}
`)],-1),e("p",null,"}",-1)]))}const d=t(a,[["render",c]]),l=JSON.parse('{"path":"/program/Base64.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[],"git":{"updatedTime":1750435961000,"contributors":[{"name":"“root”","username":"","email":"1787536379@qq.com","commits":1}],"changelog":[{"hash":"93aa0caa7e7b8f7e1bd2be147ee7d060a0008323","time":1750435961000,"email":"1787536379@qq.com","author":"“root”","message":"add 学习文档"}]},"filePathRelative":"program/Base64.md","excerpt":"<p>import java.util.Base64;</p>\\n<p>public class Base64Util {\\npublic Base64Util() {\\n}</p>\\n<pre><code>public static String decode(String base64String) {\\n    if (base64String == null) {\\n        return base64String;\\n    } else {\\n        try {\\n            byte[] decodedBytes = Base64.getDecoder().decode(base64String);\\n            String decodedString = new String(decodedBytes);\\n            return decodedString;\\n        } catch (Exception var3) {\\n            Exception e = var3;\\n            throw new RuntimeException(e);\\n        }\\n    }\\n}\\n\\npublic static String encode(String str) {\\n    String s = null;\\n    if (str == null) {\\n        return str;\\n    } else {\\n        try {\\n            s = Base64.getEncoder().encodeToString(str.getBytes());\\n            return s;\\n        } catch (Exception var3) {\\n            Exception e = var3;\\n            throw new RuntimeException(e);\\n        }\\n    }\\n}\\n</code></pre>"}');export{d as comp,l as data};
