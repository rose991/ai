song = "";
 var lwx =0;
 var lwy = 0;
 var rwx = 0;
 var rwy = 0;
 scoreleftwristy = 0;
 scorerightwristy = 0;
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelLoaded())
    posenet.on('pose',gotPoses)
}
function modelLoaded(){
    console.log("posenet has been initialized");
}
function gotPoses(results){
if(results.length>0){
    console.log(results)
    scoreleftwristy = results[0].pose.keypoints[9].score;
    scorerightwristy = results[0].pose.keypoints[10].score
    console.log("left wrist score is "+scoreleftwristy );
    console.log("right wrist score is "+scorerightwristy );
    lwx = results[0].pose.leftWrist.x;
    lwy = results[0].pose.leftWrist.y;
    console.log("left wrist x position = "+ lwx +"and y position= "+lwy);
    rwx = results[0].pose.rightWrist.x;
    rwy = results[0].pose.rightWrist.y;
    console.log("right wrist x position = "+ rwx +"and y position= "+rwy);
}
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
   if(scoreleftwristy>0.22){
    circle(lwx,lwy,20);
    innumberlwy = Number(lwy);
    rmv_decimal = floor(innumberlwy)
    volume = rmv_decimal/500;
    document.getElementById("volume1").innerHTML = "the volume is "+ volume;
    song.setVolume(volume);
   }
   if(scorerightwristy>0.2){
    circle(rwx,rwy,20);
    if(rwy>0 && rwx<=100){
        document.getElementById("speed").innerHTML = "speed = 0.5x"
        song.rate(0.5);
    }else if(rwy>100 && rwx<=200){
        document.getElementById("speed").innerHTML = "speed = 1x"
        song.rate(1);
    }else if(rwy>200 && rwx<=300){
        document.getElementById("speed").innerHTML = "speed = 1.5x"
        song.rate(1.5);
    }else if(rwy>300 && rwx<=400){
        document.getElementById("speed").innerHTML = "speed = 2x"
        song.rate(2);
    }else if(rwy>400 && rwx<=500){
        document.getElementById("speed").innerHTML = "speed = 2.5x"
        song.rate(2.5);
    }
   }

}
function preload(){
song = loadSound("music.mp3");
}
function play(){
    song.play();
}