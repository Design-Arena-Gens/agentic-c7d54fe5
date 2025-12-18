'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [command, setCommand] = useState('')
  const [logs, setLogs] = useState<Array<{type: string, message: string, timestamp: string}>>([])
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState<Array<{id: string, name: string, status: string, progress: number}>>([])
  const [githubConnected, setGithubConnected] = useState(false)
  const [systemStatus, setSystemStatus] = useState({
    active: true,
    tasksCompleted: 0,
    uptime: '0h 0m'
  })

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const hours = Math.floor(elapsed / 3600000)
      const minutes = Math.floor((elapsed % 3600000) / 60000)
      setSystemStatus(prev => ({...prev, uptime: `${hours}h ${minutes}m`}))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const addLog = (type: string, message: string) => {
    setLogs(prev => [...prev, {
      type,
      message,
      timestamp: new Date().toLocaleTimeString('tr-TR')
    }])
  }

  const executeCommand = async () => {
    if (!command.trim()) return

    setLoading(true)
    addLog('command', `> ${command}`)

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      })

      const data = await response.json()

      if (data.success) {
        addLog('success', data.message)
        if (data.taskId) {
          setTasks(prev => [...prev, {
            id: data.taskId,
            name: command,
            status: 'running',
            progress: 0
          }])
        }
        setSystemStatus(prev => ({...prev, tasksCompleted: prev.tasksCompleted + 1}))
      } else {
        addLog('error', data.message)
      }
    } catch (error) {
      addLog('error', 'Komut çalıştırılamadı: ' + (error as Error).message)
    }

    setCommand('')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Clone Assistant
          </h1>
          <p className="text-gray-300">Dijital İkiziniz - Tüm İşlerinizi Yöneten Yapay Zeka</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Sistem Durumu</p>
                <p className={`text-2xl font-bold ${systemStatus.active ? 'text-green-400' : 'text-red-400'}`}>
                  {systemStatus.active ? 'Aktif' : 'Pasif'}
                </p>
              </div>
              <div className={`w-4 h-4 rounded-full ${systemStatus.active ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Tamamlanan Görevler</p>
            <p className="text-2xl font-bold text-blue-400">{systemStatus.tasksCompleted}</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Çalışma Süresi</p>
            <p className="text-2xl font-bold text-purple-400">{systemStatus.uptime}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Komut Merkezi</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
                  placeholder="Komut girin (örn: GitHub repolarımı listele, yeni proje oluştur...)"
                  className="flex-1 bg-gray-700 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={loading}
                />
                <button
                  onClick={executeCommand}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all"
                >
                  {loading ? '⏳' : '▶'}
                </button>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setCommand('GitHub repolarımı listele')}
                  className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-left text-sm transition-all"
                >
                  📁 GitHub Repolarını Listele
                </button>
                <button
                  onClick={() => setCommand('Yeni Next.js projesi oluştur ve deploy et')}
                  className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-left text-sm transition-all"
                >
                  🚀 Yeni Proje Oluştur & Deploy
                </button>
                <button
                  onClick={() => setCommand('Sosyal medya hesaplarımı kontrol et')}
                  className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-left text-sm transition-all"
                >
                  📱 Sosyal Medya Yönetimi
                </button>
                <button
                  onClick={() => setCommand('Freelance platformlarında yeni işleri kontrol et')}
                  className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-left text-sm transition-all"
                >
                  💼 Freelance İş Ara
                </button>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Aktif Görevler</h2>
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <p className="text-gray-400 text-sm">Henüz aktif görev yok</p>
                ) : (
                  tasks.map(task => (
                    <div key={task.id} className="bg-gray-700/50 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{task.name}</span>
                        <span className="text-xs text-gray-400">{task.status}</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Sistem Logları</h2>
            <div className="bg-black/30 rounded p-4 h-[600px] overflow-y-auto font-mono text-sm space-y-2">
              {logs.length === 0 ? (
                <p className="text-gray-500">Sistem hazır...</p>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-500">{log.timestamp}</span>
                    <span className={
                      log.type === 'error' ? 'text-red-400' :
                      log.type === 'success' ? 'text-green-400' :
                      log.type === 'command' ? 'text-blue-400' :
                      'text-gray-300'
                    }>
                      {log.message}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Yetenekler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">🐙</div>
              <div className="font-semibold">GitHub Yönetimi</div>
              <div className="text-xs text-gray-400 mt-1">Repo oluşturma, commit, push</div>
            </div>
            <div className="bg-gray-700/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <div className="font-semibold">Otomatik Deploy</div>
              <div className="text-xs text-gray-400 mt-1">Vercel, Netlify, AWS</div>
            </div>
            <div className="bg-gray-700/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">💼</div>
              <div className="font-semibold">Freelance İş</div>
              <div className="text-xs text-gray-400 mt-1">İş arama, teklif verme</div>
            </div>
            <div className="bg-gray-700/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">📱</div>
              <div className="font-semibold">Sosyal Medya</div>
              <div className="text-xs text-gray-400 mt-1">Post, takip, mesajlaşma</div>
            </div>
            <div className="bg-gray-700/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">🌐</div>
              <div className="font-semibold">Web Tarama</div>
              <div className="text-xs text-gray-400 mt-1">Veri toplama, analiz</div>
            </div>
            <div className="bg-gray-700/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">💻</div>
              <div className="font-semibold">Kod Yazma</div>
              <div className="text-xs text-gray-400 mt-1">Otomatik geliştirme</div>
            </div>
            <div className="bg-gray-700/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-semibold">Proje Takip</div>
              <div className="text-xs text-gray-400 mt-1">İzleme, raporlama</div>
            </div>
            <div className="bg-gray-700/50 rounded p-4 text-center">
              <div className="text-3xl mb-2">🤖</div>
              <div className="font-semibold">AI Güç</div>
              <div className="text-xs text-gray-400 mt-1">GPT-4 & Claude</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
