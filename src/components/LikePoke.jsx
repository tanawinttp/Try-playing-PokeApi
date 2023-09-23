import { useState } from 'react'
import {FaHeart, FaRegHeart} from 'react-icons/fa'

const LikePoke = () => {

    const [like , setLike] = useState(false);

    // function นี้เป็นการเช็คว่าถ้ากดปุ่ม function onClick จะมาทำการเรียก function ตัวนีมาดูจะเป็นการสลับ ture,false
    const toggleLike = () => {
        setLike((check) => !check)
    }


  return (
    <div>
        <button onClick={toggleLike}>
            {/* ถ้ากด like icons FaHeart จะแสดง ถ้าไม่ได้กด like จะเป็น FaRegHeart */}
            {like ? <FaHeart className='text-red-500'/> : <FaRegHeart />}
        </button>
    </div>
  )
}

export default LikePoke