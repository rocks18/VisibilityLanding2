/**
 * Analytics Service
 * Captures detailed device information, fetches public IP, and logs visits to the backend.
 */

export const logVisit = async () => {
    try {
        // 1. Fetch Public IP
        let ipAddress = 'Unknown'
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json')
            if (ipResponse.ok) {
                const ipData = await ipResponse.json()
                ipAddress = ipData.ip
            }
        } catch (error) {
            console.warn('Failed to fetch IP address:', error)
        }

        // 2. Session History (Internal)
        let sessionHistory = []
        try {
            const currentHistory = sessionStorage.getItem('analytics_session_history')
            sessionHistory = currentHistory ? JSON.parse(currentHistory) : []
            const currentPath = window.location.pathname

            // Avoid duplicate consecutive entries
            if (sessionHistory[sessionHistory.length - 1] !== currentPath) {
                sessionHistory.push(currentPath)
                sessionStorage.setItem('analytics_session_history', JSON.stringify(sessionHistory))
            }
        } catch (e) {
            console.warn('Session storage access failed', e)
        }

        // 3. GPU Information
        let gpuInfo = 'Unknown'
        try {
            const canvas = document.createElement('canvas')
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
                if (debugInfo) {
                    gpuInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
                }
            }
        } catch (e) {
            console.warn('WebGL access failed', e)
        }

        // 4. Battery Status
        let batteryInfo = 'Not supported'
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery()
                batteryInfo = {
                    level: battery.level * 100 + '%',
                    charging: battery.charging,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                }
            } catch (e) {
                console.warn('Battery API failed', e)
            }
        }

        // 5. Performance Metrics
        const performanceMetrics = {
            navigation: performance.getEntriesByType('navigation')[0] ? {
                loadTime: performance.getEntriesByType('navigation')[0].loadEventEnd,
                domReady: performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd
            } : 'Not available'
        }

        // 6. Collect Device & Browser Info
        const deviceInfo = {
            platform: navigator.platform,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            color_depth: window.screen.colorDepth,
            pixel_ratio: window.devicePixelRatio,
            hardware_concurrency: navigator.hardwareConcurrency || 'Unknown',
            device_memory: navigator.deviceMemory || 'Unknown',
            touch_points: navigator.maxTouchPoints,
            gpu: gpuInfo,
            battery: batteryInfo
        }

        const networkInfo = navigator.connection ? {
            effective_type: navigator.connection.effectiveType,
            rtt: navigator.connection.rtt,
            downlink: navigator.connection.downlink,
            save_data: navigator.connection.saveData
        } : 'Not available'

        // 7. Construct Custom Payload
        const payload = {
            ip_address: ipAddress,
            user_agent: navigator.userAgent,
            device: deviceInfo,
            locale: {
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            navigation: {
                current_url: window.location.href,
                referrer: document.referrer,
                history_length: window.history.length,
                session_history: sessionHistory
            },
            performance: performanceMetrics,
            network: networkInfo,
            timestamp: new Date().toISOString()
        }

        // 8. Send to Backend
        const response = await fetch('https://sgbackend.visibilitylabs.in/api/analytics/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            console.warn('Analytics logging failed (Endpoint might not exist yet):', response.status, response.statusText)
        } else {
            console.log('Visit logged successfully')
        }

    } catch (error) {
        console.error('Error in analytics service:', error)
    }
}
