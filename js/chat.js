function initChat(element){

    // Divs de mensajes
    let chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    let chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');
    let msgsBody = document.createElement('div');
    msgsBody.classList.add('chat-msg-body');
    let msgsScroll = document.createElement('div');
    msgsScroll.classList.add('chat-msg-scroll');
    let historyChat = document.createElement('div');
    historyChat.classList.add('chat-msg-text');
    // historyChat.
  
    // Unimos los div
    msgsScroll.append(historyChat);
    msgsBody.append(msgsScroll);
    chatContainer.append(msgsBody);
    chatMessage.append(chatContainer);
  
    // Icons
    let iconsWrapper = getIconList(historyChat);
    
  
    // Envio de mensajes
    let senderMessage = document.createElement('div');
    senderMessage.classList.add('message-chat');
    let buttonEmoticons = document.createElement('button');
    buttonEmoticons.type = 'button';
    buttonEmoticons.classList.add('emoticon-chat');
    buttonEmoticons.addEventListener('click', function(){
      openIcons(iconsWrapper);
    })
    let buttonEmoticonsImage = document.createElement('img');
    buttonEmoticonsImage.src = "./img/emoji_normal.svg";
    buttonEmoticons.append(buttonEmoticonsImage);
  
    let messageInput = document.createElement('input');
    messageInput.placeholder = "Ingrese su pregunta";
    messageInput.name = "message";
    messageInput.type = "text";
    messageInput.classList.add('input-message');
  
    let anchor = document.createElement('a');
    anchor.classList.add('emoticon-chat');
    anchor.addEventListener('click', function(){
      sendQuestion(historyChat, messageInput, msgsScroll);
    })
    let anchorImage = document.createElement('img');
    anchorImage.src = "./img/send_button_normal.svg";
    anchor.append(anchorImage);
  
    let sendLabel = document.createElement('label');
    sendLabel.innerHTML = "Send";
  
    senderMessage.append(buttonEmoticons);
    senderMessage.append(messageInput);
    senderMessage.append(anchor);
    senderMessage.append(sendLabel);
    
    // Unimos los divs con el chat
    element.append(chatMessage);
    element.append(senderMessage);
    element.append(iconsWrapper)
    
  }
  
  function createBubble(chat, img, bubbleStyle, message, emoticon) {
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
    chat.appendChild(question);
  }
  
  function getTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) { hours = `0${hours}` }
    if (minutes < 10) { minutes = `0${minutes}` }
    return `${hours}:${minutes}`;
  }
  
  function sendEmoticon(chat, image) {
    createBubble(chat, './img/profile_brand.png', 'question-style', '', image);
    chat.parentElement.scrollTop = chat.parentElement.scrollHeight - chat.parentElement.clientHeight;   // Posiciona al final
  }
  
  function getIconList(historyChat){
    let iconsContainer = document.createElement('div');
    iconsContainer.classList.add('icons-chat');
    iconsContainer.style.display = 'none';
    
    // Genero los iconos
    let emoWrapper = document.createElement('div');
    let like = createIcon(historyChat, './img/Like_emoji.png');
    emoWrapper.append(like);
    let love = createIcon(historyChat, './img/love_emoji.png');
    emoWrapper.append(love);
    let funny = createIcon(historyChat, './img/funny_emoji.png');
    emoWrapper.append(funny);
    let wow = createIcon(historyChat, './img/wow_emoji.png');
    emoWrapper.append(wow);
    let sad = createIcon(historyChat, './img/sad_emoji.png');
    emoWrapper.append(sad);
  
    // Genero la mano
    let handsWrapper = document.createElement('div');
    handsWrapper.classList.add('hand-chat');
    handsWrapper.addEventListener('click', function(){
      // Cuando levanta la mano
      createBubble(historyChat, './img/profile_brand.png', 'question-style', "El usuario levanta la mano");
      restoreScroll(scroll);
    })
  
    let handButton = document.createElement('button');
    handButton.classList.add('emoticon-chat');
    let handButtonImage = document.createElement('img');
    handButtonImage.src = "./img/icono_mano_normal.svg";
  
    handButton.append(handButtonImage);
  
    let handButtonLabel = document.createElement('label');
    handButtonLabel.classList.add('hand-text');
    handButtonLabel.innerHTML = "LEVANTAR LA MANO";
  
    handsWrapper.append(handButton);
    handsWrapper.append(handButtonLabel);
  
    // Combino las 2 partes
    iconsContainer.append(emoWrapper);
    iconsContainer.append(handsWrapper);
  
    return iconsContainer
  }
  
  function createIcon(historyChat, iconImage){
    let anchor = document.createElement('a');
    anchor.classList.add('emoticon-chat');
    anchor.addEventListener('click', function(){
      sendEmoticon(historyChat, iconImage);
    })
  
    let anchorImage = document.createElement('img');
    anchorImage.src = iconImage;
    
    anchor.append(anchorImage);
  
    return anchor;
  }
  
  function openIcons(icons) {
    if (icons.style.display === 'none') {
        icons.style.display = 'block'; //funcion toggle (cambia entre 2 estados)
    } else {
        icons.style.display = 'none';
    }
  }
  
  function sendQuestion(chat, input, scroll) {
    createBubble(chat, './img/profile_brand.png', 'question-style', input.value);
    input.value = '';
    search(chat);
    restoreScroll(scroll);
  }
  
  function restoreScroll(scroll){
    scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
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
      createBubble(chat, './img/profile_brand.png', 'answer-style', `Clima: ${response.weather[0].main}, Temperatura:  ${response.main.temp} °K`);
    }).catch(error => {
      console.log(error);
    })
  }
  
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
  
  function backChat(chat, list) {
    list.style.display = 'block';
    chat.style.display = 'none';
  }
  
  async function openChat(option) {
    let users = await getUsers();
    // Persona a la que le mandas
    // console.log(users[option]);
    let chat = document.getElementById('spChat');
    let list = document.getElementById('speakersList');
    chat.style.display = 'block';
    list.style.display = 'none';
    while (document.getElementById('speakersChat').querySelector('.chat-msg-text').hasChildNodes()) {  
      document.getElementById('speakersChat').querySelector('.chat-msg-text').removeChild(document.getElementById('speakersChat').querySelector('.chat-msg-text').firstChild);
    }
    document.getElementById('spChatBack').addEventListener('click', function(){
      backChat(chat, list);
    })
  }
  
  async function getUsers() {
    let url = './resources/speakers.json';
    try {
      let res = await fetch(url, {
        method: 'GET'
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
  
  
  initChat(document.getElementById('qaChat'));
  initChat(document.getElementById('speakersChat'));