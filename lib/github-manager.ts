import { Octokit } from 'octokit'
import simpleGit from 'simple-git'

export class GitHubManager {
  private octokit: Octokit
  private git: ReturnType<typeof simpleGit>

  constructor(token?: string) {
    this.octokit = new Octokit({
      auth: token || process.env.GITHUB_TOKEN
    })
    this.git = simpleGit()
  }

  async listRepositories() {
    try {
      const { data } = await this.octokit.rest.repos.listForAuthenticatedUser({
        sort: 'updated',
        per_page: 100
      })
      return data
    } catch (error) {
      console.error('Failed to list repos:', error)
      throw error
    }
  }

  async createRepository(name: string, options: {
    description?: string
    private?: boolean
    autoInit?: boolean
  } = {}) {
    try {
      const { data } = await this.octokit.rest.repos.createForAuthenticatedUser({
        name,
        description: options.description || '',
        private: options.private || false,
        auto_init: options.autoInit !== false
      })
      return data
    } catch (error) {
      console.error('Failed to create repo:', error)
      throw error
    }
  }

  async commitAndPush(repoPath: string, message: string, files: string[]) {
    try {
      const git = simpleGit(repoPath)
      await git.add(files)
      await git.commit(message)
      await git.push()
      return { success: true }
    } catch (error) {
      console.error('Failed to commit and push:', error)
      throw error
    }
  }

  async cloneRepository(repoUrl: string, targetPath: string) {
    try {
      await this.git.clone(repoUrl, targetPath)
      return { success: true, path: targetPath }
    } catch (error) {
      console.error('Failed to clone repo:', error)
      throw error
    }
  }

  async getRepoIssues(owner: string, repo: string) {
    try {
      const { data } = await this.octokit.rest.issues.listForRepo({
        owner,
        repo,
        state: 'open'
      })
      return data
    } catch (error) {
      console.error('Failed to get issues:', error)
      throw error
    }
  }

  async createPullRequest(owner: string, repo: string, options: {
    title: string
    body: string
    head: string
    base: string
  }) {
    try {
      const { data } = await this.octokit.rest.pulls.create({
        owner,
        repo,
        ...options
      })
      return data
    } catch (error) {
      console.error('Failed to create PR:', error)
      throw error
    }
  }
}
