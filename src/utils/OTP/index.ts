export const generateOTP=():string =>{
    return Math.floor(10000 + Math.random() * 99999) as unknown as string
}
export const generateExpiryDate=(time:number) =>{
   
    return new Date(Date.now()+time)
}