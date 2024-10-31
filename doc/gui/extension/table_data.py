from docutils.nodes import title

from example_library import ExampleLibrary
import pandas as pd


from taipy.gui import Gui

chessboard = [
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"]
]

# Create a DataFrame to represent the chessboard
data = pd.DataFrame(chessboard, index=[8, 7, 6, 5, 4, 3, 2, 1], columns=["A", "B", "C", "D", "E", "F", "G", "H"])

page = """
## Chess Game
<|{data}|example.basic_table|>
"""

if __name__ == "__main__":
    Gui(page, libraries=[ExampleLibrary()]).run(title="Chess Game")
