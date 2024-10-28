# LinkedIn Auto Connect Chrome Extension

## Overview

This Chrome extension automates sending LinkedIn connection requests from search results. It clicks the "Connect" button for users on the first page of search results, with a randomized delay between actions to simulate human behavior. The extension handles both the "Send without a note" and "Add a note" popups intelligently.

## Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/satishuduta/linkedin-auto-connect-extension.git
    ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** in the top right corner.
4. Click **Load unpacked** and select the folder where the extension is located.
5. The extension will now appear in your extensions list.

## Usage

1. Open LinkedIn and perform a search (e.g., "CEOs in Bangalore").
2. Click the **LinkedIn Auto Connect** extension icon in the toolbar.
3. In the popup window, click **Start Connecting** to send connection requests automatically.

## Features

- Automatically sends connection requests to users with the "Connect" button on the first page of LinkedIn search results.
- Skips users who have a "Message" button instead of "Connect."
- Handles "Send without a note" and "Add a note" popups based on user selection.
- Adds a random delay (5-10 seconds) between each connection request to mimic human behavior.
- Stops the process if the user clicks the stop button in the extension.


