
const monthlySavings=(payment_arr,living_cost)=>{
    let total_payment=0
    let difference=0
    if(typeof payment_arr=="object" && typeof living_cost=="number"){
        for(let i=0;i<payment_arr.length;i++){
            if(payment_arr[i]>=3000){
                total_payment=total_payment+(0.8*payment_arr[i])
            }
            else{
                total_payment=total_payment+payment_arr[i]
            }
        }
        difference=total_payment-living_cost
        if(difference<0){
            return "Earn more"
        }
        else{
            return difference
        }
    }
    else{
        return "Invalid input"
    }
    
}



let payment_arr=10000
let living_cost=[900,2700,3400]
let res=monthlySavings(payment_arr,living_cost)
console.log(res)




