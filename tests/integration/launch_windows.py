import atexit
import os
import platform
import shutil
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

SERVER_URL = "http://localhost:8080"
TMP_DIR = "tmp"
IS_OSX = (platform.system() == 'Darwin') # just in case we need this :)

driver = None

def cleanup():
    shutil.rmtree(TMP_DIR)
    # if driver is not None:
    #     driver.close()

if __name__ == '__main__':
    options = webdriver.firefox.options.Options()
    options.headless = False
    if not os.path.exists(TMP_DIR):
        os.makedirs(TMP_DIR, exist_ok=True)
    atexit.register(cleanup)
    driver = webdriver.Firefox(service_log_path='%s/geckodriver.log' % TMP_DIR, options=options)
    driver.get(SERVER_URL)
    # Launch 5 additional tabs
    windows_before  = driver.current_window_handle
    for _ in range(5):
        driver.execute_script("window.open('%s')" % SERVER_URL)
    WebDriverWait(driver, 10).until(EC.number_of_windows_to_be(6))
    windows_after = driver.window_handles
    # Create game on tab 0
    driver.switch_to_window(driver.window_handles[0])
    driver.find_element_by_css_selector('#btnCreateGame').click()
    game_id = driver.find_element_by_css_selector('#lblGameId').get_attribute('innerHTML')
    print('Game ID: ' + game_id)
    # Join game on the other tabs
    for i in range(1,6):
        driver.switch_to_window(driver.window_handles[i])
        driver.find_element_by_css_selector('#txtGameId').send_keys(game_id)
        driver.find_element_by_css_selector('#btnJoinGame').click()
    # Register each player
    for i in range(6):
        driver.switch_to_window(driver.window_handles[i])
        driver.find_element_by_css_selector('#character' + str(i)).click()
        driver.find_element_by_css_selector('#txtDisplayName').send_keys('player' + str(i))
        driver.find_element_by_css_selector('#btnRegister').click()
    # Go back to tab 0
    driver.switch_to_window(driver.window_handles[0])
