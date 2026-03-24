// Gajan Token System
let currentBalance = localStorage.getItem('gajan_balance') ? parseInt(localStorage.getItem('gajan_balance')) : 0;

function updateDisplay() {
    document.getElementById('user-balance').innerText = currentBalance;
    localStorage.setItem('gajan_balance', currentBalance);
}

// Profile Photo Upload
function uploadProfilePic(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('display-dp').src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Recharge Popup
function openRechargePopup() {
    const rechargeHTML = `
        <div id="recharge-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:9999; display:flex; flex-direction:column; align-items:center; justify-content:center; color:white; text-align:center; padding:20px;">
            <h2>🪙 Recharge Gajan Tokens</h2>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=gajan@upi&pn=GajanApp" style="margin:20px; border-radius:10px; border: 5px solid white;">
            <p>₹100 = 100 Tokens</p>
            <input type="number" id="token-amount" placeholder="Kitne tokens?" style="padding:12px; border-radius:8px; border:none; width:200px; margin:10px; color:black;">
            <button onclick="confirmPay()" style="background:#E1306C; color:white; border:none; padding:12px 30px; border-radius:25px; font-weight:bold; cursor:pointer;">I Have Paid ✅</button>
            <button onclick="document.getElementById('recharge-modal').remove()" style="margin-top:15px; background:none; border:none; color:#ccc; cursor:pointer;">Cancel</button>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', rechargeHTML);
}

function confirmPay() {
    let amt = document.getElementById('token-amount').value;
    if(amt > 0) {
        currentBalance += parseInt(amt);
        updateDisplay();
        document.getElementById('recharge-modal').remove();
        alert("Shukriya! Aapka Balance Update ho gaya hai. ✅");
    } else {
        alert("Pehle amount toh daalo!");
    }
}

// Start
updateDisplay();
