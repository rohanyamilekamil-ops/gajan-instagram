<!DOCTYPE html>
<html>
<head>
  <title>Gajan App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div id="app">

  <!-- USER -->
  <h3 id="username">Loading...</h3>

  <!-- UPLOAD -->
  <input type="file" id="file">
  <button onclick="upload()">Upload</button>

  <!-- FEED -->
  <div id="feed"></div>

</div>

<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"></script>

<script src="app.js"></script>

</body>
</html>
