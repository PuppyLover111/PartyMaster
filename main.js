song="";
song2="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreLeftWrist=0;
scoreRightWrist=0;
status1="";
status2="";
function preload()
{
song = loadSound("music.mp3");
song2= loadSound("music2.mp3")
}


function setup()
{
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses );

}

function modelLoaded(){
    console.log('PoseNet is initialized');
}

function gotPoses(results) {

    if(results.length > 0)
    {
        console.log(results);
        leftwristx= results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log('leftwristx = ' + leftwristx + 'leftwristy ='+leftwristy )

        rightwristx= results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log('rightwristx = ' + rightwristx + 'rightwristy ='+rightwristy)

        scoreLeftWrist= results[0].pose.keypoints[9].score;
        scoreRightWrist= results[0].pose.keypoints[10].score;
    }
}



function draw()
{
image(video, 0, 0, 600, 500);
fill("red");
stroke("red");

status1 = song2.isPlaying();
status2 = song.isPlaying();

if (scoreLeftWrist > 0.2)
{
    circle(leftwristx, leftwristy, 10);
    song2.stop()

    if (status1 == false)
    {
        song.play()

        document.getElementById("songname").innerHTML= "Harry potter";
    }

}


if (scoreRightWrist > 0.2)
{
    circle(rightwristx, rightwristy, 10);
    song.stop()

    if (status2 == false)
    {
        song2.play()

        document.getElementById("songname").innerHTML= "Peter Pan";
    }

}


}




