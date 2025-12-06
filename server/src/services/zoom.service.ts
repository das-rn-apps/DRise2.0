// src/services/zoom.service.ts
/**
 * Minimal stub for creating meetings. In production, you should use Zoom SDK or OAuth app and call Zoom APIs.
 */
export const createZoomMeeting = async (opts: { topic: string; startAt: string | Date; durationMinutes?: number }) => {
    // If ZOOM credentials are present, create via API. For now return a fake meeting.
    return {
        id: `zoom_${Date.now()}`,
        joinUrl: `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`
    };
};
