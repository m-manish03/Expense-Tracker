let form=document.getElementById("form")
let addBtn=document.getElementById("add")
let expenseList=document.getElementById("details")
let totalExpense=document.getElementById("span")
let expenseArray=JSON.parse(localStorage.getItem('expenseArray'))||[]
addBtn.addEventListener("click",addExpense)

function addExpense(e){
    e.preventDefault()
    let amount=document.getElementById("amount").value
    let date=document.getElementById("date").value
    let description=document.getElementById("description").value
    let paymentMode=document.getElementById("pay-mode").value
    if(amount>0&&date!=""&&description.length>0&&paymentMode!=''){
        let expense={amount,date,description,paymentMode,id:expenseArray.length>0?expenseArray[expenseArray.length-1].id+1:1}
        expenseArray.push(expense)
        localStorage.setItem("expenseArray",JSON.stringify(expenseArray))
        form.reset()
        showExpenses()
    }
}

function showExpenses(){
    expenseList.innerHTML=''
    let total=0
    expenseArray.forEach(expense=>{
        total+=parseFloat(expense.amount)
        expenseList.innerHTML+=`
        <li class="list-group-item d-flex justify-content-between">
            <div class="d-flex flex-column">${expense.description}</div>
            <div>
                <span class="px-2">${expense.amount}</span>
                <button type="button" onclick="deleteExpense(${expense.id})" class="btn btn-outline-danger btn-sm">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </li>`
    })
    totalExpense.textContent=`₹${total.toFixed(2)}`
}

function deleteExpense(id){
    expenseArray=expenseArray.filter(expense=>expense.id!==id)
    localStorage.setItem("expenseArray",JSON.stringify(expenseArray))
    showExpenses()
}

document.addEventListener("DOMContentLoaded",showExpenses)
