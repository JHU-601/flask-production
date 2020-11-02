def run_mypy():
    from mypy import api

    print('Running mypy')
    result = api.run(["clueless"])

    if result[0]:
        print('\nType checking report:\n')
        print(result[0])  # stdout

    if result[1]:
        print('\nError report:\n')
        print(result[1])  # stderr

    if result[2] != 0:
        print(f'mypy failed with status {result[2]}')
        return True
    else:
        return False

def run_pylint():
    from pylint import epylint as lint

    print('Running pylint')
    lint.py_run('clueless')


def run_pylint():
    import pytest

    print("Running pytest")
    pytest_res = pytest.main(['tests/server'])

    if pytest_res != 0:
        print(f'pytest failed with status {pytest_res}')
        return True
    else:
        return False


def parse_args():
    import sys
    args = sys.argv[1:]
    if not args:
        return True, True, True
    return 'mypy' in args, 'pylint' in args, 'pytest' in args

def main():
    import sys
    mypy, pylint, pytest = parse_args()

    failed = False

    if mypy:
        failed = run_mypy()

    if pylint:
        run_pylint()

    if pytest:
        res = run_pylint()
        failed = failed or res

    if failed:
        import sys
        sys.exit(1)


if __name__ == "__main__":
    main()
