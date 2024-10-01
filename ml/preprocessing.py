from lxml import etree
from fhirpy import SyncFHIRClient

def parse_xml(file_path):
    tree = etree.parse(file_path)
    root = tree.getroot()
    text_content = " ".join([elem.text for elem in root.iter() if elem.text])
    return text_content

def fetch_fhir_data(base_url, resource_type):
    client = SyncFHIRClient(url=base_url)
    resources = client.resources(resource_type)
    data = []
    for resource in resources:
        data.append(str(resource.serialize()))
    return " ".join(data)