const apiKey = 'DEIN_API_SCHLÜSSEL'; // Ersetzen Sie dies durch Ihren tatsächlichen API-Schlüssel
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

document.getElementById('sendButton').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    appendMessage('You', userInput);
    document.getElementById('userInput').value = '';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 50
        })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.choices[0].text.trim();
        appendMessage('ChatGPT', botResponse);
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('ChatGPT', 'Es ist ein Fehler aufgetreten.');
    });
}

function appendMessage(sender, message) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}