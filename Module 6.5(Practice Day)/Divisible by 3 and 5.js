let odd=[]

for(let i=1;i<=50;i++){
    if(i%3==0 && i%5==0){
        odd.push(i)
    }
}

console.log(...odd)