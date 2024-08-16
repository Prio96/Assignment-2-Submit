
const biggestname=(arr)=>{
    let largestname=arr[0]
    for(let i=0;i<arr.length;i++){
        if(arr[i].length>largestname.length){
            largestname=arr[i]
        }
    }
    return largestname
}








var friends=["rahim","karim","abdul","sadsd","heroAlom"]
const res=biggestname(friends)
console.log(res)
