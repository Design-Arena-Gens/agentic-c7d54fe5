import { NextResponse } from 'next/server'
import { Octokit } from 'octokit'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const token = process.env.GITHUB_TOKEN

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'GitHub token yapılandırılmamış' },
        { status: 401 }
      )
    }

    const octokit = new Octokit({ auth: token })

    if (action === 'list-repos') {
      const { data } = await octokit.rest.repos.listForAuthenticatedUser({
        sort: 'updated',
        per_page: 10
      })

      return NextResponse.json({
        success: true,
        repos: data.map(repo => ({
          name: repo.name,
          url: repo.html_url,
          private: repo.private,
          updated: repo.updated_at
        }))
      })
    }

    return NextResponse.json(
      { success: false, message: 'Geçersiz aksiyon' },
      { status: 400 }
    )
  } catch (error) {
    console.error('GitHub error:', error)
    return NextResponse.json(
      { success: false, message: 'GitHub işlemi başarısız' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { action, repoName, description, isPrivate } = await request.json()
    const token = process.env.GITHUB_TOKEN

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'GitHub token yapılandırılmamış' },
        { status: 401 }
      )
    }

    const octokit = new Octokit({ auth: token })

    if (action === 'create-repo') {
      const { data } = await octokit.rest.repos.createForAuthenticatedUser({
        name: repoName,
        description: description || '',
        private: isPrivate || false,
        auto_init: true
      })

      return NextResponse.json({
        success: true,
        message: 'Repo başarıyla oluşturuldu',
        repo: {
          name: data.name,
          url: data.html_url,
          clone_url: data.clone_url
        }
      })
    }

    return NextResponse.json(
      { success: false, message: 'Geçersiz aksiyon' },
      { status: 400 }
    )
  } catch (error) {
    console.error('GitHub error:', error)
    return NextResponse.json(
      { success: false, message: 'GitHub işlemi başarısız' },
      { status: 500 }
    )
  }
}
