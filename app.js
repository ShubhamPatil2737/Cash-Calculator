const billAmount = document.querySelector("#bill-amount");
const nextButton = document.querySelector("#bill-amount-btn");
const billAmountContainer = document.querySelector(".bill-amount-container");
const cashGiven = document.querySelector("#cash-given");
const checkButton = document.querySelector("#check-btn");
const cashGivenContainer = document.querySelector(".cash-given-container");
const errorMessage = document.querySelector("#error-message");
const returnAmountDisplay = document.querySelector("#return-change-display-div");
const returnAmountCaption = document.querySelector("#return-change-caption");
const noOfNotes = document.querySelectorAll(".no-of-notes");
const changeTable = document.querySelector(".change-table");
const denominations = [2000, 500, 100, 50, 10, 5, 1];

cashGivenContainer.style.display = "none";
errorMessage.style.display = "none";
returnAmountCaption.style.display = "none";
returnAmountDisplay.style.display = "none";
changeTable.style.display = "none";
checkButton.style.display = "none";

 function validateBillAmount(){
    if(billAmount.value > 0){
        nextButton.style.display = "none";
        errorMessage.style.display = "none";
        cashGivenContainer.style.display = "block";
        checkButton.style.display = "inline";
       
    }else{
        showMessage("Invalid Amount Entered ! ");
    }
}

function validateCashAmount() {

    if (cashGiven.value > 0) {

        errorMessage.style.display = "none";

        if (Number(cashGiven.value) > Number(billAmount.value)) {

            const amountToBeReturned = cashGiven.value - billAmount.value;
            returnAmountDisplay.style.display = "inline";
            returnAmountCaption.style.display = "block";
            returnAmountDisplay.style.color = "green";
            returnAmountDisplay.innerText ="₹ "+ amountToBeReturned;
            changeTable.style.display = "block";
            calculateChange(amountToBeReturned);

        } 
        else if(Number(cashGiven.value) === Number(billAmount.value)){
            errorMessage.style.color = "green";
            errorMessage.style.fontSize = "larger";
            showMessage("You are all clear! No cash to return.");
        }
        else {
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = "larger";
            showMessage("Please give us more cash.");
        }
    } else {
        showMessage("Enter a valid Cash Amount.");
    }
}
function calculateChange(amountToBeReturned){
    for( let i=0; i<denominations.length; i++){
        const numberOfNotes = Math.trunc(amountToBeReturned / denominations[i]);
        amountToBeReturned %= denominations[i];
        noOfNotes[i].innerText = numberOfNotes;
        changeTable.style.display = "block";

    }
}

function showMessage(msg){
    errorMessage.style.display = "block";
    errorMessage.innerText = msg;

}
nextButton.addEventListener("click", validateBillAmount);
checkButton.addEventListener("click", validateCashAmount);