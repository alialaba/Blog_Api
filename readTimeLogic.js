exports.getReadTime = async  ( blogBody)=>{
    //I set wordsPerMinute to 200
     const wordsPerMinute = 200;
     let result;
    
    const blogBodyLength =  blogBody.split(" ").length;
    if(blogBodyLength > 0){
         let value = Math.ceil(blogBodyLength / wordsPerMinute)
         result = `${value}`;
         return result
    }
   }
