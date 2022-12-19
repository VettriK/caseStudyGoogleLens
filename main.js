function setup() {
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}
function modelLoaded(){
  console.log('Model Loaded Successfully');
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video, gotResult);
}
var previous_result = "";
function gotResult(error, result){
  if (error){
    console.error(error);
  }
  else {
    if((result[0].confidence>0.5) && (previous_result != result[0].label)){
      console.log(result);
      previous_result = result[0].label;
      var speechAPI = window.speechSynthesis;
      speak_data = "Object Detected is:"+result[0].label;
      var textToSpeech = new SpeechSynthesisUtterance(speak_data);
    speechAPI.speak(textToSpeech)
    document.getElementById("object").innerHTML = result[0].label;
    document.getElementById("accuracy").innerHTML = result[0].confidence.toFixed(3)*100+"%"
    }
  }

}



