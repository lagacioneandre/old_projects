import App from './app';

// controlles
import SearchController from './search/search-controller';
import TesteController from './search/teste-controller';

const app = new App(
    [
        new SearchController(),
        new TesteController()
    ],
    3001
);

app.listen();