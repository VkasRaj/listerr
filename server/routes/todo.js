const express = require("express");
const router = express.Router();

const ToDo = require("../models/todo");

router.get("/", (req, res) => {
	ToDo.find()
		.populate("author", "_id email")
		.select("_id title description author")
		.then(todos => {
			res.status(200).send({ todos });
		})
		.catch(error => {
			res.status(500).send({ error });
		});
});

router.post("/", (req, res) => {
	const { title, description, reminder, author } = req.body;

	var TD = new ToDo({
		title,
		description,
		reminder,
		author
	});

	TD.save()
		.then(todo => {
			res.status(201).send({
				message: "Todo successfully created",
				todo
			});
		})
		.catch(error => {
			res.status(500).send({ error });
		});
});

router.patch("/:todoId", (req, res) => {
	const { todoId: _id } = req.params;

	const update = {};

	for (const field in req.body) {
		update[field] = req.body[field];
	}

	ToDo.findByIdAndUpdate(_id, update, { new: true })
		.select("_id title description reminder")
		.then(todo => {
			if (todo) {
				res.status(200).send({
					message: "Todo successfully updated",
					todo
				});
			} else {
				res.status(404).send({
					message: "Todo not found"
				});
			}
		})
		.catch(error => {
			res.status(500).send({ error });
		});
});

router.delete("/:todoId", (req, res) => {
	const { todoId: _id } = req.params;

	ToDo.remove({ _id })
		.then(todo => {
			if (todo.n) {
				res.status(200).send({
					message: "Todo successfully deleted"
				});
			} else {
				res.status(404).send({
					error: "Todo not found"
				});
			}
		})
		.catch(error => {
			res.status(500).send({
				error
			});
		});
});

module.exports = router;
