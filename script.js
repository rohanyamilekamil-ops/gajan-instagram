let tokens = 100;
const feed = document.getElementById('feed');

// Fake Post Data
const posts = [
    { id: 1, user: 'Gajan_King', img: 'https://picsum.photos/400/400' },
    { id: 2, user: 'Star_Boy', img: 'https://picsum.photos/400/401' }
];

posts.forEach(post => {
    feed.innerHTML += `
        <div class="post">
            <p style="padding:10px;"><b>${post.user}</b></p>
            <img src="${post.img}">
            <button class="gift-btn" onclick="sendGift()">🎁 Send Gift (10 Tokens)</button>
        </div>`;
});

function sendGift() {
    if(tokens >= 10) {
        tokens -= 10;
        document.getElementById('balance').innerText = tokens;
        alert("Gift Bheja Gaya! 🎉");
    } else {
        alert("Tokens khatam! UPI se recharge karein.");
    }
}
