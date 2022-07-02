interface IOptions {
    apiKey?: string;
    sources?: string;
}

interface IEverything extends Array<IArticle> {
    status: string;
    totalResults: number;
    articles: Array<IArticle>;
}

interface IArticle {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
}

type ISourcesData = Array<ISources>;
interface ISources {
    id: string;
    name: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

enum APIEndpoints {
    sources = 'sources',
    everything = 'everything',
}

export { IOptions, IEverything, IArticle, ISourcesData, APIEndpoints };
