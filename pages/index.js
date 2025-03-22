// pages/index.js
import { useRouter } from "next/router";
import PortfolioCard from "../components/PortfolioCard";

export default function Home() {
  const router = useRouter();

  const portfolioItems = [
    { title: "TROPICAL MONSON", imageSrc: "/images/work3.png", coverSrc: null }, 
    { title: "A FRAGILE ROOM", imageSrc: "/videos/work1.mp4", coverSrc: "/images/work1-cover.png" }, // 视频+封面
    { title: "MEMORIES FOR ELSEWHERE INHERITANCE", imageSrc: "/videos/work2.mp4", coverSrc: null }, // 确保非视频不传 coverSrc
    { title: "THE WAY I MEASURE TIME", imageSrc: "/videos/work4.mp4", coverSrc: null }, 
  ];

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden flex flex-col">
      <button className="fixed top-4 left-4 z-50 text-3xl mb-6 text-center text-grey opacity-75 text-[14px] font-medium active:text-gray-400 transition-none"//text-3xl 和 text-[14px] 会冲突 Tailwind 会优先14px
      > 
       QIYUSROOM
      </button>

      <button
        onClick={() => router.push("/menu")} // 确保 router 已定义
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 text-3xl mb-6 text-center text-grey opacity-75 text-[14px] font-medium active:text-gray-400 transition-none"
      >
        MENU
      </button>

      <div className="flex flex-col">
        {portfolioItems.map((item, index) => (
          <PortfolioCard key={index} title={item.title} imageSrc={item.imageSrc} coverSrc={item.coverSrc}
          />
        ))}
      </div>
    </div>
  );
}