# Webhook Listener

## Prerequisites
1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
2. Install `npm` (Node Package Manager) if not already included with Node.js.
3. Obtain a GitHub webhook secret. This secret will be used to validate incoming webhook requests.

## Description
This webhook listener is designed to get notified on each push to the `main` branch. Upon receiving a notification, it executes a build script and provides the release APK at the following URL:
```
http://localhost:3000/release/
```

## Webhook Configuration
- **Webhook URL**: `http://localhost:3000/webhook`
- **Content Type**: Ensure the webhook request is sent as `application/json`.
- **Secret**: Use the same GitHub webhook secret configured in the environment variable `GITHUB_WEBHOOK_SECRET`.

## Steps to Run
1. Install the required dependencies:
    ```bash
    npm install
    ```

2. Set the GitHub webhook secret as an environment variable:
    ```bash
    export GITHUB_WEBHOOK_SECRET=your_secret_here
    ```

3. Start the webhook listener:
    ```bash
    npm start
    ```

4. The webhook listener should now be running. By default, it listens on port `3000`. You can access it at:
    ```
    http://localhost:3000
    ```