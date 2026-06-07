document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('runBtn');
    const btnText = runBtn.querySelector('.btn-text');
    const btnSpinner = document.getElementById('btnSpinner');
    const outputSection = document.getElementById('outputSection');
    const markdownContent = document.getElementById('markdownContent');
    const timestamp = document.getElementById('timestamp');

    runBtn.addEventListener('click', async () => {
        // UI Loading State
        runBtn.disabled = true;
        btnText.textContent = 'ANALYZING MARKET...';
        btnSpinner.classList.remove('hidden');
        outputSection.classList.add('hidden');

        try {
            const response = await fetch('/api/analyze');
            const result = await response.json();

            if (result.success) {
                // Parse markdown to HTML using Marked.js
                markdownContent.innerHTML = marked.parse(result.data);
                
                // Update timestamp
                const now = new Date();
                timestamp.textContent = now.toLocaleTimeString() + ' | ' + now.toLocaleDateString();

                // Show output
                outputSection.classList.remove('hidden');
            } else {
                markdownContent.innerHTML = `<p style="color: #ef4444;">Error: ${result.error}</p>`;
                outputSection.classList.remove('hidden');
            }
        } catch (error) {
            markdownContent.innerHTML = `<p style="color: #ef4444;">Connection failed: ${error.message}</p>`;
            outputSection.classList.remove('hidden');
        } finally {
            // Restore UI State
            runBtn.disabled = false;
            btnText.textContent = 'RE-RUN ENGINE';
            btnSpinner.classList.add('hidden');
        }
    });
});
