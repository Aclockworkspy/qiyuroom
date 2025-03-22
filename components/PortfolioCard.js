import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router"; // 用于页面跳转
import Image from "next/image";

export default function PortfolioCard({ title, imageSrc, coverSrc }) {
  const router = useRouter();
  const videoRef = useRef(null);
  const [showCover, setShowCover] = useState(true); // 控制封面是否显示
  const [fadeCover, setFadeCover] = useState(false); // 控制封面渐隐

  // 原本通过 JS 获取 window.innerHeight 动态设置高度，
  // 但使用 Tailwind 提供的 min-h-screen（min-height: 100vh），无需监听窗口变化，
  // 在移动端Safari上表现稳定。

  //  原高度监听逻辑（已移除）
  // const [windowHeight, setWindowHeight] = useState(0);
  // useEffect(() => {
  //   setWindowHeight(window.innerHeight); 组件加载时，初始化 windowHeight，这样 windowHeight 的初始值就等于 window.innerHeight，保证 PortfolioCard 从一开始就等于视窗高度
  //   const handleResize = () => {
  //     setWindowHeight(window.innerHeight);
  //   }; 监听窗口大小变化
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);只在组件加载时执行一次

  useEffect(() => { // 设定定时器 
    const fadeTimer = setTimeout(() => {  
      setFadeCover(true); //3。5 秒后渐隐封面
      }, 3500);
      
    const hideTimer = setTimeout(() => {
      setShowCover(false);   // 4 秒后完全移除封面
        if (videoRef.current) {
          videoRef.current.play(); // 并手动开始播放视频
        }
      }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const isVideo = imageSrc.endsWith(".mp4") || imageSrc.endsWith(".webm") || imageSrc.endsWith(".ogg"); // 判断是否是视频

  return (
    <div className="relative w-full min-h-screen"> 
    {/* 封面图片带淡出效果 */}
    {showCover && coverSrc && (
  <Image
    src={coverSrc}
    alt="Cover"
    layout="fill"
    objectFit="cover"
    objectPosition="center"
    className={`absolute top-0 left-0 w-full h-full z-10 transition-opacity duration-500 ease-in-out ${
      fadeCover ? "opacity-0" : "opacity-100"
    }`}
  />
)}

      {isVideo ? (
        <video
          ref={videoRef} // 绑定 videoRe
          loop
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => e.target.playbackRate = 0.75} 
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={imageSrc} type="video/mp4" />
          Your browser does not support the video tag.
          </video>
      ) : (
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="z-0"
        />
      )}

      {/* 标题：TROPICAL MONSON 是按钮，其它是普通标题 */}
      <div className="absolute bottom-4 left-4 z-50">
        {title === "TROPICAL MONSON" ? (
          <button
            onClick={() => router.push("/projects/tropical-monsoon")}
            className="text-lg font-bold text-black active:text-gray-400 transition"
          >
            {title}
          </button>
        ) : (
          <h2 className="text-lg font-bold text-white">{title}</h2>
        )}
      </div>
    </div>
  );
}