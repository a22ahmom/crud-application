export interface Quote {
    id?: number,
    text: string,
    author: string
    userId: number;

    user?: {
        id: number;
        username: string;
    };
}