import { detectYoutubeContent } from '../utils.js'
import { YouTubeContent } from '../interfaces/youtube-content.interface.js'
import { YouTubeShort } from '../services/youtube_short.js'
import { YouTubeVideo } from '../services/youtube_video.js'

export class YouTubeContentFactory {
  static createContent(url: string): YouTubeContent {
    if (this.isShort(url)) {
      return new YouTubeShort(url)
    }
    return new YouTubeVideo(url)
  }

  private static isShort(url: string): boolean {
    return detectYoutubeContent(url) === 'short'
  }
}
