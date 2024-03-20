import json

# Read data from the API response file
with open("api_response.txt", "r") as file:
    api_response = json.load(file)

# Function to convert data to JSON format and write it to a file
def write_to_file(data):
    currency_data = []
    for index, (currency_code, currency_info) in enumerate(data["data"].items(), start=1):
        currency_entry = {
            "Index": index,
            "Name": currency_info['name'],
            "Code": currency_code,
            "Countries": currency_info["countries"]
        }
        currency_data.append(currency_entry)

    with open("currency_data.json", "w") as output_file:
        json.dump(currency_data, output_file, indent=2)

# Write data to the JSON file
write_to_file(api_response)
