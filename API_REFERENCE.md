# 🔌 API Reference Guide

## Overview

This document describes the API endpoints for the Prompt2Mesh backend server.

**Base URL**: `http://localhost:5000`

## Authentication

The backend handles authentication with Meshy.ai API using a Bearer token stored in the `.env` file. Frontend requests do not require authentication headers.

---

## Endpoints

### 1. Health Check

Check if the API server is running.

**Endpoint**: `GET /health`

**Request**:
```http
GET /health HTTP/1.1
Host: localhost:5000
```

**Response**: 200 OK
```json
{
  "status": "ok",
  "message": "Prompt2Mesh API is running"
}
```

---

### 2. Generate 3D Model

Create a new 3D model generation task.

**Endpoint**: `POST /api/generate`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "prompt": "A futuristic robot with glowing blue eyes",
  "style": "realistic",
  "format": "glb"
}
```

**Parameters**:

| Parameter | Type   | Required | Description | Valid Values |
|-----------|--------|----------|-------------|--------------|
| prompt    | string | Yes      | Text description of the 3D model | 1-500 characters |
| style     | string | No       | Art style for the model | realistic, low-poly, stylized, sculpture, pbr |
| format    | string | No       | Output file format | glb, obj, fbx, usdz |

**Response**: 201 Created
```json
{
  "success": true,
  "taskId": "01936c36-96a1-7a19-847b-a6f2ee2ec9f6",
  "message": "Model generation started",
  "estimatedTime": "1-3 minutes"
}
```

**Error Response**: 400 Bad Request
```json
{
  "error": "Prompt is required",
  "status": 400
}
```

**Error Response**: 500 Internal Server Error
```json
{
  "error": "Failed to create 3D generation task",
  "status": 500
}
```

---

### 3. Check Task Status

Check the status of a model generation task.

**Endpoint**: `GET /api/status/:taskId`

**Request**:
```http
GET /api/status/01936c36-96a1-7a19-847b-a6f2ee2ec9f6 HTTP/1.1
Host: localhost:5000
```

**URL Parameters**:

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| taskId    | string | Yes      | The task ID returned from /generate |

**Response (Pending)**: 200 OK
```json
{
  "taskId": "01936c36-96a1-7a19-847b-a6f2ee2ec9f6",
  "status": "PENDING",
  "progress": 0,
  "message": "Your 3D model is queued for generation..."
}
```

**Response (In Progress)**: 200 OK
```json
{
  "taskId": "01936c36-96a1-7a19-847b-a6f2ee2ec9f6",
  "status": "IN_PROGRESS",
  "progress": 45,
  "message": "Creating your 3D model... This may take 1-3 minutes."
}
```

**Response (Succeeded)**: 200 OK
```json
{
  "taskId": "01936c36-96a1-7a19-847b-a6f2ee2ec9f6",
  "status": "SUCCEEDED",
  "progress": 100,
  "message": "Your 3D model is ready!",
  "modelUrl": "https://assets.meshy.ai/.../model.glb",
  "thumbnailUrl": "https://assets.meshy.ai/.../thumbnail.png",
  "videoUrl": "https://assets.meshy.ai/.../video.mp4",
  "modelUrls": {
    "glb": "https://assets.meshy.ai/.../model.glb",
    "obj": "https://assets.meshy.ai/.../model.obj",
    "fbx": "https://assets.meshy.ai/.../model.fbx"
  }
}
```

**Response (Failed)**: 200 OK
```json
{
  "taskId": "01936c36-96a1-7a19-847b-a6f2ee2ec9f6",
  "status": "FAILED",
  "progress": 0,
  "message": "Generation failed. Please try again.",
  "error": "Invalid prompt format"
}
```

**Task Status Values**:

| Status | Description |
|--------|-------------|
| PENDING | Task is queued and waiting to start |
| IN_PROGRESS | Model is being generated |
| SUCCEEDED | Model generation completed successfully |
| FAILED | Generation failed due to an error |
| EXPIRED | Task expired (typically after 24 hours) |

**Error Response**: 400 Bad Request
```json
{
  "error": "Task ID is required",
  "status": 400
}
```

**Error Response**: 404 Not Found
```json
{
  "error": "Task not found",
  "status": 404
}
```

---

### 4. Get History (Placeholder)

Get recent generation history. Currently returns empty array.

**Endpoint**: `GET /api/history`

**Request**:
```http
GET /api/history HTTP/1.1
Host: localhost:5000
```

**Response**: 200 OK
```json
{
  "history": [],
  "message": "History feature coming soon"
}
```

---

## Usage Flow

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ 1. POST /api/generate
       │    { prompt, style, format }
       ▼
┌─────────────┐
│   Backend   │ ──── Creates task with Meshy.ai
└──────┬──────┘
       │
       │ Returns: { taskId }
       ▼
┌─────────────┐
│   Client    │ ──── Stores taskId
└──────┬──────┘
       │
       │ 2. Poll every 5 seconds
       │    GET /api/status/:taskId
       ▼
┌─────────────┐
│   Backend   │ ──── Checks Meshy.ai status
└──────┬──────┘
       │
       │ Returns: { status, progress, ... }
       ▼
┌─────────────┐
│   Client    │ ──── Shows progress
└──────┬──────┘
       │
       │ 3. When status === 'SUCCEEDED'
       │    GET /api/status/:taskId
       ▼
┌─────────────┐
│   Backend   │ ──── Returns model URLs
└──────┬──────┘
       │
       │ Returns: { modelUrl, ... }
       ▼
┌─────────────┐
│   Client    │ ──── Displays 3D model
└─────────────┘
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message here",
  "status": 400
}
```

