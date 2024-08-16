var numbers=[1,2,3,3,4,4,5,6,7,8,9,10]

let arr_without_duplicates=[]

for(let i=0;i<numbers.length;i++){
    if(i==numbers.length-1){
        arr_without_duplicates.push(numbers[i])
    }
    else if(numbers[i]!=numbers[i+1]){
        arr_without_duplicates.push(numbers[i])
    }
}

console.log(arr_without_duplicates)