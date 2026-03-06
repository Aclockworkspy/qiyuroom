import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router"; // 用于页面跳转
import Image from "next/image";

export default function PortfolioCard({ title, imageSrc, coverSrc, enableSound }) {
  const router = useRouter();
  const videoRef = useRef(null);
  const cardRef = useRef(null); 
  const [showCover, setShowCover] = useState(true); // 控制封面是否显示
  const [fadeCover, setFadeCover] = useState(false); // 控制封面渐隐
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => { // 设定定时器 

    let observer; // <<< 修正：observer 提前声明，避免作用域问题

    const fadeTimer = setTimeout(() => {  
      setFadeCover(true); //3。5 秒后渐隐封面
    }, 3500);
      
    const hideTimer = setTimeout(() => {
      setShowCover(false);   // 4 秒后完全移除封面
      if (videoRef.current) {
        videoRef.current.play(); // 并手动开始播放视频
      }
    }, 4000);

    // <<< 新增：只对 enableSound 的项目做画面检测
    if (enableSound) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsMuted(false); // <<< 进入画面，自动开声音
          } else {
            setIsMuted(true); // <<< 离开画面，自动静音
          }
        },
        { threshold: 0.6 } // <<< 至少 60% 出现在画面里才算进入
      );

      observer.observe(cardRef.current);
    }

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);

      if (observer) { // <<< 修正：observer 可能不存在
        observer.disconnect();
      }
    };

  }, [enableSound]);
    

  const isVideo = imageSrc.endsWith(".mp4") || imageSrc.endsWith(".webm") || imageSrc.endsWith(".ogg"); // 判断是否是视频

  return (
    <div ref={cardRef} className="relative w-full min-h-screen"> 
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
          autoPlay
          muted={enableSound ? isMuted : true}
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => e.target.playbackRate = 0.75} 
          onClick={() => enableSound && setIsMuted(!isMuted)} // <<< 点击静音
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