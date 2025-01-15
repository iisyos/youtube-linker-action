import { YouTubeContentType } from './types.js'

export const detectYoutubeContent = (videoUrl: string): YouTubeContentType => {
  try {
    const url = new URL(videoUrl)
    if (url.protocol !== 'https:') {
      throw new Error('Only HTTPS protocol is supported')
    }

    if (url.hostname.toLowerCase() !== 'www.youtube.com') {
      throw new Error('Invalid YouTube domain')
    }

    const normalizedPath = url.pathname.replace(/\/$/, '')
    if (normalizedPath.startsWith('/shorts/')) {
      return 'short'
    }

    if (
      normalizedPath.startsWith('/watch') ||
      normalizedPath.startsWith('/embed/')
    ) {
      return 'video'
    }

    throw new Error('Invalid YouTube URL path')
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Invalid URL format')
  }
}
