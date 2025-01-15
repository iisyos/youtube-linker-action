import { YouTubeContent } from '../interfaces/youtube-content.interface.js'

export class YouTubeShort implements YouTubeContent {
  private videoUrl: string
  constructor(videoUrl: string) {
    this.videoUrl = videoUrl
  }

  getUrl(): string {
    return this.videoUrl
  }

  getVideoId(): string {
    const url = new URL(this.videoUrl)
    return url.pathname.split('/').pop() || ''
  }

  getThumbnailUrl(): string {
    return `https://img.youtube.com/vi/${this.getVideoId()}/0.jpg`
  }
}
