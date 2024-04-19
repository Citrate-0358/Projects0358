import sys
import requests
from pprint import pprint
from bs4 import BeautifulSoup as bs
from urllib.parse import urljoin

def get_all_forms(url):
    soup = bs(requests.get(url).content, "html.parser")
    return soup.find_all("form")

def get_form_details(form):
    details = {}
    action = form.attrs.get("action", "").lower()
    method = form.attrs.get("method", "get").lower()
    inputs = []
    for input_tag in form.find_all("input"):
        input_type = input_tag.attrs.get("type", "text")
        input_name = input_tag.attrs.get("name")
        inputs.append({"type": input_type, "name": input_name})
    details["action"] = action
    details["method"] = method
    details["inputs"] = inputs
    return details

def submit_form(form_details, url, payload):
    target_url = urljoin(url, form_details["action"])
    inputs = form_details["inputs"]
    data = {}
    for input in inputs:
        if input["type"] == "text" or input["type"] == "search":
            data[input["name"]] = payload
        else:
            input_name = input.get("name")
            input_value = input.get("value")
            if input_name and input_value:
                data[input_name] = input_value

    print(f"[+] Submitting payload to {target_url}")
    print(f"[+] Data: {data}")
    if form_details["method"] == "post":
        return requests.post(target_url, data=data)
    else:
        return requests.get(target_url, params=data)

def read_payloads_from_file(file_path):
    with open(file_path, "r") as file:
        payloads = [line.strip() for line in file.readlines()]
    return payloads

def find_xss_vulnerability(forms, payloads, url):
    is_vulnerable = False
    for form in forms:
        form_details = get_form_details(form)
        for payload in payloads:
            content = submit_form(form_details, url, payload).content.decode()
            if payload in content:
                print(f"[+] XSS Detected on {url}")
                print(f"[*] Payload: {payload}")
                print(f"[*] Form details:")
                pprint(form_details)
                is_vulnerable = True  # XSS vulnerability found
                break
        # If vulnerability is found, break out of the outer loop
        if is_vulnerable:
            break
    return is_vulnerable

def scan_xss(url, payloads_file):
    forms = get_all_forms(url)
    print(f"[+] Detected {len(forms)} forms on {url}.")

    payloads = read_payloads_from_file(payloads_file)

    is_vulnerable = find_xss_vulnerability(forms, payloads, url)

    if not is_vulnerable:
        print("False")

    return is_vulnerable

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <url>")
        sys.exit(1)

    url = sys.argv[1]

    # File containing payloads, one payload per line
    payloads_file = "payloads.txt"

    is_vulnerable = scan_xss(url, payloads_file)

    # Print the final result (True/False)
    print(is_vulnerable)
