import { YouTubeContent } from '../interfaces/youtube-content.interface.js';
export declare class YouTubeShort implements YouTubeContent {
    private videoUrl;
    constructor(videoUrl: string);
    getUrl(): string;
    getVideoId(): string;
    getThumbnailUrl(): string;
}
