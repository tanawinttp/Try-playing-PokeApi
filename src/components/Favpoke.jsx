import LikePoke from "./LikePoke"
// ใช้ props มาจาก file App.jsx
const Favpoke = ({fav}) => {
  return (
    <div className="grid sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
        {fav?.map((data , index) => (
            <div key={index}>
                <h3>{data.name}</h3>
                <img src={data?.sprites?.other?.home?.front_default} alt={data?.name} />
                <LikePoke/>
            </div>
        ))}
    </div>
  )
}

export default Favpoke