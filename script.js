const typingText = document.querySelector('.typing-test p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')


// setting values

let timer;
let maxTime=60;
let timeLeft=maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;
function loadParagraph(){

    const paragraph = [
        "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet. Typing is an essential skill in today's digital world where computers dominate both work and leisure activities. Regular practice can significantly improve your speed and accuracy. Focus on hitting the right keys without looking at your keyboard to develop muscle memory. Many jobs now require fast typing skills, making this test valuable for professional development.",
        "Programming requires precision typing as even a single misplaced character can break your entire code. Modern keyboards are designed for comfort during long coding sessions. JavaScript, Python, and Java are among the most popular programming languages today. Cloud computing has revolutionized how we store and access data. Artificial intelligence is transforming industries from healthcare to finance. Cybersecurity has become crucial in our increasingly connected world.",
        "It was the best of times, it was the worst of times; it was the age of wisdom, it was the age of foolishness. The period was so far like the present period that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only. There were a king with a large jaw and a queen with a plain face, on the throne of England.",
        "Did you know the average typing speed is about 40 words per minute? The world record is over 200 words per minute! Cats sleep for about 70% of their lives. Bananas are berries but strawberries aren't. The shortest war in history lasted only 38 minutes. Honey never spoils - archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat!",
        "Effective communication skills are vital in the modern workplace. Clear emails and well-written reports can make a significant difference in your career progression. Time management and organization are equally important as technical skills for most professional roles. Networking remains one of the most powerful tools for career advancement. Continuous learning is essential in our rapidly changing business environment.",  
        "The International Space Station orbits Earth every 90 minutes at 17,500 mph. Astronauts experience 16 sunrises daily while conducting experiments in microgravity. NASA's Artemis program aims to return humans to the Moon by 2026, targeting the lunar south pole where water ice exists in permanently shadowed craters. Mars remains the ultimate goal, with SpaceX developing Starship for potential crewed missions. Space technology has led to countless Earth benefits including GPS, weather forecasting, and medical imaging advancements."
    ];

    
    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML="";
    for(const chr of paragraph[randomIndex]){
        typingText.innerHTML+=`<span>${chr}</span>`;
    }

    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingText.addEventListener('click',()=>input.focus())
}


// Handle User input

function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);



    if(charIndex < char.length && timeLeft >0 ){
        if(!isTyping){
            timer=setInterval(initTime,1000);
            isTyping=true;
        }
        if(char[charIndex].innerText===typedChar){
            char[charIndex].classList.add('correct');
            console.log("correct");
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log("Incorect");
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText=mistake;

        cpm.innerText=charIndex-mistake;
    }
    else{
        clearInterval(timer);
        input.value='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        const wpmVal= Math.round(((charIndex-mistake)/5) /(maxTime - timeLeft)*60)
        wpm.innerText=wpmVal;
    }
    else{
        clearInterval(timer);
    }
}
function reset(){
    loadParagraph();
let maxTime=60;

    clearInterval(timer);
    timeLeft=maxTime;
    time.innerText=timeLeft;
    input.value='';
    charIndex=0;
    mistake=0;
    isTyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;


}
loadParagraph();

input.addEventListener("input",initTyping);
btn.addEventListener('click',reset);