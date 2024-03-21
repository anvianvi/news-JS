enum ResStatus {
    Ok = 'ok',
    Error = 'error',
}

export type NameOfNewsSource = {
    id: string;
    name: string;
};

export type Article = {
    source: NameOfNewsSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export type Source = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

type BaseResponse = {
    status: ResStatus;
};

export type SourcesResponse = BaseResponse & {
    sources: Source[];
};

export type ArticlesResponse = BaseResponse & {
    totalResults: number;
    articles: Article[];
};
