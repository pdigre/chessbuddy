export function renderTemplate(title: string, body: string, clientId?: string): string {
  const googleScript = clientId
    ? `<script src="https://accounts.google.com/gsi/client" async defer></script>
       <script>
         function handleCredentialResponse(response) {
           console.log("Encoded JWT ID token: " + response.credential);
           // Send the token to your backend
           fetch('/srv/login', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({ token: response.credential })
           }).then(res => {
               if (res.ok) {
                   window.location.reload();
               } else {
                   console.error("Login failed");
               }
           });
         }
         window.onload = function () {
           if (document.getElementById("buttonDiv")) {
             google.accounts.id.initialize({
               client_id: "${clientId}",
               callback: handleCredentialResponse
             });
             google.accounts.id.renderButton(
               document.getElementById("buttonDiv"),
               { theme: "outline", size: "large" }  // customization attributes
             );
             // google.accounts.id.prompt(); // also display the One Tap dialog
           }
         }
       </script>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: sans-serif; padding: 2rem; }
    </style>
    ${googleScript}
</head>
<body>
    ${body}
</body>
</html>`;
}
