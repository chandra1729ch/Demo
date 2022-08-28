
// Text To Speech
const textarea = document.querySelector('#text');
let voiceList=document.querySelector('#voice');
let speechbtn=document.querySelector('.submit');

let synth = speechSynthesis;
let isSpeaking = true;
function voicespeech(){
    for (let voice of synth.getVoices()) {
        let option=document.createElement('option');
        option.text = voice.name;
        voiceList.addEventListener(option);
        console.log(option);
    }
}
synth.addEventListener('voiceschanged',voicespeech);
function texttospeech(text) {
    let utternance=new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if(voice.name===voiceList.value){
            utternance.voice=voice;
        }
    }  
    speechSynthesis.speak(utternance);  
}

speechbtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(textarea.value !==''){
        if(!synth.speaking){
            texttospeech(textarea.value);
        }
        if(textarea.value.length>80){
            if(!isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechbtn.innerHTML = 'Pause Speech';
            }else{
                synth.pause();
                isSpeaking = true;
                speechbtn.innerHTML = 'Resume Speech';
            }
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechbtn.innerHTML = 'Convert To Speech'
                }
            })
        
        }
    else{
        speechbtn.innerHTML = 'Convert To Speech'
    }
    }
    })

//Speech to Text

var speech = true;
window.SpeechRecognition = window.SpeechRecognition
                || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

    document.getElementById("input").innerHTML = transcript;
    console.log(transcript);
});
  
if (speech == true) {
    recognition.start();
    recognition.addEventListener('end', recognition.start);
}