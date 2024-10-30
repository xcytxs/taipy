import random

from example_library import ExampleLibrary

from taipy.gui import Gui

data = {
    "date": [f"2000-03-{(i % 31) + 1:02d}T00:00:00.000Z" for i in range(100)],
    "volume": [random.randint(1000, 10000) for _ in range(100)],
    "price": [round(random.uniform(100, 200), 3) for _ in range(100)],
}

page = """
<|{data}|example.basic_table|rows_per_page=5|>
"""

if __name__ == "__main__":
    Gui(page, libraries=[ExampleLibrary()]).run(port=3001, use_reloader=True, title="Basic Table", debug=True)
