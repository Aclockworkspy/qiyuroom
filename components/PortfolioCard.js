import { useEffect, useState } from "react";
import Image from "next/image";

export default function PortfolioCard({ title, imageSrc, coverSrc }) {
  const [windowHeight, setWindowHeight] = useState(0);
  const [showCover, setShowCover] = useState(true);

  useEffect(() => {
    setWindowHeight(window.innerHeight); // 组件加载时，初始化 windowHeight，这样 windowHeight 的初始值就等于 window.innerHeight，保证 PortfolioCard 从一开始就等于视窗高度

    const handleResize = () => {
      setWindowHeight(window.innerHeight); // 监听窗口大小变化
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);  // 只在组件加载时执行一次

  useEffect(() => { // 4 秒后隐藏封面
    const timer = setTimeout(() => {
      setShowCover(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const isVideo = imageSrc.endsWith(".mp4") || imageSrc.endsWith(".webm") || imageSrc.endsWith(".ogg"); // 判断是否是视频

  return (
    <div
      className="relative w-full" style={{ height: `${windowHeight}px` }} //  动态设置 PortfolioCard 高度
    >
      {showCover && coverSrc && (
        <Image
          src={coverSrc}
          alt="Cover"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute top-0 left-0 w-full h-full z-10 transition-opacity duration-1000 ease-in-out"
        />
      )}

      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedMetadata={(e) => e.target.playbackRate = 0.75} //
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
      
      <div className="absolute bottom-4 left-4 z-50">
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
    </div>
  );
}