from example_library import ExampleLibrary
from faker import Faker

from taipy.gui import Gui

fake = Faker()

data = {
    "Employee ID": list(range(101, 201)),
    "Name": [fake.name() for _ in range(100)],
    "Department": [
        fake.random_element(
            elements=("Human Resources", "Engineering", "Marketing", "Sales", "Customer Support")
        )
        for _ in range(100)
    ],
    "Role": [
        fake.random_element(
            elements=("HR Manager", "Software Engineer", "Marketing Director", "Sales Executive", "Support Specialist")
        )
        for _ in range(100)
    ],
    "Location": [fake.city() for _ in range(100)]
}

page = """
## Employee Directory
<|{data}|example.basic_table|>
"""

if __name__ == "__main__":
    Gui(page, libraries=[ExampleLibrary()]).run(port=3001, use_reloader=True, title="Basic Table", debug=True)
