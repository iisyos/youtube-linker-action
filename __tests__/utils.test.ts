/**
 * Unit tests for detectYoutubeContent utility function
 */
import { detectYoutubeContent } from '../src/utils.js'
import { YouTubeContentType } from '../src/types.js'

describe('utils.ts', () => {
  describe('detectYoutubeContent', () => {
    it('should detect YouTube Shorts URL', () => {
      const shortsUrls = [
        'https://www.youtube.com/shorts/abc123',
        'https://www.youtube.com/shorts/xyz789?feature=share',
        'https://www.youtube.com/shorts/def456#timestamp'
      ]

      shortsUrls.forEach((url) => {
        const result = detectYoutubeContent(url)
        expect(result).toBe('short')
      })
    })

    it('should detect regular YouTube video URL', () => {
      const videoUrls = [
        'https://www.youtube.com/watch?v=abc123',
        'https://www.youtube.com/watch?v=xyz789&feature=share',
        'https://www.youtube.com/embed/def456'
      ]

      videoUrls.forEach((url) => {
        const result = detectYoutubeContent(url)
        expect(result).toBe('video')
      })
    })

    it('should throw error for invalid YouTube URLs', () => {
      const invalidUrls = [
        'https://example.com',
        'not-a-url',
        'https://youtu.be/abc123', // 短縮URL
        'http://www.youtube.com' // パスなし
      ]

      invalidUrls.forEach((url) => {
        expect(() => detectYoutubeContent(url)).toThrow()
      })
    })

    it('should handle various URL formats', () => {
      const testCases: Array<[string, YouTubeContentType]> = [
        ['https://www.youtube.com/shorts/abc123?feature=share', 'short'],
        ['https://www.youtube.com/watch?v=xyz789&t=123', 'video'],
        ['https://www.youtube.com/shorts/def456#t=30', 'short'],
        ['https://www.youtube.com/watch?v=ghi789&list=PLabc123', 'video']
      ]

      testCases.forEach(([url, expected]) => {
        const result = detectYoutubeContent(url)
        expect(result).toBe(expected)
      })
    })

    it('should be case insensitive for hostname', () => {
      const url = 'https://WWW.YOUTUBE.COM/shorts/abc123'
      const result = detectYoutubeContent(url)
      expect(result).toBe('short')
    })

    it('should throw error for non-HTTPS URLs', () => {
      const url = 'http://www.youtube.com/shorts/abc123'
      expect(() => detectYoutubeContent(url)).toThrow()
    })
  })
})
