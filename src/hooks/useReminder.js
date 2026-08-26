import { useEffect } from 'react'

// Custom hook — checks every 30 seconds if any task is due right now
// Cleans up the interval when component unmounts or tasks change
export function useReminder(tasks) {
  useEffect(() => {
    const checkReminders = () => {
      tasks.forEach((task) => {
        if (task.isDueNow()) {
          // Play your custom sound from the public folder
          const sound = new Audio('alarm.mp3')
          sound.volume = 0.8
          sound.play()

          alert(`⏰ Reminder: "${task.title}" is due now!`)
        }
      })
    }

    checkReminders()
    const interval = setInterval(checkReminders, 30_000)

    return () => clearInterval(interval)
  }, [tasks])
}
