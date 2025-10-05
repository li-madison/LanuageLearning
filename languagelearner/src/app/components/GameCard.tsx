type GameCardProps = { 
    title: string; 
  }; 
   
  export default function BookCard({ title }: GameCardProps) { 
    return ( 
      <div className="flex items-center justify-between h-40 bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-2 border-[#1EC0FF]"> 
        <div>
          <h3 className="  text-4xl font-bold text-[#00000] text">{title}</h3> 
        </div>
        <button className="flex bg-[#56D57E] text-3xl hover:bg-green-500 text-white font-semibold py-4 px-4 items-center rounded-full shadow-md transition-transform transform hover:scale-105"> 
          Play    <p className="text-3xl items-center pb-1 pl-2">🎮</p> 
        </button> 
      </div> 
    ); 
  }