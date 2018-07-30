## 嘟嘟科技-[公众号吸粉工具前台]-前端项目

#嘟嘟插件项目前端移动端模板

## 参考

* [react 文档](https://reactjs.org/docs/context.html)
* [create-react-app 文档](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app)
* [react-router 文档](https://reacttraining.com/react-router/web/guides/philosophy)
* [mobx 文档](https://cn.mobx.js.org/)
* [antd-mobile 文档](https://mobile.ant.design/docs/react/introduce-cn)
* 前期没图片的情况下，一律使用这个格式的图片，https://dummyimage.com/600x400，自定义图片参照这个格式 想玩点花样可以 https://dummyimage.com/600x400/ff0/f00&text=plugin
* 人民币的符号统一使用 `¥`
* 填坑大全之如果支付出现问题，首先排查 Window.AppConfig.wx.jsConfig 是否有值，然后看url中#前面是否有 ?index, 最后是调起支付时，传的支付参数是否对应。

```
// 开发
npm start

// 打包
npm run build
```

## 一些必要讲解的
- 支持直接引入图片
```js
import React from 'react';
import logo from './logo.png'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```

## 后端约定

以下建议是根据近期项目开发总结而来，请各位务必认真对待。有问题随时提，我们要将此作为今后的约定规范

* 所有请求的数据统一用 data 作为键名

* 请求数据的状态字段为 errcode（0 表示成功，其他后端商定），值类型必须为数字；消息字段为 msg，值类型必须为字符串，这俩字段每个接口都必须返回。

* 一些极常用的约定字段关于物的标题，副标题，内容 分别为 ：title, caption, con；关于人的标题，副标题，内容 分别为 ：nickname (real_name, 如果需要）, intro, con，产品/人物 的 id 是必须的，创建时间 created_time (其他涉及时间的，统一用 xxx_time 的格式) 手机号 mobile 地址 address
  缩略图 thumb (thumb 统一用于列表中的图片字段，image(s)用于详情里的图片)，头像，avatar，价格 price (优惠价：low_price)
  其他字段，按需发挥，但是尽量简明扼要，统一下划线命名
