import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '6d6f29398b8f4a67ae55c26af0a77e2f', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
