// chatbot.js
const chatbox = document.getElementById('chatbox');
const messageInput = document.getElementById('message-input');
const chatForm = document.getElementById('chat-form');

// Replace 'YOUR_API_KEY' with your actual OpenAI API key
const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

// Function to display messages in the chatbox
function displayMessage(message, isUser) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.classList.add('message', isUser ? 'user-message' : 'bot-message');
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Function to send a message to the OpenAI API and display the response
async function sendMessage(message) {
  displayMessage(message, true);
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    })
  });
  const data = await response.json();
  const botMessage = data.choices[0