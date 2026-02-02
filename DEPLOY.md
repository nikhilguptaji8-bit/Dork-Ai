# Deployment Guide for Render

This project is a static React application built with Vite. Follow these steps to deploy it on Render.

## Prerequisites

1.  **Push your code to GitHub/GitLab/Bitbucket**: Ensure this project is in a repository.
2.  **Render Account**: Create an account at [render.com](https://render.com).

## Deployment Steps

1.  **New Static Site**:
    *   Go to your Render Dashboard.
    *   Click **New +** and select **Static Site**.
    *   Connect your repository.

2.  **Configuration**:
    *   **Name**: `dork-ai` (or your preferred name).
    *   **Branch**: `main` (or `master`).
    *   **Root Directory**: Leave blank (unless you put the project in a subdirectory).
    *   **Build Command**: `npm install && npm run build`
    *   **Publish Directory**: `dist`

3.  **Environment Variables**:
    *   Scroll down to the **Environment Variables** section.
    *   Add the following key:
        *   **Key**: `VITE_GEMINI_API_KEY`
        *   **Value**: `your_real_gemini_api_key_here` (Copy this from your local `.env.local` file).

4.  **Deploy**:
    *   Click **Create Static Site**.

## Troubleshooting

*   **API Issues**: If the app loads but searches fail, double-check that you added the `VITE_GEMINI_API_KEY` correctly in the Render settings.
*   **Build Failures**: Check the logs. Ensure `npm install` runs successfully.
