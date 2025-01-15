import { YouTubeContentFactory } from '../src/factories/youtube-content.factory.js'
import { YouTubeShort } from '../src/services/youtube_short.js'
import { YouTubeVideo } from '../src/services/youtube_video.js'

describe('YouTubeContentFactory', () => {
  describe('createContent', () => {
    it('should create YouTubeShort instance for shorts URL', () => {
      const shortsUrl = 'https://www.youtube.com/shorts/abc123'
      const content = YouTubeContentFactory.createContent(shortsUrl)

      expect(content).toBeInstanceOf(YouTubeShort)
      expect(content.getUrl()).toBe(shortsUrl)
      expect(content.getVideoId()).toBe('abc123')
    })

    it('should create YouTubeVideo instance for regular video URL', () => {
      const videoUrl = 'https://www.youtube.com/watch?v=xyz789'
      const content = YouTubeContentFactory.createContent(videoUrl)

      expect(content).toBeInstanceOf(YouTubeVideo)
      expect(content.getUrl()).toBe(videoUrl)
      expect(content.getVideoId()).toBe('xyz789')
    })

    it('should handle shorts URL with query parameters', () => {
      const shortsUrl = 'https://www.youtube.com/shorts/abc123?feature=share'
      const content = YouTubeContentFactory.createContent(shortsUrl)

      expect(content).toBeInstanceOf(YouTubeShort)
      expect(content.getVideoId()).toBe('abc123')
    })

    it('should handle video URL with additional parameters', () => {
      const videoUrl =
        'https://www.youtube.com/watch?v=xyz789&t=123&feature=share'
      const content = YouTubeContentFactory.createContent(videoUrl)

      expect(content).toBeInstanceOf(YouTubeVideo)
      expect(content.getVideoId()).toBe('xyz789')
    })

    it('should throw error for invalid YouTube URLs', () => {
      const invalidUrls = [
        'https://example.com',
        'not-a-url',
        'http://www.youtube.com/shorts/abc123', // non-HTTPS
        'https://youtube.com/abc123' // invalid path
      ]

      invalidUrls.forEach((url) => {
        expect(() => YouTubeContentFactory.createContent(url)).toThrow()
      })
    })
  })
})
