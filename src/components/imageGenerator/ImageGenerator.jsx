
import image_default from "../assets/default_image.svg"
import { useState, useRef } from 'react';

const ImageGenerator = () => {

    const [image_url , setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading , setLoading] = useState(false);

    const ImageGenerate = async() => {
        if(inputRef.current.value ===""){
            return 0;
        }
        setLoading(true);
        const response = await fetch(
"https://api.openai.com/v1/images/generations",
{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        Authorization:
        "Bearer YOUR_API_KEY",
        "User-Agent": "Chrome"
    },
    body:JSON.stringify({
        prompt:`${inputRef.current.value}`,
        n:1, 
        size: "512x512"
    }),
}
        );
        let data = await  response.json();
        if (data && data.data && data.data.length > 0) {
            
            const data_array = data.data;
            setImage_url(data_array[0].url);
        } else {
           
            setImage_url("/");
        }

    }
    



  return (

    <div className = "  text-black flex flex-col m-auto items-center mt-[30px] mb-[20px]  gap-[30px] ">
      <div className=" text-[50px]  font-[600] pb-[30]">  Ai image
       <span className = "text-purple-800 font-[600]"> Generator</span>
      </div>

      <div className="flex flex-col ">
    <div className="">
   <img src={image_url ==="/"?image_default:image_url} alt="" className="w-[512px]" />
    </div>
    <div className="">
    <div className={loading?"w-[512px] h-[8px] bg-purple-500 transition duration-[15s] ":"w-[0px] h-[8px] bg-purple-500"}></div>
    <div className={loading?"text-[18px] ": "hidden"}>Loading.....</div>

    </div>
      </div>

      <div className="flex w-[1000px] h-[85px] justify-around items-center rounded-[50px] bg-[#1F3540]  ">

<input  ref={inputRef} type="text" className=" pl-[35px] mr-[35px] placeholder-[#999] w-[600px] h-[50px] bg-transparent border-none outline-none text-[18px] text-white"
 placeholder = "Describe what you want to see" />
<div onClick={()=>{ImageGenerate()}} className="flex items-center justify-center w-[300px] h-[85px] text-[20px] rounded-[50px]  hover:bg-purple-600 cursor-pointer bg-purple-800">
  Generate  
</div>
      </div>
    </div>
   
  )
}

export default ImageGenerator
