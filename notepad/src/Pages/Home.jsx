import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'

const Home = () => {

  const [data,setData] = useState([]);
  const [pages,setPages] = useState('');

  const getData = async () => {
    const token = sessionStorage.getItem('Token')
    try {
        const res = await axios.get("https://panicky-spacesuit-colt.cyclic.app/note/", {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(res)
        setPages(res.data.totalPages)
        setData(res.data.data);
    } catch (error) {
        console.log(error);
    }
};

useEffect(()=>{
   getData()
},[]);

  return (
    <div>
      Home Page
    </div>
  )
}

export default Home
