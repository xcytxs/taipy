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

from taipy.gui import Gui

data = [
    ["\u2656", "\u2658", "\u2657", "\u2655", "\u2654", "\u2657", "\u2658", "\u2656"],  # White Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook # noqa: E501
    ["\u2659", "\u2659", "\u2659", "\u2659", "\u2659", "\u2659", "\u2659", "\u2659"],  # White Pawns
    ["", "", "", "", "", "", "", ""],  # Empty squares
    ["", "", "", "", "", "", "", ""],  # Empty squares
    ["", "", "", "", "", "", "", ""],  # Empty squares
    ["", "", "", "", "", "", "", ""],  # Empty squares
    ["\u265F", "\u265F", "\u265F", "\u265F", "\u265F", "\u265F", "\u265F", "\u265F"],  # Black Pawns
    ["\u265C", "\u265E", "\u265D", "\u265B", "\u265A", "\u265D", "\u265E", "\u265C"]   # Black Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook # noqa: E501
]

page = """
## Chess Game
<|{data}|example.game_table|>
"""

page = """
## Chess Game
<|{data}|example.game_table|>
"""

if __name__ == "__main__":
    Gui(page, libraries=[ExampleLibrary()]).run(title="Chess Game", port=3002, use_reloader=True)
