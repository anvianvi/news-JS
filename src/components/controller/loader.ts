interface BaseOptions {
    apiKey: string;
}

interface ReqOptions {
    sources?: string;
}
class Loader {
    baseLink: string;
    options: BaseOptions;

    constructor(baseLink: string, options: BaseOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        options: {
            endpoint: string;
            options?: ReqOptions;
        },
        callback: (data: T) => void
    ) {
        this.load<T>('GET', options.endpoint, callback, options.options || {});
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: ReqOptions, endpoint: string) {
        const urlOptions: {
            [key: string]: string;
        } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint: string, callback: (data: T) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
