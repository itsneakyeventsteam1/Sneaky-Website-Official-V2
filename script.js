document.addEventListener('keydown', function (_0x2ded5e) {
  if (_0x2ded5e.key === 'F12') {
    var _0xcbe9bd = prompt(" ⚠️ Please enter the password to continue to the Dev Tools:");
    if (_0xcbe9bd !== "sneakywebjvjm") {
      _0x2ded5e.preventDefault();
      alert(" ❌ Incorrect password!");
    }
  }
});

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};
let header = document.querySelector("header");
header.classList.toggle("sticky", window.scrollY > 0x64);
function showPopup(_0x3be48a) {
  var _0x57b125 = document.getElementById("popupContainer" + _0x3be48a);
  if (_0x57b125) {
    _0x57b125.style.display = "block";
  }
}
function hidePopup(_0x5581f7) {
  var _0x521ec9 = document.getElementById("popupContainer" + _0x5581f7);
  if (_0x521ec9) {
    _0x521ec9.style.display = "none";
  }
}
window.onclick = function (_0x51c635) {
  var _0x3e84ad = document.getElementsByClassName("popup-container");
  for (var _0x3aaf1d = 0x0; _0x3aaf1d < _0x3e84ad.length; _0x3aaf1d++) {
    if (_0x51c635.target == _0x3e84ad[_0x3aaf1d]) {
      _0x3e84ad[_0x3aaf1d].style.display = "none";
    }
  }
};
const buttons = document.querySelectorAll("[class^=\"item-link-\"]");
const contents = document.querySelectorAll('.product');
buttons.forEach(_0x11bc79 => {
  _0x11bc79.addEventListener("click", () => {
    const _0x50ba47 = _0x11bc79.getAttribute("data-target");
    contents.forEach(_0x11d4a4 => {
      const _0x25ca55 = _0x11d4a4.getAttribute("data-name");
      if (_0x25ca55 === _0x50ba47) {
        _0x11d4a4.classList.remove("hidden");
      } else {
        _0x11d4a4.classList.add('hidden');
      }
    });
  });
});
const scrollbtn = document.getElementById("scrollbtn");
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 0x1e || document.documentElement.scrollTop > 0x1e) {
    scrollbtn.style.display = "block";
  } else {
    scrollbtn.style.display = "none";
  }
}
function toTopFunction() {
  document.body.scrollTop = 0x0;
  document.documentElement.scrollTop = 0x0;
}
const viewbtn = document.getElementById("viewbtn");
const closeviewbtn = document.getElementById("closeviewbtn");
const viewticket = document.getElementById("ticket-container");
let viewclicked = false;
function toggleView() {
  viewclicked = !viewclicked;
  if (viewclicked) {
    viewticket.style.display = "block";
  } else {
    viewticket.style.display = "none";
  }
}
viewbtn.addEventListener("click", toggleView);
closeviewbtn.addEventListener("click", toggleView);
const eslidebtn = document.getElementById("eslidebtn");
let clicked = false;
function eClick() {
  clicked = !clicked;
  const _0x1e1f93 = document.getElementById("e-slide-2");
  const _0x32d001 = document.getElementById('e-slide-1');
  if (clicked) {
    _0x1e1f93.style.display = 'block';
    _0x32d001.style.display = 'none';
  } else {
    _0x1e1f93.style.display = 'none';
    _0x32d001.style.display = "block";
  }
}
document.getElementById("item-link-select").addEventListener('change', function () {
  var _0x258d9e = this.value;
  var _0x216fc1 = document.getElementById("registration-valo");
  var _0x4fa9b6 = document.getElementById("registration-mlbb");
  if (_0x258d9e === 'valorant') {
    _0x216fc1.style.display = "block";
    _0x4fa9b6.style.display = "none";
  } else if (_0x258d9e === "mlbb") {
    _0x216fc1.style.display = "none";
    _0x4fa9b6.style.display = "block";
  } else {
    _0x216fc1.style.display = "none";
    _0x4fa9b6.style.display = "none";
  }
});
const nextBtn1valo = document.getElementById("nextBtn1valo");
const nextBtn2valo = document.getElementById('nextBtn2valo');
const submitbtnvalo = document.getElementById("submitbtnvalo");
let valoIndex = 0x1;
function showValoSlide(_0x3f7920) {
  const _0x29332c = document.querySelectorAll("[id^=\"inputform-1\"]");
  const _0x1a896d = document.querySelectorAll("[id^=\"inputform-2\"]");
  const _0x154aa7 = document.querySelectorAll("[id^=\"inputform-3\"], [id^=\"inputform-4\"], [id^=\"inputform-5\"]");
  const _0x146592 = document.querySelectorAll("[id^=\"inputform-6\"], [id^=\"inputform-7\"]");
  for (const _0x57ca54 of _0x29332c) {
    _0x57ca54.style.display = _0x3f7920 === 0x1 || _0x3f7920 === 0x2 ? "flex" : 'none';
    _0x57ca54.style.animation = _0x3f7920 === 0x1 || _0x3f7920 === 0x2 ? "slideLeft 200ms ease-in-out" : "none";
  }
  for (const _0x3d5b74 of _0x1a896d) {
    _0x3d5b74.style.display = _0x3f7920 === 0x1 || _0x3f7920 === 0x2 ? 'flex' : "none";
    _0x3d5b74.style.animation = _0x3f7920 === 0x1 || _0x3f7920 === 0x2 ? "slideLeft 200ms ease-in-out" : 'none';
  }
  for (const _0x907ae0 of _0x154aa7) {
    _0x907ae0.style.display = _0x3f7920 >= 0x3 && _0x3f7920 <= 0x5 ? "flex" : "none";
    _0x907ae0.style.animation = _0x3f7920 >= 0x3 && _0x3f7920 <= 0x5 ? "slideLeft 200ms ease-in-out" : "none";
  }
  for (const _0x483798 of _0x146592) {
    _0x483798.style.display = _0x3f7920 >= 0x6 ? "flex" : "none";
    _0x483798.style.animation = _0x3f7920 >= 0x6 ? "slideLeft 200ms ease-in-out" : 'none';
  }
  if (_0x3f7920 === 0x1 || _0x3f7920 === 0x2) {
    nextBtn1valo.style.display = "block";
    nextBtn2valo.style.display = "none";
    submitbtnvalo.style.display = "none";
  } else if (_0x3f7920 >= 0x3 && _0x3f7920 <= 0x5) {
    nextBtn1valo.style.display = "block";
    nextBtn2valo.style.display = "block";
    submitbtnvalo.style.display = "none";
  } else {
    nextBtn1valo.style.display = "none";
    nextBtn2valo.style.display = 'block';
    submitbtnvalo.style.display = 'block';
  }
}
function nextValoSlide() {
  if (validateValoInputs(valoIndex)) {
    if (valoIndex < 0x7) {
      valoIndex++;
      showValoSlide(valoIndex);
    }
  }
}
function prevValoSlide() {
  if (valoIndex > 0x1) {
    valoIndex--;
    showValoSlide(valoIndex);
    const _0x4069fb = document.querySelectorAll("[id^=\"inputform-\"]");
    _0x4069fb.forEach(_0x15e94c => {
      _0x15e94c.style.animation = "slideRight 200ms ease-in-out";
    });
  }
}
function validateValoInputs(_0xa1742c) {
  const _0x3eaa17 = document.querySelectorAll("#inputform-" + _0xa1742c + " [required]");
  let _0x335390 = true;
  _0x3eaa17.forEach(_0x36e65f => {
    let _0xb44443 = _0x36e65f.parentNode.querySelector(".input-warning");
    if (_0x36e65f.type === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_0x36e65f.value)) {
        _0x335390 = false;
        _0x36e65f.style.border = "2px solid red";
        _0x36e65f.style.animation = "error 200ms ease-in-out";
        if (!_0xb44443) {
          _0xb44443 = document.createElement("span");
          _0xb44443.textContent = "⚠︎ Invalid email address!";
          _0xb44443.style.animation = "error 200ms ease-in-out";
          _0xb44443.style.color = 'red';
          _0xb44443.style.display = "block";
          _0xb44443.style.marginTop = '3px';
          _0xb44443.style.fontSize = "8px";
          _0xb44443.style.fontFamily = 'Tondo';
          _0xb44443.classList.add('input-warning');
          _0x36e65f.parentNode.insertBefore(_0xb44443, _0x36e65f.nextSibling);
        }
      } else {
        _0x36e65f.style.border = '';
        _0x36e65f.style.boxShadow = '';
        if (_0xb44443) {
          _0xb44443.remove();
        }
      }
    } else if (_0x36e65f.value.trim() === '') {
      _0x335390 = false;
      _0x36e65f.style.border = "2px solid red";
      _0x36e65f.style.animation = "error 200ms ease-in-out";
      if (!_0xb44443) {
        _0xb44443 = document.createElement("span");
        _0xb44443.textContent = "⚠︎ This field is required!";
        _0xb44443.style.animation = "error 200ms ease-in-out";
        _0xb44443.style.color = "red";
        _0xb44443.style.display = "block";
        _0xb44443.style.marginTop = "3px";
        _0xb44443.style.fontSize = "8px";
        _0xb44443.style.fontFamily = "Tondo";
        _0xb44443.classList.add('input-warning');
        _0x36e65f.parentNode.insertBefore(_0xb44443, _0x36e65f.nextSibling);
      }
    } else {
      _0x36e65f.style.border = '';
      _0x36e65f.style.boxShadow = '';
      if (_0xb44443) {
        _0xb44443.remove();
      }
    }
  });
  return _0x335390;
}
function isValidEmail(_0x51218b) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_0x51218b);
}
nextBtn1valo.addEventListener("click", nextValoSlide);
nextBtn2valo.addEventListener("click", prevValoSlide);
showValoSlide(valoIndex);
const nextBtn1mlbb = document.getElementById("nextBtn1mlbb");
const nextBtn2mlbb = document.getElementById("nextBtn2mlbb");
const submitbtnmlbb = document.getElementById("submitbtnmlbb");
let mlbbIndex = 0x1;
function showMlbbSlide(_0x570eee) {
  const _0x2aa756 = document.querySelectorAll("[id^=\"mlbbinputform-1\"]");
  const _0x368038 = document.querySelectorAll("[id^=\"mlbbinputform-2\"]");
  const _0x29a57d = document.querySelectorAll("[id^=\"mlbbinputform-3\"], [id^=\"mlbbinputform-4\"], [id^=\"mlbbinputform-5\"]");
  const _0xf7d6e6 = document.querySelectorAll("[id^=\"mlbbinputform-6\"], [id^=\"mlbbinputform-7\"], [id^=\"mlbbinputform-8\"]");
  for (const _0x15a6a7 of _0x2aa756) {
    _0x15a6a7.style.display = _0x570eee === 0x1 || _0x570eee === 0x2 ? 'flex' : 'none';
    _0x15a6a7.style.animation = _0x570eee === 0x1 || _0x570eee === 0x2 ? "slideLeft 200ms ease-in-out" : "none";
  }
  for (const _0x3d2232 of _0x368038) {
    _0x3d2232.style.display = _0x570eee === 0x1 || _0x570eee === 0x2 ? "flex" : "none";
    _0x3d2232.style.animation = _0x570eee === 0x1 || _0x570eee === 0x2 ? "slideLeft 200ms ease-in-out" : "none";
  }
  for (const _0x1abb4f of _0x29a57d) {
    _0x1abb4f.style.display = _0x570eee >= 0x3 && _0x570eee <= 0x5 ? "flex" : "none";
    _0x1abb4f.style.animation = _0x570eee >= 0x3 && _0x570eee <= 0x5 ? "slideLeft 200ms ease-in-out" : "none";
  }
  for (const _0x495918 of _0xf7d6e6) {
    _0x495918.style.display = _0x570eee >= 0x6 ? "flex" : "none";
    _0x495918.style.animation = _0x570eee >= 0x6 ? "slideLeft 200ms ease-in-out" : "none";
  }
  if (_0x570eee === 0x1 || _0x570eee === 0x2) {
    nextBtn1mlbb.style.display = "block";
    nextBtn2mlbb.style.display = "none";
    submitbtnmlbb.style.display = "none";
  } else if (_0x570eee >= 0x3 && _0x570eee <= 0x5) {
    nextBtn1mlbb.style.display = "block";
    nextBtn2mlbb.style.display = "block";
    submitbtnmlbb.style.display = 'none';
  } else {
    nextBtn1mlbb.style.display = "none";
    nextBtn2mlbb.style.display = 'block';
    submitbtnmlbb.style.display = "block";
  }
}
function nextMlbbSlide() {
  if (validateMlbbInputs(mlbbIndex)) {
    if (mlbbIndex < 0x7) {
      mlbbIndex++;
      showMlbbSlide(mlbbIndex);
    }
  }
}
function prevMlbbSlide() {
  if (mlbbIndex > 0x1) {
    mlbbIndex--;
    showMlbbSlide(mlbbIndex);
    const _0x489011 = document.querySelectorAll("[id^=\"mlbbinputform-\"]");
    _0x489011.forEach(_0x253fc0 => {
      _0x253fc0.style.animation = "slideRight 200ms ease-in-out";
    });
  }
}
function validateMlbbInputs(_0x3494eb) {
  const _0x33422b = document.querySelectorAll("#mlbbinputform-" + _0x3494eb + " [required]");
  let _0x4cb7f0 = true;
  _0x33422b.forEach(_0x5f3a7b => {
    let _0xafcd9a = _0x5f3a7b.parentNode.querySelector(".input-warning2");
    if (_0x5f3a7b.type === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_0x5f3a7b.value)) {
        _0x4cb7f0 = false;
        _0x5f3a7b.style.border = "2px solid red";
        _0x5f3a7b.style.animation = "error 200ms ease-in-out";
        if (!_0xafcd9a) {
          _0xafcd9a = document.createElement("span");
          _0xafcd9a.textContent = "⚠︎ Invalid email address!";
          _0xafcd9a.style.animation = "error 200ms ease-in-out";
          _0xafcd9a.style.color = 'red';
          _0xafcd9a.style.display = "block";
          _0xafcd9a.style.marginTop = '3px';
          _0xafcd9a.style.fontSize = "8px";
          _0xafcd9a.style.fontFamily = 'Tondo';
          _0xafcd9a.classList.add("input-warning2");
          _0x5f3a7b.parentNode.insertBefore(_0xafcd9a, _0x5f3a7b.nextSibling);
        }
      } else {
        _0x5f3a7b.style.border = '';
        _0x5f3a7b.style.boxShadow = '';
        if (_0xafcd9a) {
          _0xafcd9a.remove();
        }
      }
    } else if (_0x5f3a7b.value.trim() === '') {
      _0x4cb7f0 = false;
      _0x5f3a7b.style.border = "2px solid red";
      _0x5f3a7b.style.animation = "error 200ms ease-in-out";
      if (!_0xafcd9a) {
        _0xafcd9a = document.createElement("span");
        _0xafcd9a.textContent = "⚠︎ This field is required!";
        _0xafcd9a.style.animation = "error 200ms ease-in-out";
        _0xafcd9a.style.color = 'red';
        _0xafcd9a.style.display = "block";
        _0xafcd9a.style.marginTop = "3px";
        _0xafcd9a.style.fontSize = '8px';
        _0xafcd9a.style.fontFamily = "Tondo";
        _0xafcd9a.classList.add("input-warning2");
        _0x5f3a7b.parentNode.insertBefore(_0xafcd9a, _0x5f3a7b.nextSibling);
      }
    } else {
      _0x5f3a7b.style.border = '';
      _0x5f3a7b.style.boxShadow = '';
      if (_0xafcd9a) {
        _0xafcd9a.remove();
      }
    }
  });
  return _0x4cb7f0;
}
nextBtn1mlbb.addEventListener('click', nextMlbbSlide);
nextBtn2mlbb.addEventListener("click", prevMlbbSlide);
showMlbbSlide(mlbbIndex);
const videoThumbnails = document.querySelectorAll(".video-gallery .video-playlist .thumbnail");
const videoPlayer = document.querySelector(".video-gallery .main-video iframe");
const videoTitle = document.querySelector(".video-gallery .video-title");
const showVideo = (_0x1e155d, _0x33704c) => {
  let _0x3c2412 = "https://www.youtube.com/embed/" + _0x1e155d;
  videoPlayer.setAttribute("src", _0x3c2412);
  videoTitle.innerHTML = _0x33704c;
};
videoThumbnails.forEach(_0x1040e1 => {
  _0x1040e1.addEventListener("click", () => {
    showVideo(_0x1040e1.dataset.id, _0x1040e1.dataset.title);
  });
});
const openChatBtn = document.getElementById("openChatBtn");
const closeChatBtn = document.getElementById('closeChatBtn');
const chatPopup = document.getElementById("chatPopup");
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const responses = {
  'hello': 'Hi',
  'hi': "Hello",
  'register': "You can register by selecting the Registration option under Products.",
  'registration': "How can we help you?",
  'avail': "You can avail a ticket under the products, select 'Ticket'",
  'ticket': "You can avail a ticket under the products, select 'Ticket'",
  'upcomming events': "Check out the Sneaky Rival event by clicking the link for more information.<a>https://www.facebook.com/SneakyEventsTeam</a>",
  'are there any upcoming events': "Check out the Sneaky Rival event by clicking the link for more information.<a>https://www.facebook.com/SneakyEventsTeam</a>",
  'how to register': "Follow the steps provided by clicking the link.<a>https://sneakyeventsteam.com/#products</a>"
};
function sendMessage() {
  const _0x2db840 = userInput.value.trim().toLowerCase();
  if (_0x2db840 !== '') {
    appendMessage("You", _0x2db840);
    showTypingIndicator();
    setTimeout(function () {
      hideTypingIndicator();
      let _0x184652 = "Please correct or complete your sentence, or chat with us live by selecting the 'open live chat' button or using messenger.";
      Object.keys(responses).forEach(_0x3cf4c6 => {
        if (_0x2db840.includes(_0x3cf4c6)) {
          _0x184652 = responses[_0x3cf4c6];
        }
      });
      appendMessage("Sneaky", _0x184652);
      scrollChatToBottom();
      userInput.value = '';
    }, 0x1f4);
  }
}
document.getElementById("userInput").addEventListener("keypress", function (_0x5675a8) {
  if (_0x5675a8.key === "Enter") {
    _0x5675a8.preventDefault();
    sendMessage();
  }
});
openChatBtn.addEventListener('click', function () {
  chatPopup.style.display = "block";
  document.body.classList.add("chat-open");
});
closeChatBtn.addEventListener("click", function () {
  chatPopup.style.display = "none";
  document.body.classList.remove("chat-open");
});
sendBtn.addEventListener("click", function () {
  sendMessage();
});
function showTypingIndicator() {
  const _0x20ab02 = document.createElement("div");
  _0x20ab02.classList.add("bot-typing");
  _0x20ab02.textContent = "Sneaky Bot is typing...";
  _0x20ab02.style.marginLeft = "10px";
  _0x20ab02.style.marginTop = "20px";
  const _0x22b491 = chatPopup.querySelector('.message:last-child');
  if (_0x22b491) {
    _0x22b491.insertAdjacentElement("afterend", _0x20ab02);
  } else {
    chatPopup.appendChild(_0x20ab02);
  }
}
function hideTypingIndicator() {
  const _0x4eba82 = document.querySelector(".bot-typing");
  if (_0x4eba82) {
    _0x4eba82.remove();
  }
}
function appendMessage(_0x26c927, _0x2f7517) {
  const _0x449d9c = document.querySelector(".chat-content");
  const _0x29a901 = document.createElement('div');
  _0x29a901.classList.add("message");
  _0x29a901.innerHTML = '<strong>' + _0x26c927 + ":</strong> " + _0x2f7517;
  if (_0x26c927 === "You") {
    _0x29a901.style.backgroundColor = "rgba(251, 27, 27, 0.821)";
    _0x29a901.style.border = 'none';
    _0x29a901.style.borderRadius = "10px 10px 0 10px";
    _0x29a901.style.color = "white";
    _0x29a901.style.maxWidth = "fit-content";
    _0x29a901.style.float = "right";
    _0x29a901.style.padding = "10px";
    _0x29a901.style.marginBottom = "20px";
    _0x29a901.style.animation = "slideUpmsg 100ms ease-in-out";
  } else if (_0x26c927 === "Sneaky") {
    _0x29a901.style.marginLeft = "10px";
    _0x29a901.style.padding = '10px';
    _0x29a901.style.backgroundColor = "#1c1f50";
    _0x29a901.style.maxWidth = "fit-content";
    _0x29a901.style.width = "70%";
    _0x29a901.style.border = "none";
    _0x29a901.style.borderRadius = "0px 10px 10px 10px";
    _0x29a901.style.marginTop = "40px";
    _0x29a901.style.animation = "slideUpmsg 100ms ease-in-out";
  }
  _0x449d9c.appendChild(_0x29a901);
}
function scrollChatToBottom() {
  const _0x2e8fae = document.querySelector('.chat-content');
  _0x2e8fae.scrollTop = _0x2e8fae.scrollHeight;
}
const submitbtnticket = document.getElementById("submitbtnticket");
const form = document.forms["ticket-form"];
const checkboxes = document.querySelectorAll("[id^=\"dateselect-\"]");
const labels = document.querySelectorAll("[id^=\"labeldate-\"]");
const inputs = form.querySelectorAll("input[required], select[required]");
const fileInput = document.getElementById("ticketproof");
function isFormFilled() {
  let _0x4337a2 = true;
  inputs.forEach(_0x41c74d => {
    if (!_0x41c74d.value) {
      _0x4337a2 = false;
      return;
    }
  });
  let _0xac6650 = false;
  checkboxes.forEach(_0x2b435a => {
    if (_0x2b435a.checked) {
      _0xac6650 = true;
      return;
    }
  });
  const _0x4999ba = fileInput.files && fileInput.files.length > 0x0;
  return _0x4337a2 && _0xac6650 && _0x4999ba;
}
const submitbtnmessage = document.getElementById("submitbtnmessage");
function updateSubmitButton() {
  if (isFormFilled()) {
    submitbtnticket.style.display = 'block';
    submitbtnticket.disabled = false;
    submitbtnmessage.style.display = "none";
  } else {
    submitbtnticket.style.display = "none";
    submitbtnticket.disabled = true;
    submitbtnmessage.style.display = "block";
  }
}
inputs.forEach(_0x3b583d => {
  _0x3b583d.addEventListener("input", updateSubmitButton);
});
checkboxes.forEach(function (_0x1ac0ad, _0x2249f1) {
  _0x1ac0ad.addEventListener("change", function () {
    if (this.checked) {
      labels[_0x2249f1].style.color = "#e23434";
      labels[_0x2249f1].style.border = "1px solid #e23434";
    } else {
      labels[_0x2249f1].style.color = '';
      labels[_0x2249f1].style.border = "1px solid #d3cece";
    }
    updateSubmitButton();
  });
});
fileInput.addEventListener('change', updateSubmitButton);
form.addEventListener("submit", function (_0x25321e) {
  if (!isFormFilled()) {
    _0x25321e.preventDefault();
    alert("Please fill in all required fields.");
  }
});
let slideIndex = 0x1;
showSlides(slideIndex);
function plusSlides(_0x88b6a2) {
  showSlides(slideIndex += _0x88b6a2);
}
function currentSlide(_0x4a8987) {
  showSlides(slideIndex = _0x4a8987);
}
function showSlides(_0x239410) {
  let _0x1c2a75;
  let _0x21b422 = document.getElementsByClassName("mySlides");
  let _0x59cfab = document.getElementsByClassName('dot');
  if (_0x239410 > _0x21b422.length) {
    slideIndex = 0x1;
  }
  if (_0x239410 < 0x1) {
    slideIndex = _0x21b422.length;
  }
  for (_0x1c2a75 = 0x0; _0x1c2a75 < _0x21b422.length; _0x1c2a75++) {
    _0x21b422[_0x1c2a75].style.display = 'none';
  }
  for (_0x1c2a75 = 0x0; _0x1c2a75 < _0x59cfab.length; _0x1c2a75++) {
    _0x59cfab[_0x1c2a75].className = _0x59cfab[_0x1c2a75].className.replace(" active", '');
  }
  _0x21b422[slideIndex - 0x1].style.display = 'block';
  _0x59cfab[slideIndex - 0x1].className += " active";
}
  
  // About Us Pop up
