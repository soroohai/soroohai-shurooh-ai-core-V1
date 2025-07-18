
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

// إرسال الرسالة وتخزينها في Firebase
function sendMessage() {
  let message = userInput.value.trim();
  if(message) {
    appendMessage('أنت', message, 'right');
    db.ref('messages').push({sender: 'user', text: message});
    userInput.value = '';
    getBotReply(message);
  }
}

function appendMessage(sender, text, align='left') {
  chatBox.innerHTML += `<div style="text-align:${align};margin-bottom:7px;"><b>${sender}:</b> ${text}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(userMessage) {
  appendMessage('سروح', 'جاري التفكير...', 'left');
  fetch('/api/ask', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: userMessage})
  })
  .then(res => res.json())
  .then(data => {
    chatBox.lastChild.remove();
    appendMessage('سروح', data.reply, 'left');
    db.ref('messages').push({sender: 'bot', text: data.reply});
  })
  .catch(() => {
    chatBox.lastChild.remove();
    appendMessage('سروح', 'حصل خطأ بالاتصال، حاول مجدداً.', 'left');
  });
}

userInput.addEventListener('keydown', function(event) {
  if(event.key === 'Enter') sendMessage();
});