**Common HTTP Status Codes**:

| Code | Meaning | When It Occurs |
|------|---------|----------------|
| 200 | OK | Successful request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input parameters |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server or API error |

---

## Rate Limiting

Currently, no rate limiting is implemented. In production, consider:
- Rate limiting per IP address
- Rate limiting per API key
- Concurrent request limits

---

## Frontend Integration Example

```javascript
// Generate model
const response = await fetch('http://localhost:5000/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A cute robot',
    style: 'stylized',
    format: 'glb'
  })
});
const data = await response.json();
console.log('Task ID:', data.taskId);

// Poll for status
const checkStatus = async (taskId) => {
  const response = await fetch(`http://localhost:5000/api/status/${taskId}`);
  const status = await response.json();
  
  if (status.status === 'SUCCEEDED') {
    console.log('Model ready:', status.modelUrl);
    return status;
  } else if (status.status === 'FAILED') {
    throw new Error(status.error);
  } else {
    // Continue polling
    await new Promise(resolve => setTimeout(resolve, 5000));
    return checkStatus(taskId);
  }
};

await checkStatus(data.taskId);
```

---

## Testing with cURL

### Generate Model
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"A medieval sword","style":"realistic","format":"glb"}'
```

### Check Status
```bash
curl http://localhost:5000/api/status/YOUR_TASK_ID_HERE
```

### Health Check
```bash
curl http://localhost:5000/health
```

---

## Testing with PowerShell

### Generate Model
```powershell
$body = @{
    prompt = "A futuristic spaceship"
    style = "realistic"
    format = "glb"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/generate" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

### Check Status
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/status/YOUR_TASK_ID"
```

---

## Meshy.ai API Integration

The backend uses the following Meshy.ai endpoints:

- **Create Task**: `POST https://api.meshy.ai/v2/text-to-3d`
- **Check Status**: `GET https://api.meshy.ai/v2/text-to-3d/{task_id}`

For more details, see [Meshy.ai API Documentation](https://docs.meshy.ai/).

---

## Security Considerations

✅ API key stored in backend `.env` only  
✅ Never exposed to frontend/client  
✅ CORS configured for specific origins  
✅ Input validation on all endpoints  
✅ Error messages don't expose sensitive data  

⚠️ For production:
- Implement rate limiting
- Add request authentication
- Use HTTPS
- Add request logging
- Implement monitoring

---

## Support

For issues or questions:
- Check the main [README.md](README.md)
- Review [Meshy.ai Documentation](https://docs.meshy.ai/)
- Check backend console logs for errors

---

**Last Updated**: January 2026
