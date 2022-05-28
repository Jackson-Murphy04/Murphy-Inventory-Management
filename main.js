const express = require('express');
const Datastore = require('nedb');

const app = express();

app.listen(5000, () => console.log('listening at 5000'));

app.use(express.static('public'));
app.use(express.json());

const database = new Datastore('inventory.db');
database.loadDatabase();

app.post('/api', (request, response) => {
	console.log('I got a request');
	const data = request.body;
	database.insert(data);
	response.json({
		_id: data._id
	});
})

const database2 = new Datastore('out.db');
database2.loadDatabase();

app.post('/apiOut', (request, response) => {
	console.log('I got a request');
	const data = request.body;
	database2.insert(data);
	response.json({
		status: 'success',
		name: data.name1,
	});
})

app.get('/api', (request, response) => {
	console.log('get request');
	database.find({}, (err, data) => {
		response.json(data);
	})
})

app.get('/apiOut', (request, response) => {
	console.log('get request');
	database2.find({}, (err, data) => {
		response.json(data);
	})
})

app.post('/apiRemove', (request, response) => {
	console.log('get request');
	const data = request.body;
	console.log(data);
	database2.remove(data, {multi: true}, (err, numRemoved) => {
		response.json({
			status: 'success',
			name: data.name1,
			removed: numRemoved
		})
	})
})

app.post('/apiRemove2', (request, response) => {
	console.log('get request');
	const data = request.body;
	console.log(data);
	database.remove(data, {multi: true}, (err, numRemoved) => {
		response.json({
			status: 'success',
			name: data.name1,
			removed: numRemoved
		})
	})
})

app.post('/apiRemove3', (request, response) => {
	console.log('get request');
	const data = request.body;
	console.log(data);
	database.remove(data, {}, (err, numRemoved) => {
		response.json({
			status: 'success',
			name: data.name1,
			removed: numRemoved
		})
	})
})












