const speechInput = document.querySelector('#speech-input');
const btnListen = document.querySelector('#btnListen');
const languagesList = document.querySelector('#languages-list');
const robotOutput = document.querySelector('#robot-output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const speech = new SpeechSynthesisUtterance();

const cssColors = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "transparent", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];

function changeLanguage () {
    let selectedValue = languagesList.value;
    speech.lang = selectedValue;
    recognition.lang = selectedValue;
}
btnListen.addEventListener('click',function(){
    robotOutput.innerHTML = '';
    recognition.start();
})

recognition.onresult = function (e){
    //receives data from audio
    let transcript = e.results[0][0].transcript;
    speechInput.innerHTML = transcript;

    //Converts original string to lowercase
    let convertedTranscript = transcript.toLowerCase();

    //Converts string to an array to pick out the spoken color
    let stringArray = convertedTranscript.replace('.', '').split(" ");
    const filteredColor = stringArray.filter(element => cssColors.includes(element));
    

    readText(convertedTranscript, filteredColor);
}

function checkDate () {
    let currentHour = new Date().getHours();
    let currentMin = new Date().getMinutes();
    let period = '';

        if (currentHour <= 12) {
            period = "AM";
        } else {
            period = "PM";
        }
        if (currentMin <= 10) {
            currentMin = `0${currentMin}`;
        } 
     speech.text =  `It is currently ${currentHour - 12}:${currentMin} ${period}.`;
     console.log(currentHour);
}

function checkColor (color) {
    document.body.style.background = color;
    speech.text =  `Cool! Changing the color to ${color}!`;

}
function readText(text, color) {
    if (text.includes('time')) {
        checkDate();
    } else if (text.includes(color)) {
        checkColor(color);
    } else {
        console.log("Sorry I'm not familiar with this command");
    }

    robotOutput.innerHTML = speech.text;
    window.speechSynthesis.speak(speech);
}

recognition.onspeechend = function() {
    recognition.stop();
  }

