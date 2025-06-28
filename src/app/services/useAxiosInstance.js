import axios from 'axios';


const useAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL ,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

export default useAxiosInstance;



