import GameCard from "../components/GameCard";

export default function Game() {
  return (
    <div className="min-h-screen bg-[#77d9ff] bg-stripes py-12 relative overflow-hidden">
      <h1 className="text-5xl font-bold text-center text-[#1EC0FF] mb-12 title">
      🎮 Games
      </h1>

      <div className="grid grid-cols-2 w-full gap-8 max-w-6xl mx-auto">
        <GameCard title={"Matching"}/>
        <GameCard title={""}/>
        <GameCard title={""}/>
        <GameCard title={""}/>
    
      </div>
    </div>
  );
}
