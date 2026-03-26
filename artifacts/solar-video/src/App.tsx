import VideoTemplate from "@/components/video/VideoTemplate";

export default function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-full" style={{ maxWidth: 'min(100vw, 100vh)', aspectRatio: '1 / 1' }}>
        <VideoTemplate />
      </div>
    </div>
  );
}
