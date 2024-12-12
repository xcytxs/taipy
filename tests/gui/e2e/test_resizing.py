import inspect
from importlib import util

import pandas
import pytest

if util.find_spec("playwright"):
    from playwright._impl._page import Page

from taipy.gui import Gui


@pytest.mark.extension
def test_has_default_value(page: Page, gui: Gui, helpers):
    percentages = [
        (1852, 50.83),
        (1856, 45.29),
        (1860, 39.65),
        (1864, 55.03),
        (1868, 52.66),
        (1872, 55.58),
        (1876, 47.92),
        (1880, 48.31),
        (1884, 48.85),
        (1888, 47.80),
        (1892, 46.02),
        (1896.0, 51.02),
        (1900, 51.64),
        (1904, 56.42),
        (1908, 51.57),
        (1912, 41.84),
        (1916, 49.24),
        (1920, 60.32),
        (1924, 54.04),
        (1928, 58.21),
        (1932, 57.41),
        (1936, 60.80),
        (1940, 54.74),
        (1944, 53.39),
        (1948, 49.55),
        (1952, 55.18),
        (1956, 57.37),
        (1960, 49.72),
        (1964, 61.05),
        (1968, 43.42),
        (1972, 60.67),
        (1976, 50.08),
        (1980, 50.75),
        (1984, 58.77),
        (1988, 53.37),
        (1992, 43.01),
        (1996, 49.23),
        (2000, 47.87),
        (2004, 50.73),
        (2008, 52.93),
        (2012, 51.06),
        (2016, 46.09),
        (2020, 51.31),
    ]
    data = pandas.DataFrame(percentages, columns=["Year", "%"])
    page_md = """
<|{data}|chart|type=bar|x=Year|y=%|>
"""
    gui._set_frame(inspect.currentframe())
    gui.add_page(name="test", page=page_md)
    helpers.run_e2e(gui)  # Changed port number
    page.goto("./test")
    page.wait_for_timeout(3000)
    page.wait_for_selector(".plot-container")
    # Set the initial viewport size
    page.set_viewport_size({"width": 800, "height": 600})

    elements = page.locator(
        'path[style*="vector-effect: non-scaling-stroke; opacity: 1; stroke-width: 0px; fill: rgb(99, 110, 250); fill-opacity: 1;"]')
    first_element = elements.first

    # Get the bounding box before resizing
    box_before = first_element.bounding_box()

    # Perform the resize operation
    page.set_viewport_size({"width": 1920, "height": 1080})

    # Wait for any potential re-rendering or layout changes
    page.wait_for_timeout(1000)

    # Get the bounding box after resizing
    box_after = first_element.bounding_box()

    # Compare the bounding boxes
    assert box_after['width'] > box_before['width']
