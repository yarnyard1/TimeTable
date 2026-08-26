import { useEffect } from 'react'

export function useReminder(tasks) {
  useEffect(() => {
    const checkReminders = () => {
      tasks.forEach((task) => {
        if (task.isDueNow()) {
          alert(`⏰ Reminder: "${task.title}" is due now!`)
        }
      })
    }

    checkReminders()
    const interval = setInterval(checkReminders, 30_000)

    return () => clearInterval(interval)
  }, [tasks])
}
