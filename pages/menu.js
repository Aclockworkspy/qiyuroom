// pages/menu.js
export default function MenuPage() {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col justify-start items-start p-16">
        <h1 className="text-3xl font-bold mb-6">About</h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          qiyusroom is the practice platform and cyber room of Qiyu Chen. This space
          encompasses explorations in visual art and spatial narratives.
          Starting from architecture, it extends into urban studies of Southern
          California, installation art, and moving images—using various mediums
          as a way to share stories and psychic landscape.
        </p>
        <div className="absolute bottom-4 right-4 text-sm text-gray-500">
          Thursday, February 13, 2025
        </div>
      </div>
    );
  }
  