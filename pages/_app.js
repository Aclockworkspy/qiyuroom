// pages/_app.js

// 引入全局样式
import '../styles/globals.css'

// 引入 next/head，用于在页面中添加 <head> 标签内的内容
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* 网页标签页图标（favicon） */}
        <link rel="icon" href="/favicon.png" type="image/png" />

        {/* 设置视口缩放和适配，确保移动端正常显示 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 网页标题（显示在标签页上） */}
        <title>qiyusroom</title>
      </Head>

      {/* 加载具体页面组件（index.js、menu.js 等） */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
