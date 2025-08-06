// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <header className="p-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">TagStream</h1>
          <p className="text-white/80 mt-2">Your intelligent bookmark manager</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Welcome to TagStream
          </h2>
          <p className="text-white/80 mb-6">
            Save bookmarks from Twitter, Instagram, and any website
          </p>
          <div className="space-y-4">
            <button className="px-6 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:scale-105 transition">
              Get Started
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}