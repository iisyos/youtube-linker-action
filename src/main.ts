import * as core from '@actions/core'
import * as github from '@actions/github'
import { YouTubeContentFactory } from './factories/youtube-content.factory.js'

function getIssueOrPRNumber(): number | undefined {
  if (github.context.eventName === 'pull_request') {
    return github.context.payload.pull_request?.number
  }
  return github.context.payload.issue?.number
}

export async function run(): Promise<void> {
  try {
    const eventName = github.context.eventName
    if (eventName !== 'pull_request' && !eventName.startsWith('issue')) {
      core.info('This action only works on pull requests and issues')
      return
    }

    // Get the issue or PR number
    const number = getIssueOrPRNumber()
    if (!number) {
      core.setFailed('Could not get issue or pull request number from context')
      return
    }

    const youtubeUrls = core.getMultilineInput('youtube_urls', {
      required: true
    })

    if (youtubeUrls.length === 0) {
      core.setFailed('No YouTube URLs provided')
      return
    }

    const randomUrl =
      youtubeUrls[Math.floor(Math.random() * youtubeUrls.length)]
    const content = YouTubeContentFactory.createContent(randomUrl)

    const token = core.getInput('github_token', { required: true })
    const octokit = github.getOctokit(token)

    const commentBody = `[![](${content.getThumbnailUrl()})](${content.getUrl()})`
    await octokit.rest.issues.createComment({
      ...github.context.repo,
      issue_number: number,
      body: commentBody
    })

    core.setOutput('selected_url', content.getUrl())
    core.setOutput('video_id', content.getVideoId())
    core.setOutput('comment_type', eventName)
    core.setOutput('number', number)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}
