import { YouTubeContent } from '../interfaces/youtube-content.interface.js';
export declare class YouTubeContentFactory {
    static createContent(url: string): YouTubeContent;
    private static isShort;
}
