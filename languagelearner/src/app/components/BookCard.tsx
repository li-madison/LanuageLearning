type BookCardProps = { 
    title: string; 
    author?: string; 
  }; 
   
  export default function BookCard({ title, author}: BookCardProps) { 
    return ( 
      <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-2 border-[#1EC0FF]"> 
        <div>
          <h3 className="  text-4xl font-bold text-[#00000] text">{title}</h3> 
          {author && <p className="text-gray-600 ml-4">by {author}</p>} 
        </div>
        <button className="flex bg-[#56D57E] text-1xl hover:bg-green-500 text-white font-semibold py-1.5 px-4 items-center rounded-full shadow-md transition-transform transform hover:scale-105"> 
          Read    <p className="text-2xl items-center pb-1 pl-2">📖</p> 
        </button> 
      </div> 
    ); 
  }