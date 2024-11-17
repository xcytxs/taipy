# Copyright 2021-2024 Avaiga Private Limited
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
from example_library import ExampleLibrary

from taipy.gui import Gui, Icon

languages = [
    ["Python", Icon("./python.png", "Python logo")],
    ["JavaScript", Icon("./javascript.png", "JavaScript logo")],
    ["TypeScript", Icon("./typescript.png", "TypeScript logo")],
    ["Java", Icon("./java.png", "Java logo")],
    ["C++", Icon("./cpp.png", "C++ logo")],
]

page = """
The list of programming languages is as follows:
<|{languages}|example.list_item|sort=asc|>
"""

if __name__ == "__main__":
    Gui(page, libraries=[ExampleLibrary()]).run(title="List of item")
