var socket = io('http://127.0.0.1:3006/feed')

var graphs = []
for(i=0; i<27; i++) {
	var loci = [{ x: [], y: [], type: 'scatter' }]
	graphs.push(loci)
}

socket.on('connect', function(){
	console.log("connected to server")
})

socket.on('tick', function(data){
	console.log(data)
	
	for(i=0; i<27; i++){
		var pair = data[i]
		graphs[i][0].x.push(pair.timestamp)
		graphs[i][0].y.push(pair.bid_fig + pair.bid_pts)
		
		// for the time being only plot the graph of usd/cad
		if(pair.pair === "USD/CAD" || pair.pair === "AUD/CAD") {
			Plotly.newPlot('chart'+i, graphs[i])
		}
	}
})

socket.on('disconnect', function(){
	console.log("disconnected from server")
})