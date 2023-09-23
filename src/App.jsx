import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

// Components
import Favpoke from "./components/Favpoke";
import ReactLoading from 'react-loading';

function App() {
  const pokeApi = "https://pokeapi.co/api/v2";
  const [poke , setPoke] = useState("")
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState("");
  const [number , setNumber] = useState(1);
  const [fav , setFav] = useState([]);
  
  useEffect (() => {

    let abortController = new AbortController();

    const loadPoke = async () => {
      try {

        setLoading(true);
        let response = await axios.get(`${pokeApi}/pokemon/${number}`, {
          signal: abortController.signal
        });

        setPoke(response.data)
        setError("");

      } catch(error) {
        setError("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    }

    loadPoke();

    return () => abortController.abort();

  }, [number])

  

console.log(poke);
// เป็น function ในการเปลี่ยนค่าของ api id ที่เรายิงมาให้ + หรือ - ตาม function ที่เราเขียนเลย
const prevPoke = () => {
  setNumber((number) => number - 1)
};

const nextPoke = () => {
  setNumber((number) => number + 1)
};

// function ในการเก็บค่าของ Pokemon ที่เราจะกด favourite ไว้ โดยจะเก็บ ค่าที่กดไว้ให้อยู่ในรูปแบบ Array OBJ ที่ ...oldState เป็นการบอกว่าเราเคยกดตัวไหนไปแล้วบ้างถ้าไม่มีตรงนี้ ค่าจะไม่มีการเก็บเป็นประวัติไว้
const addFav = () => {
  setFav((oldState) => [...oldState, poke])
};

console.log("Pokemon ID",number);
console.log("Your fav pokemon",fav)


  return (
    <div className="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {loading ? <ReactLoading type='spin' color='black' height={'20%'} width={'20%'}/> : 
          <>
            <h1>{poke?.name}</h1>
            <button onClick={addFav}>Add to favourite</button>
              <br />
            {/* poke?.sprites?.other?.home?.front_default คือ การที่เราสั่งให้ State poke เข้าไปในที่ตรงนั้นเพื่อที่จะไปเอาค่าออกมาให้เราดู ? เป็นการเช็คว่าตัวที่เข้าไปมีค่าอยู่หรือเปล่าถ้าไม่มีก็จะเข้าไปแล้วไม่มีอะไรเกิดขึ้น */}
            <img src={poke?.sprites?.other?.home?.front_default} alt={poke?.name} />
            <ul>
              {poke?.abilities?.map((abil,index) => (
                <li key={index}>{abil?.ability?.name}</li>
              ))}
            </ul>
            <button onClick={prevPoke}>Previous</button>
            <button onClick={nextPoke}>Next</button>
          </>}
        </div>
        <div>
          <h2>Your favourite Pokemon</h2>
          {fav.length > 0 ? <Favpoke fav={fav}/> : <div className="flex h-full justify-center items-center "><p>No favourite pokemon...</p></div>}
        </div>
      </div>
    </div>
   
  );
}

export default App;
