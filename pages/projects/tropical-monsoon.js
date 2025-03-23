// pages/tropical-monson.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const images = [
  "/images/tropical-monson/01.jpeg",
  "/images/tropical-monson/02.jpeg",
  "/images/tropical-monson/03.jpeg",
];

export default function TropicalMonsonPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

// translateX触发
  const [slideActive, setSlideActive] = useState(false);
 useEffect(() => { // 每次切换 index，先重置 slide 状态
  setSlideActive(false);
  const timeout = setTimeout(() => setSlideActive(true), 100); // 延迟触发滑动
  return () => clearTimeout(timeout);
}, [currentIndex]);
// 改动截至

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4500); // 每 4.5 秒切换一次

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden flex flex-col">

      {/* 固定按钮 */}
      <button 
        onClick={() => router.push("/")}
        className="fixed top-4 left-4 z-50 mb-6 text-center text-grey opacity-50 text-[14px] font-bold active:text-gray-400 transition-none"
      >
        QIYU ROOM
      </button>

      <button
        onClick={() => router.push("/menu")}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 mb-6 text-center text-grey opacity-50 text-[14px] font-bold active:text-gray-400 transition-none"
      >
        MENU
      </button>

      {/* 左下角描述文字 */}
      <div className="absolute bottom-3 left-3 w-[80%] text-[14px] p-2 z-30 text-black
       sm:bottom-10 sm:left-20 sm:w-[50%] sm:text-[18px] sm:p-4
       ">
        
        <p className="mb-4">
        I spent two months documenting the end of winter 2023 in Los Angeles through the camera, tracing a cross-section from Echo Park along the 101 freeway to Hollenbeck Park. Most of the material comes from places where all has gone topsy-turvy by rain, trivial images of sunlight, and wet rooms.
        </p>

        <p>
        It began as an intention to shoot without subjects or direction—an exercise in not searching for meaning. As the footage grew, the captured stretches of water vapor became a conduit for nostalgia. These fragmented cityscapes, connecting memories from elsewhere, swept through my room like a monsoon. They reshaped the city for me. This winter, Los Angeles, an arrival city, unfolded to me like an opening fist, had never been more intimate.
        </p>
      </div>

      {/* 图片幻灯片 */}
      <div className="relative w-full h-screen">
        {images.map((img, index) => (
          <div
            key={index}
            className={`
              absolute top-0 left-0 w-full h-full
              transition-opacity duration-1000 ease-in-out
              ${index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"}
              pointer-events-none
            `}
          >
            <div
  className={`
    relative h-full w-[120vw]
    transition-transform duration-[4500ms] ease-out
    ${index === currentIndex && slideActive ? "max-sm:-translate-x-[20vw]" : "translate-x-0"}
  `}
>
            {/* 使用固定尺寸 平移动画 */}
            <Image
                src={img}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className={`
                  filter saturate-50
                  ${index === currentIndex ? "animate-slowLeftOnce" : ""}
                `}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}