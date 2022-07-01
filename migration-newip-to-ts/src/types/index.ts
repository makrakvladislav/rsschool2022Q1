interface IOptions {
    apiKey?: string;
    sources?: string;
}

interface IEverything {
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

export { IOptions, IEverything, IArticle };
