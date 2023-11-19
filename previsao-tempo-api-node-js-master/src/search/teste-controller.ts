import express from 'express';

export default class TesteController {
	public path = '/teste';
	public router = express.Router();

	private posts = [{
		author: 'TesteController',
		content: 'Dolor sit amet',
		title: 'Lorem Ipsum',
	}];

	constructor() {
		this.initializeRoutes();
	}
	
	public initializeRoutes() {
		this.router.get(this.path, this.getAllPost);
	}

	getAllPost = (request: express.Request, response: express.Response) => {
		console.log('TesteController', request.query);
		response.send(this.posts);
	}
}