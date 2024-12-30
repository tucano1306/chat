document.addEventListener('DOMContentLoaded', () => {
    let ws;
    let username;

    // Agregar event listeners a los botones
    document.getElementById('loginButton').addEventListener('click', login);
    document.getElementById('sendButton').addEventListener('click', sendMessage);

    function login() {
        username = document.getElementById('usernameInput').value.trim();
        if (!username) return;

        ws = new WebSocket('ws://localhost:3000');

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: 'login',
                username: username
            }));

            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('chatContainer').style.display = 'block';
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            displayMessage(data);
        };

        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const content = messageInput.value.trim();
        
        if (!content) return;

        ws.send(JSON.stringify({
            type: 'message',
            content: content
        }));

        messageInput.value = '';
    }

    function displayMessage(data) {
        const messagesContainer = document.getElementById('messagesContainer');
        const messageDiv = document.createElement('div');

        switch(data.type) {
            case 'message':
                messageDiv.className = `message ${data.username === username ? 'sent' : 'received'}`;
                messageDiv.innerHTML = `
                    <strong>${data.username}: </strong>
                    <span>${data.content}</span>
                `;
                break;

            case 'userConnected':
                messageDiv.className = 'system-message';
                messageDiv.textContent = `${data.username} se ha conectado`;
                break;

            case 'userDisconnected':
                messageDiv.className = 'system-message';
                messageDiv.textContent = `${data.username} se ha desconectado`;
                break;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});