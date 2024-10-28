let isConnecting = false; // Control flag to stop the process

function getRandomDelay(min, max) {
  return Math.random() * (max - min) + min;
}

function clickButtonWithDelay(button, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isConnecting) {
        button.click();
      }
      resolve();
    }, delay);
  });
}

async function connectToLinkedIn() {
  const processPage = async () => {
    const buttons = document.querySelectorAll('button');
    let connectButtons = [];

    // Filter buttons that have "Connect" but skip "Withdraw invitation"
    buttons.forEach((button) => {
      if (button.innerText.includes('Connect') && !button.innerText.includes('Withdraw')) {
        connectButtons.push(button);
      }
    });

    console.log(`Found ${connectButtons.length} valid connect buttons`);

    for (let i = 0; i < connectButtons.length; i++) {
      if (!isConnecting) {
        console.log('Process stopped by user.');
        break;
      }

      const btn = connectButtons[i];

      // Click the "Connect" button with a random delay
      await clickButtonWithDelay(btn, getRandomDelay(5000, 10000));

      console.log(`Clicked Connect for person ${i + 1}`);

      // Wait for the popup
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Adjust delay if necessary

      // Handle the "Send without a note" or "Add a note" popup
      const sendWithoutNoteButton = document.querySelector('button[aria-label="Send without a note"]');
      const addNoteButton = document.querySelector('button[aria-label="Add a note"]');

      if (sendWithoutNoteButton) {
        console.log(`Found "Send without a note" button for person ${i + 1}`);
        await clickButtonWithDelay(sendWithoutNoteButton, 1000);
      } else if (addNoteButton) {
        console.log(`Popup found, but no "Send without a note" option for person ${i + 1}, skipping.`);
        await clickButtonWithDelay(addNoteButton, 1000); // Optionally click "Add a note"
      } else {
        console.log(`No popup found for person ${i + 1}, skipping.`);
      }

      // Extra delay to mimic human behavior and avoid LinkedIn restrictions
      await new Promise((resolve) => setTimeout(resolve, getRandomDelay(5000, 10000)));
    }
  };

  // Process only the visible profiles on the first page
  console.log("Processing visible users on the page");
  await processPage();

  console.log("Finished processing all connect buttons on the first page");
}

// Listener for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startConnect") {
    isConnecting = true;
    connectToLinkedIn().then(() => {
      sendResponse({ status: "Finished connecting" });
    });
    return true; // Keep the message channel open for async responses
  } else if (request.action === "stopConnect") {
    isConnecting = false;
    console.log("Stopping connection process.");
    sendResponse({ status: "Stopped" });
  }
});