var modal = document.getElementById("myModal");
var openModalBtns = document.getElementsByClassName("openModalBtn");
var span = document.getElementById('close');

var content = [
  "<h2>Mission</h2><br /><p>Crafting innovative events and experiences that surprise, entertain, and leave lasting impressions, while seamlessly integrating activations and advertising to amplify brand impact and to become the aspiring gamers, casters, analysts, and organizers' hub for knowledge and advancement through tournaments, events and live streaming experiences.</p>",
  "<h2>Vision</h2><br /><p>To lead the event industry as innovators, redefining experiential marketing by transforming ordinary moments into extraordinary memories, while becoming the top choice for brands seeking dynamic activations and remarkable event solutions and we endeavor to bridge the gap between amateur and professional scenes. We intend to utilize this platform to bring together, inspire, and challenge the future generation of the online gaming community to develop their abilities and uphold the greatest standards in the e-sports sector as a whole.</p>",
  "<h2>Core Values</h2><br /><p>B - Be collaborative and be a host</p><p>E - Engage</p><p>S - Share positive vibes</p><p>E - Excellence</p><p>I - Innovate courageously</p><p>F - Find a better way</p><p>E - Embrace difference by design</p><p>T - Team on a mission</p><p>S - Skilled and Strength on our differences</p><p>I - Integrity</p><p>D - Dedicated to the dream</p>"
];

for (var i = 0; i < openModalBtns.length; i++) {
  openModalBtns[i].addEventListener("click", function() {
    var index = Array.from(openModalBtns).indexOf(this);
    document.getElementById("modalContent").innerHTML = content[index];
    modal.style.display = "block";
    modal.style.animation = 'popUp 300ms ease-in-out';
  });
}

span.addEventListener('click', function() {
  modal.style.display = "none";
});

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
