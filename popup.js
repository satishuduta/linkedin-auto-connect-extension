document.getElementById('startBtn').addEventListener('click', () => {
    document.getElementById('status').textContent = 'Connecting started...';
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startConnect' });
    });
  });
  
  document.getElementById('stopBtn').addEventListener('click', () => {
    document.getElementById('status').textContent = 'Stopping connections...';
    document.getElementById('stopBtn').disabled = true;
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'stopConnect' }, () => {
        document.getElementById('status').textContent = 'Connection process stopped';
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
      });
    });
  });
  