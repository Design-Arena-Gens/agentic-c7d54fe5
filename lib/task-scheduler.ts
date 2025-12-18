import cron from 'node-cron'

export class TaskScheduler {
  private tasks: Map<string, cron.ScheduledTask> = new Map()

  scheduleTask(
    name: string,
    cronExpression: string,
    callback: () => void | Promise<void>
  ): void {
    if (this.tasks.has(name)) {
      this.cancelTask(name)
    }

    const task = cron.schedule(cronExpression, async () => {
      console.log(`Executing scheduled task: ${name}`)
      try {
        await callback()
      } catch (error) {
        console.error(`Task ${name} failed:`, error)
      }
    })

    this.tasks.set(name, task)
    console.log(`Task scheduled: ${name} with cron: ${cronExpression}`)
  }

  cancelTask(name: string): boolean {
    const task = this.tasks.get(name)
    if (task) {
      task.stop()
      this.tasks.delete(name)
      console.log(`Task cancelled: ${name}`)
      return true
    }
    return false
  }

  listTasks(): string[] {
    return Array.from(this.tasks.keys())
  }

  // Önceden tanımlı görevler
  setupDefaultTasks(): void {
    // Her saat GitHub kontrolü
    this.scheduleTask('github-check', '0 * * * *', async () => {
      console.log('Checking GitHub repositories...')
      // GitHub kontrolü yapılacak
    })

    // Her 30 dakikada freelance iş kontrolü
    this.scheduleTask('freelance-check', '*/30 * * * *', async () => {
      console.log('Checking for new freelance jobs...')
      // Freelance platformları kontrol edilecek
    })

    // Her 2 saatte sosyal medya kontrolü
    this.scheduleTask('social-media-check', '0 */2 * * *', async () => {
      console.log('Checking social media accounts...')
      // Sosyal medya kontrolü yapılacak
    })

    // Her gece saat 2'de backup
    this.scheduleTask('nightly-backup', '0 2 * * *', async () => {
      console.log('Running nightly backup...')
      // Backup işlemi yapılacak
    })
  }
}

export const scheduler = new TaskScheduler()
