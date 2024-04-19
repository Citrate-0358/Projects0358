## Objective
The primary objective of this project is to create a tool capable of identifying XSS vulnerabilities in web forms. This involves scanning a given web page for HTML forms, submitting a malicious payload to each form, and analyzing the response to determine if the payload is reflected. The tool aims to provide insights into potential security weaknesses in web applications.

## Working
The tool follows a systematic process for XSS vulnerability detection:

1. **Form Identification**: The tool retrieves the HTML content of a specified web page and identifies all HTML forms using BeautifulSoup.
2. **Form Details Extraction**: For each form found, the tool extracts relevant details such as the form action (target URL), form method (POST or GET), and details about each input field (type and name).
3. **Payload Submission**: The tool constructs a malicious payload and submits it to each form, replacing text and search input values with the payload taken from the file `payloads.txt`.
4. **Response Analysis**: The tool analyzes the HTTP response for the presence of the payload. If the payload is reflected in the response content, it indicates a potential XSS vulnerability.

## Tool Testing
The tool has been tested successfully on the following URLs:
- [https://xss-game.appspot.com/level1/frame](https://xss-game.appspot.com/level1/frame)
- [http://testphp.vulnweb.com/](http://testphp.vulnweb.com/)

These web pages are specifically designed for testing XSS vulnerabilities and serve as an appropriate environment to validate the tool's effectiveness. The testing process involved scanning the page, submitting a crafted payload, and verifying the detection of XSS vulnerabilities. Additionally, validation was performed using Burp Suite Pro with the valid sentinel extension and manual crafting to further validate the results.
