import { YouTubeShort } from '../src/services/youtube_short.js'
import { YouTubeVideo } from '../src/services/youtube_video.js'

describe('YouTube Content Classes', () => {
  describe('YouTubeShort', () => {
    const validShortUrl = 'https://www.youtube.com/shorts/abc123'
    let youtubeShort: YouTubeShort

    beforeEach(() => {
      youtubeShort = new YouTubeShort(validShortUrl)
    })

    it('should return the original URL', () => {
      expect(youtubeShort.getUrl()).toBe(validShortUrl)
    })

    it('should extract video ID correctly', () => {
      expect(youtubeShort.getVideoId()).toBe('abc123')
    })

    it('should generate correct thumbnail URL', () => {
      expect(youtubeShort.getThumbnailUrl()).toBe(
        'https://img.youtube.com/vi/abc123/0.jpg'
      )
    })

    it('should handle URLs with query parameters', () => {
      const urlWithParams =
        'https://www.youtube.com/shorts/abc123?feature=share'
      const shortWithParams = new YouTubeShort(urlWithParams)
      expect(shortWithParams.getVideoId()).toBe('abc123')
    })

    it('should throw error for invalid URLs', () => {
      expect(() => {
        new YouTubeShort('not-a-url').getVideoId()
      }).toThrow()
    })

    it('should return empty string for invalid path format', () => {
      const invalidShort = new YouTubeShort('https://www.youtube.com/shorts/')
      expect(invalidShort.getVideoId()).toBe('')
    })
  })

  describe('YouTubeVideo', () => {
    const validVideoUrl = 'https://www.youtube.com/watch?v=xyz789'
    let youtubeVideo: YouTubeVideo

    beforeEach(() => {
      youtubeVideo = new YouTubeVideo(validVideoUrl)
    })

    it('should return the original URL', () => {
      expect(youtubeVideo.getUrl()).toBe(validVideoUrl)
    })

    it('should extract video ID correctly', () => {
      expect(youtubeVideo.getVideoId()).toBe('xyz789')
    })

    it('should generate correct thumbnail URL', () => {
      expect(youtubeVideo.getThumbnailUrl()).toBe(
        'https://img.youtube.com/vi/xyz789/0.jpg'
      )
    })

    it('should handle URLs with additional query parameters', () => {
      const urlWithParams =
        'https://www.youtube.com/watch?v=xyz789&t=123&feature=share'
      const videoWithParams = new YouTubeVideo(urlWithParams)
      expect(videoWithParams.getVideoId()).toBe('xyz789')
    })

    it('should throw error for invalid URLs', () => {
      expect(() => {
        new YouTubeVideo('not-a-url').getVideoId()
      }).toThrow()
    })

    it('should return empty string when v parameter is missing', () => {
      const invalidVideo = new YouTubeVideo(
        'https://www.youtube.com/watch?feature=share'
      )
      expect(invalidVideo.getVideoId()).toBe('')
    })
  })
})
