import express from 'express';

export default class SearchController {
	public path = '/cities';
	public router = express.Router();

	private posts = [{
		author: 'Marcin',
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
		console.log('SearchController', request.query);
		response.send(this.posts);
	}
}