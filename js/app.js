function openTab(tabOption) {
    let i;
    let x = document.getElementsByClassName("tab-chat");
    document.querySelectorAll('.w3-bar-item-w3-button').forEach(item => item.classList.remove('active'))
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabOption).style.display = "block";
    document.querySelector(`.w3-bar-item-w3-button[data-click="${tabOption}"]`).classList.add('active')
}
function openIcons() {
    let icons = document.getElementById('icons');
    if (icons.style.display === 'none') {
        icons.style.display = 'block'; //funcion toggle (cambia entre 2 estados)
    } else {
        icons.style.display = 'none';
    }
}
function raiseHand() {
    let hands = document.getElementById('hands');
    let handsIcon = document.getElementById('handsIcon');
    if (hands.style.color === 'black') {
        hands.style.color = 'blue';
        handsIcon.src = '../img/icono_mano_hover.svg';
    } else {
        hands.style.color = 'black';
        handsIcon.src = '../img/icono_mano_normal.svg';
    }
}
function changerEmoticon(emoticon) {
    let emoticonBtn = document.getElementById('emoticonBtn');
    emoticonBtn.src = emoticon;
    // openIcons();
}
function getTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) { hours = `0${hours}` }
    if (minutes < 10) { minutes = `0${minutes}` }
    return `${hours}:${minutes}`;
}
function createBubble(chat, img, bubbleStyle, message, emoticon) {
    let historyChat = document.getElementById(chat);
    let question = document.createElement('div');
    let msgImg = document.createElement('div');
    let bubble = document.createElement('div');
    bubble.className = 'bubble-style';
    if (emoticon) {
        let emoticonImg = document.createElement('img');
        emoticonImg.src = emoticon;
        bubble.appendChild(emoticonImg);
    } else {
        bubble.innerHTML = `<p>${message}</p>`;
    }
    msgImg.appendChild(bubble);
    let profile = document.createElement('img');
    profile.src = img;
    profile.className = 'profile-style';
    msgImg.appendChild(profile);
    msgImg.className = 'msgImg-style';
    question.appendChild(msgImg);
    let time = document.createElement('div');
    time.innerHTML = `<p>${getTime()}</p>`;
    time.className = 'time-style';
    question.appendChild(time);
    question.className = bubbleStyle;
    historyChat.appendChild(question);
}
function sendEmoticon(chat, image) {
    createBubble(chat, '../img/profile_brand.png', 'question-style', '', image);
    let scroll = document.getElementById('scroll');                 // Obtiene el div del scroll
    scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;   // Posiciona al final
}
function showAnswer(chat, message) {
    createBubble(chat, '../img/profile_brand.png', 'answer-style', message);
    let scroll = document.getElementById('scroll');                 // Obtiene el div del scroll
    scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;   // Posiciona al final
}
function search(chat) {
    const apiKey = '1c67ae33adc312d33476ae4d68a09beb';
    async function newsSearch(city_name) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}`;
        const resp = await fetch(url);
        const info = await resp.json();
        return info;
    }
    let info = newsSearch('texas');
    info.then(response => {
        console.log(response);
        showAnswer(chat, `Clima: ${response.weather[0].main}, Temperatura:  ${response.main.temp} °K`);
    }).catch(error => {
        console.log(error);
    })
}
function sendQuestion(chat) {
    let message = document.getElementById('message');
    createBubble(chat, '../img/profile_brand.png', 'question-style', message.value);
    message.value = '';
    let scroll = document.getElementById('scroll');                 // Obtiene el div del scroll
    scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;   // Posiciona al final
    search(chat);
}
async function getUsers() {
    let url = '../resources/speakers.json';
    try {
        let res = await fetch(url, {
            method: 'GET'
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
const showUsers = async () => {
    let users = await getUsers();
    let listUsers = '';
    users.forEach(user => {
        let userDiv = `<div class="speaker-style">
                            <img width="100px" class="speaker-img" src="${user.imgProfile}" />
                            <div class="speaker-info">
                                <span>${user.firstName} ${user.lastName}</span>
                                <div class="position">${user.position}</div>
                            </div>
                            <div class="chat-button"><a type="button" onClick='openChat(${JSON.stringify(user)})'><img src="../img/enviarmensaje_normal.png"></a></div>
                          </div>`;
        listUsers += userDiv;
    });
    let container = document.getElementById('speakersList');
    container.innerHTML = listUsers;
}
function openChat(user) {
    console.log(user);
    let chat2 = document.getElementById('historyChat2');
    let chat3 = document.getElementById('historyChat3');
    let chat4 = document.getElementById('historyChat4');
    let chat5 = document.getElementById('historyChat5');
    chat2.style.display = 'none';
    chat3.style.display = 'none';
    chat4.style.display = 'none';
    chat5.style.display = 'none';
    let speakersChat = document.getElementById('speakersChat');
    let speakersList = document.getElementById('speakersList');
    let messageChat = document.getElementById('messageChat');
    messageChat.style.display = 'block';
    speakersList.style.display = 'none';
    speakersChat.style.display = 'block';
    // let actChat = document.getElementById(`'${user.chatId}'`);
    // actChat.style.display = 'block';
    let speakerInfo = document.getElementById('speakerInfo');
    speakerInfo.innerHTML = `<div class="speaker-style">
                                <img width="100px" src="${user.imgProfile}" >
                                <span>${user.firstName} ${user.lastName}</span>
                                <div class="position">${user.position}</div>
                            </div>`;
}
function backChat() {
    let speakersChat = document.getElementById('speakersChat');
    let speakersList = document.getElementById('speakersList');
    let messageChat = document.getElementById('messageChat');
    messageChat.style.display = 'none';
    speakersList.style.display = 'block';
    speakersChat.style.display = 'none';
}