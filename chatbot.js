window.onload = function() {
  let chat = document.getElementById('chatbot')

  function reply(request, answer) {
    var cur_answer = document.createElement('p')
    cur_answer.classList.add('cur_answer')
    cur_answer.style.backgroundColor = '#e6be70'
    cur_answer.style.borderRadius='9px'
    
    if (request == "Привет" || request == "привет") {
      cur_answer.innerHTML = "Привет"
      answer.append(cur_answer)
    } else if (request == "Как дела?" || request == "Как дела" || request == "как дела?" || request == "как дела") {
      cur_answer.innerHTML = "Хорошо"
      answer.append(cur_answer)
    } else if (request == "Сколько тебе лет?" || request == "сколько тебе лет?" || request == "Сколько тебе лет" || request == "сколько тебе лет") {
      cur_answer.innerHTML = "Мне 20"
      answer.append(cur_answer)
    } else if (request == "Пока" || request == "пока") {
      cur_answer.innerHTML = "Пока"
      answer.append(cur_answer)
    } else {
      cur_answer.innerHTML = "К сожалению, не могу обработать информацию."
      answer.append(cur_answer)
    }
  }

  chat.onclick = function() {
    console.log("chatbot in process...")

    var chat_window = document.createElement("div")
    chat_window.classList.add('chat_window')
    chat.disabled = true

    var exit = document.createElement("button")
    exit.classList.add('exit')
    exit.innerHTML = "x"
    chat_window.append(exit)

    exit.onclick = function() {
      chat_window.remove()
      chat.disabled = false
    }

    var text = document.createElement("textarea")
    text.classList.add("text")
    chat_window.append(text)

    var answer = document.createElement("div")
    answer.classList.add('answer')
    chat_window.append(answer)

    text.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault()
        console.log("Message was sent")
        var cur_answer = document.createElement('p')
        cur_answer.classList.add('cur_answer')
        answer.append(cur_answer)
        cur_answer.innerHTML = text.value
        reply(text.value, answer)
        text.value = ""
      }
    })


    if (navigator.mediaDevices.getUserMedia) {
      let chunks = []
      const constraints = {
        audio: true
      };

      voice_message = document.createElement('button')
      voice_message.innerHTML = 'Rec'
      voice_message.classList.add('Rec')
      chat_window.append(voice_message)

      let onSuccess = (stream) => {
        const mediaRecorder = new MediaRecorder(stream)

        voice_message.onclick = (event) => {
          if (mediaRecorder.state === 'inactive') {
            mediaRecorder.start()
            voice_message.style.backgroundColor = '#e0b090'
            voice_message.innerHTML = 'Send'
          } else {
            mediaRecorder.stop()
            voice_message.style.backgroundColor = '#955f20'
            voice_message.innerHTML = 'Rec'
          }
        }

        mediaRecorder.onstop = (event) => {
          let audio = document.createElement('audio')
          audio.classList.add('audio')
          answer.append(audio)
          audio.controls = true

          const blob = new Blob(chunks, {
            'type': 'audio/ogg; codecs=opus'
          })
          chunks = [];
          const audioURL = window.URL.createObjectURL(blob)
          audio.src = audioURL
        }

        mediaRecorder.ondataavailable = function(event) {
          chunks.push(event.data);
        }

      }
      let onError = (err) => {
        console.log('Error: ' + err);
      }

      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    }
    document.body.append(chat_window)
  }
};