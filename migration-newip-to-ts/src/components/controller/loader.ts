import { IOptions } from 'types/index';

class Loader {
    baseLink: string;
    options: Array<string>;

    constructor(baseLink: string, options: Array<string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options: IOptions },
        callback: <T>(data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response | never {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: IOptions, endpoint: string) {
        const urlOptions: Record<string, unknown> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key): void => {
            url += `${key}=${urlOptions[key]}&`;
        });
        console.log(url.slice(0, -1));
        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: <T>(data: T) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return callback(data);
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
