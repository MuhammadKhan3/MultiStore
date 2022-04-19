import axios from 'axios'

const stockThunk = (data) => {
  return async()=>{
    //   console.log(data);
      const stock=async ()=>{
       const response= await axios.post('http://localhost:8000/add-stock',data);
      }
      stock();
  }
}

export default stockThunk;