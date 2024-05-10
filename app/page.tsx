import Chat from "@/components/chat";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-full h-full max-w-[700px]">
        <Chat />
      </div>
    </main>
  );
}
