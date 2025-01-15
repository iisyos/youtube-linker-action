# YouTube Linker Action

A GitHub Action that automatically adds a random YouTube video or shorts link as a comment when a pull request or issue is created.

## Inputs

### `youtube_urls`
**Required** Comma-separated list of YouTube URLs (both regular videos and shorts).

### `github_token`
**Required** GitHub token for creating comments.
Default: `${{ github.token }}`

## Outputs

### `selected_url`
The randomly selected YouTube URL.

### `video_id`
The ID of the selected video.

### `comment_type`
Type of the comment (pull_request or issue).

### `number`
The issue or pull request number.

## Usage

Basic usage example:

```yaml
name: Add YouTube Comment
on:
  pull_request:
    types: [opened]
  issues:
    types: [opened]

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: your-username/youtube-linker-action@v1
        with:
          youtube_urls: |
            https://www.youtube.com/watch?v=abc123,
            https://www.youtube.com/shorts/xyz789
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## Example Output

When a pull request or issue is created, the action will add a comment like this:

[![](https://img.youtube.com/vi/jNQXAC9IVRw/0.jpg)](https://www.youtube.com/watch?v=jNQXAC9IVRw)

## License

[MIT](LICENSE)