var restify = require('restify')
, db = require('save')('task')
, server = restify.createServer({ name: 'node' })

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url)
})

server.use(restify.bodyParser())







// SEARCH 
// =============================================

// GET_ALL : récupère toutes les tâches
server.get('/get_all', function(req, res, next) {
	db.find({ }, function(err, data) {
		if (data)
			res.send(data)
		else
			res.send(404)
	})
})

// GET_ID : récupère une tâche par son ID
server.get('/get_id/:id', function(req, res, next) {
	db.findOne({ _id: req.params.id }, function(err, data) {
		if (data)
			res.send(data)
		else
			res.send(404)
	})
})

// GET_NAME : récupère une tâche par son nom
server.get('/get_name/:name', function(req, res, next) {
	db.findOne({ name: req.params.name }, function(err, data) {
		if (data)
			res.send(data)
		else
			res.send(404)
	})
})

// GET_STATUS : récupère toutes les tâches ayant un certain statut
server.get('/get_status/:status', function(req, res, next) {
	db.find({ status: req.params.status }, function(err, data) {
		if (data)
			res.send(data)
		else
			res.send(404)
	})
})

// GET_WORKER : récupère toutes les tâches assignée à une certain personne
server.get('/get_worker/:worker', function(req, res, next) {
	db.find({ worker: req.params.worker }, function(err, data) {
		if (data)
			res.send(data)
		else
			res.send(404)
	})
})





// EDIT
// =============================================

// CREATE : crée une nouvelle tâche
server.post('/task', function(req, res, next) {
	db.create({
			name: req.params.name,
			description: (req.params.desc === undefined ? "No description yet ..." : req.params.desc),
			author: (req.params.author === undefined ? "" : req.params.author),
			worker: (req.params.worker === undefined ? "" : req.params.worker),
			status: (req.params.status === undefined ? "Libre" : req.params.status)
		}, function(err, data) {
		if (err)
			return next(new restify.InvalidArgumentError(JSON.stringify(err.errors)))
		res.send(201, data)
	})
})

// DELETE : suppprime une tâche
server.del('/task/:id', function(req, res, next) {
	db.delete( req.params.id, function(err, data) {
		if (err)
			return next(new restify.InvalidArgumentError(JSON.stringify(err.errors)))
		res.send(200)
	})
})

// ASSIGN : modifie la personne assignée à cette tâche
server.put('/task/:id/set_worker', function(req, res, next) {
	if (req.params.worker === undefined)
		return next(new restify.InvalidArgumentError("Parameter 'worker' missing !"))
	db.update({
			_id: req.params.id,
			worker: req.params.worker
		}, function(err, data) {
		if (err)
			return next(new restify.InvalidArgumentError(JSON.stringify(err.errors)))
		res.send(200)
	})
})

// STATUS : modifie le status de cette tâche
server.put('/task/:id/set_status', function(req, res, next) {
	if (req.params.status === undefined)
		return next(new restify.InvalidArgumentError("Parameter 'status' missing !"))
	db.update({
			_id: req.params.id,
			status: req.params.status
		}, function(err, data) {
		if (err)
			return next(new restify.InvalidArgumentError(JSON.stringify(err.errors)))
		res.send(200)
	})
})

// DESC : modifie la description de cette tâche
server.put('/task/:id/set_desc', function(req, res, next) {
	if (req.params.desc === undefined)
		return next(new restify.InvalidArgumentError("Parameter 'desc' missing !"))
	db.update({
			_id: req.params.id,
			desc: req.params.desc
		}, function(err, data) {
		if (err)
			return next(new restify.InvalidArgumentError(JSON.stringify(err.errors)))
		res.send(200)
	})
})
