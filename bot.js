function init() {
    let res_elm = document.createElement("div");
    res_elm.innerHTML = "Hello, how can I assist you?";
    res_elm.classList.add("right");
    document.getElementById('msg').appendChild(res_elm);
  }
  
  document.getElementById('reply').addEventListener("click", handleSendMessage);
  
  document.getElementById('msg_send').addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleSendMessage(e);
    }
  });
  
  async function handleSendMessage(e) {
    e.preventDefault();
  
    var req = document.getElementById('msg_send').value.trim();
    if (!req) return;
  
    let res = getBotResponse(req);
  
    let data_req = document.createElement('div');
    let data_res = document.createElement('div');
    let container1 = document.createElement('div');
    let container2 = document.createElement('div');
  
    container1.classList.add("msgCon1");
    container2.classList.add("msgCon2");
  
    data_req.innerHTML = req;
    data_res.innerHTML = res;
  
    data_req.classList.add("left");
    data_res.classList.add("right");
  
    let message = document.getElementById('msg');
  
    message.appendChild(container1);
    message.appendChild(container2);
  
    container1.appendChild(data_req);
    container2.appendChild(data_res);
  
    document.getElementById('msg_send').value = "";
  
    message.scrollTop = message.scrollHeight;
  }
  
  function getBotResponse(input) {
    input = input.toLowerCase();
  
    // Simple keyword matching
    const greetings = ["hello", "hi", "hey"];
    const wellBeing = ["how are you", "how's it going"];
    const plantQuestions = ["plant", "plants", "garden", "gardening"];
    const thanks = ["thank you", "thanks"];
    const farming = ["urban", "farming"];
  
    const namePattern = /what is your name|who are you/;
    const plantRecommendationPattern = /recommend.*plant|suggest.*plant|which plant/;
  
    if (greetings.some(greet => input.includes(greet))) {
        return "Hello! How can I help you today?";
    } else if (wellBeing.some(wb => input.includes(wb))) {
        return "I'm fine. I'm just a bot, but I'm here to help you with your plant queries!";
    } else if (farming.some(fa => input.includes(fa))) {
        return "Urban farming, also known as urban agriculture, refers to the cultivation of crops, the raising of animals, or the production of food-related goods within and around urban areas";
    } else if (namePattern.test(input)) {
        return "I'm the Skyline Seeds ChatBot.";
    } else if (plantRecommendationPattern.test(input)) {
        return "Tell us about your plant requirements (water, sunlight, space) in the know your plant section, and I'll help you choose the best plant!";
    } else if (plantQuestions.some(plant => input.includes(plant))) {
        return "I can help you find the right plant for your garden. Just let me know your requirements!";
    } else if (thanks.some(thank => input.includes(thank))) {
        return "You're welcome! If you have any more questions, feel free to ask.";
    } else {
        return "Sorry, I didn't understand that. Can you please rephrase?";
    }
  }
  