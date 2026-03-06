import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function PortfolioCard({ title, imageSrc, coverSrc, enableSound }) {
  const router = useRouter();
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [showCover, setShowCover] = useState(true);
  const [fadeCover, setFadeCover] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    let observer;

    const fadeTimer = setTimeout(() => {
      setFadeCover(true);
    }, 3500);

    const hideTimer = setTimeout(() => {
      setShowCover(false);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 4000);

    if (enableSound) {
      observer = new IntersectionObserver(
        ([entry]) => {
          // 暂时不在这里控制 mute
        },
        { threshold: 0.6 }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }
    }

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);

      if (observer) {
        observer.disconnect();
      }
    };
  }, [enableSound]);

  const isVideo =
    imageSrc.endsWith(".mp4") ||
    imageSrc.endsWith(".webm") ||
    imageSrc.endsWith(".ogg");

  return (
    <div ref={cardRef} className="relative w-full min-h-screen">
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
          ref={videoRef}
          loop
          muted={enableSound ? isMuted : true}
          defaultMuted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => (e.target.playbackRate = 0.75)}
          onClick={() => {
            if (!enableSound || !videoRef.current) return;
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
          }}
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
