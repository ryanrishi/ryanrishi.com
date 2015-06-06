var context = new AudioContext();
var analyser = audioCtx.createAnalyser();

var audioBuffer, sourceNode;
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

function setupAudioNodes() {
    // create a buffer source node
    sourceNode = context.createBufferSource();
    // and connect to destination
    sourceNode.connect(context.destination);
}

function loadFile(url) {
	var req = new XMLHttpRequest();
	req.open('GET', url, true);
	req.responsetype = 'arraybuffer';
	req.onload = function () {
		context.decodeAudioData(request.response, function(buffer) {
            // when the audio is decoded play the sound
            playSound(buffer);
        }, onError);
    }
    request.send();
}

function draw() {

	drawVisual = requestAnimationFrame(draw);

	analyser.getByteTimeDomainData(dataArray);

	canvasCtx.fillStyle = 'rgb(200, 200, 200)';
	canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

	canvasCtx.lineWidth = 2;
	canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

	canvasCtx.beginPath();

	var sliceWidth = WIDTH * 1.0 / bufferLength;
	var x = 0;

	for(var i = 0; i < bufferLength; i++) {

		var v = dataArray[i] / 128.0;
		var y = v * HEIGHT/2;

		if(i === 0) {
		  canvasCtx.moveTo(x, y);
		} else {
		  canvasCtx.lineTo(x, y);
		}

		x += sliceWidth;
	}

	canvasCtx.lineTo(canvas.width, canvas.height/2);
	canvasCtx.stroke();
};

draw();


function onError(e) {
	console.log(e);
}
