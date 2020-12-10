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

# Choices: chrome, firefox
USE_BROWSER = 'chrome'

driver = None

def cleanup():
    shutil.rmtree(TMP_DIR)
    # if driver is not None:
    #     driver.close()

def move(driver, direction):
    if direction == 'up':
        row, col = 1,  2
    elif direction == 'left':
        row, col = 2, 1
    elif direction == 'right':
        row, col = 2, 3
    elif direction == 'down':
        row, col = 3, 2
    elif direction == 'upleft':
        row, col = 1, 1
    elif direction == 'upright':
        row, col = 1, 3
    elif direction == 'downleft':
        row, col = 3, 1
    elif direction == 'downright':
        row, col = 3, 3

    driver.find_elements_by_css_selector('#bottom-panel .tab-selector')[0].click()
    driver.find_element_by_css_selector(f'#move-panel > div:nth-child({row}) > button:nth-child({col})').click()
    driver.find_element_by_css_selector('#btnMove').click()

def complete(driver):
    driver.find_elements_by_css_selector('#bottom-panel .tab-selector')[-1].click()
    driver.find_element_by_css_selector('#btnEndTurn').click()

def suggest(driver, room, suspect, weapon):
    driver.find_element_by_css_selector('#bottom-panel > div.selectors > div:nth-child(2)').click()
    driver.find_element_by_xpath(f'//*[@id="txtRoom"]/option[{room}]').click()
    driver.find_element_by_xpath(f'//*[@id="txtSuspect"]/option[{suspect}]').click()
    driver.find_element_by_xpath(f'//*[@id="txtWeapon"]/option[{weapon}]').click()
    driver.find_element_by_css_selector('#btnSuggest').click()


def accuse(driver, room, suspect, weapon):

    driver.find_element_by_xpath('//*[@id="bottom-panel"]/div[1]/div[3]').click()
    driver.find_element_by_xpath(f'/html/body/div[1]/div[6]/div[2]/div[4]/div[2]/select/option[{room}]').click()
    driver.find_element_by_xpath(f'/html/body/div[1]/div[6]/div[2]/div[4]/div[4]/select/option[{suspect}]').click()
    driver.find_element_by_xpath(f'/html/body/div[1]/div[6]/div[2]/div[4]/div[6]/select/option[{weapon}]').click()
    driver.find_element_by_css_selector('#btnAccuse').click()

def set_player(driver, player):
    driver.switch_to.window(driver.window_handles[player])

if __name__ == '__main__':
    if USE_BROWSER == 'firefox':
        options = webdriver.firefox.options.Options()
        options.headless = False
    else:
        options = None
    if not os.path.exists(TMP_DIR):
        os.makedirs(TMP_DIR, exist_ok=True)
    atexit.register(cleanup)
    if USE_BROWSER == "firefox":
        driver = webdriver.Firefox(service_log_path='%s/geckodriver.log' % TMP_DIR, options=options)
    else:
        driver = webdriver.Chrome(service_log_path='%s/geckodriver.log' % TMP_DIR, options=options)
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
    for i in range(6):
        driver.switch_to_window(driver.window_handles[i])
        move(driver, 'up')
        complete(driver)
    # move first to lounge
    driver.switch_to_window(driver.window_handles[0])
    move(driver, 'up')
    accuse(driver, 3, 1, 1)
    complete(driver)

    set_player(driver, 1)
    #print(driver.execute_script('gameHub.sendMessage({"message": "SuggestionResponse"})'))
    move(driver, 'right')
    suggest(driver, 1, 1, 1)
    # complete(driver)

    set_player(driver, 2)
    # Answer the suggestion

    # Continue
    # move(driver, 'down')
    # complete(driver)
    #
    # set_player(driver, 3)
    # move(driver, 'left')
    # complete(driver)
    #
    # set_player(driver, 4)
    # move(driver, 'right')
    # complete(driver)
    #
    # set_player(driver, 5)
    # move(driver, 'up')
    # complete(driver)
