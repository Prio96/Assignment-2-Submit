const numbers=[2,1,4,3,6,5,8,9,11,7,10,15,13,14,12,19,16,18,17,20]

for(let i=0;i<numbers.length-1;i++){
    for(let j=i+1;j<numbers.length;j++){
        if(numbers[i]>numbers[j]){
            let tmp=numbers[i]
            numbers[i]=numbers[j]
            numbers[j]=tmp
        }
    }
}

console.log(numbers)