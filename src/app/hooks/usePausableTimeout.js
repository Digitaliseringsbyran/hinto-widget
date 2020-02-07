import { useState, useEffect, useRef, useCallback } from 'preact/hooks'

export const usePausableTimeout = (callback, delay, running = true) => {
	const savedCallback = useRef()

	useEffect(() => {
		savedCallback.current = () => {
			callback()
		}
	}, [callback])

	const [timerState, setTimerState] = useState({
		running,
		startedAt: +new Date(),
		timeRemaining: delay,
	})

	const pause = useCallback(() => {
		const now = +new Date()
		setTimerState({
			running: false,
			startedAt: null,
			timeRemaining:
				timerState.timeRemaining - (now - timerState.startedAt),
		})
	}, [timerState])

	const run = useCallback(() => {
		const now = +new Date()
		setTimerState({
			running: true,
			startedAt: now,
			timeRemaining: timerState.timeRemaining,
		})
	}, [timerState])

	useEffect(() => {
		// console.log(timerState)
		if (!timerState.running) return
		// set the timeout
		const timeout = setTimeout(
			savedCallback.current,
			timerState.timeRemaining,
		)
		return () => {
			// clear the timeout if this effect is cleaned up
			clearTimeout(timeout)
		}
	}, [timerState])

	return [pause, run, timerState.running]
}
