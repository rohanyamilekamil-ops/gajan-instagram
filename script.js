let currentBalance = localStorage.getItem('gajan_balance') ? parseInt(localStorage.getItem('gajan_balance')) : 0;

function updateDisplay() {
    document.getElementById('user-balance').innerText = currentBalance;
    localStorage.setItem('gajan_balance', currentBalance);
}

function uploadProfilePic(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('display-dp').src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function openRechargePopup() {
    const amt = prompt("🪙 Kitne Tokens kharidne hain? (100 Tokens = ₹100)");
    if(amt && !isNaN(amt)) {
        alert("Please pay ₹" + amt + " to UPI: gajan@upi. Verify hone par balance add ho jayega.");
        // Demo ke liye turant add kar rahe hain:
        currentBalance += parseInt(amt);
        updateDisplay();
    }
}
updateDisplay();
