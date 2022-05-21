Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality : 90
});

prediction = "";

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("output").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8sC5WolOS/model.json', modelLoaded);

function modelLoaded()
{
    console.log("Model loaded.");
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "Your hand gesture is" + prediction;
    
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_hand_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Thumbs Up")
        {
            document.getElementById("update_hand_gesture").innerHTML = "&#128077;";
        }
        if(results[0].label == "Okay")
        {
            document.getElementById("update_hand_gesture").innerHTML = "&#128076;";
        }
        if(results[0].label == "Thumbs Down")
        {
            document.getElementById("update_hand_gesture").innerHTML = "&#128078;";
        }
        if(results[0].label == "Peace")
        {
            document.getElementById("update_hand_gesture").innerHTML = "&#9996;";
        }
        if(results[0].label == "Stop")
        {
            document.getElementById("update_hand_gesture").innerHTML = "&#9995;";
        }
    }
}