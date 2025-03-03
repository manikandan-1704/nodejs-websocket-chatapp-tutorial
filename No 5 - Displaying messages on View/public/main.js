const socket = io();

const clientsTotal = document.getElementById('clients-total');

const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageInput = document.getElementById('message-input');
const messageForm = document.getElementById('message-form');

messageForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    sendMessage();
})

socket.on('clients-total', (data)=>{
    clientsTotal.innerText = `Total clients: ${data}`;  
})

function sendMessage() {
    if(messageInput.value === '')return;
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data);
    addMessageToUI(true, data);
    messageInput.value = "";
}

socket.on('chat-message', (data)=> {
    addMessageToUI(false, data);
})

function addMessageToUI(isOwnMessage, data){
    const element = `
    <li class="${isOwnMessage ? "message-right" : "message-left"}">
          <p class="message">
            ${data.message}
            <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
          </p>
        </li>
        `
        messageContainer.innerHTML += element;
        scrollToBottom()
}

function scrollToBottom(){
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
}