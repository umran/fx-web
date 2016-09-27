var socket = io('http://127.0.0.1:3006')

var graphs = []
for(i=0; i<27; i++) {
	var loci = [{ x: [], y: [], type: 'scatter' }]
	graphs.push(loci)
}

socket.on('connect', function(){
	console.log("connected to server")
})

socket.on('startSession', function(){
	console.log("session initialized. requesting tick data")
	nextTick()
})

socket.on('tick', function(data){
	console.log(data)
	
	for(i=0; i<data.length; i++){
		var pair = data[i]
		graphs[i][0].x.push(pair.timestamp)
		graphs[i][0].y.push(pair.ask_fig + pair.ask_pts)
	
		Plotly.newPlot('chart'+i, graphs[i])
	}
	
	console.log("next tick in 1 second...")
	setTimeout(nextTick, 5000)
})

socket.on('disconnect', function(){
	console.log("disconnected from server")
})

function nextTick() {
	socket.emit('nextTick')
}