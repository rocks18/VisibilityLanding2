const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    ip_address: {
        type: String,
        required: true,
        index: true
    },
    user_agent: {
        type: String,
        required: true
    },
    device: {
        platform: String,
        screen_resolution: String,
        color_depth: Number,
        pixel_ratio: Number,
        hardware_concurrency: mongoose.Schema.Types.Mixed, // Can be String 'Unknown' or Number
        device_memory: mongoose.Schema.Types.Mixed,        // Can be String 'Unknown' or Number
        touch_points: Number,
        gpu: String,
        battery: mongoose.Schema.Types.Mixed // Object or String 'Not supported'
    },
    locale: {
        language: String,
        timezone: String
    },
    navigation: {
        current_url: String,
        referrer: String,
        history_length: Number,
        session_history: [String]
    },
    performance: {
        navigation: {
            loadTime: Number,
            domReady: Number
        }
    },
    network: mongoose.Schema.Types.Mixed, // Object or String 'Not available'
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
});

module.exports = mongoose.model('AnalyticsLog', AnalyticsSchema);
