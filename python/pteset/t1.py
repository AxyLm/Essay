from __future__ import print_function

import os

try:
    input = raw_input
except NameError:
    pass


def main():
    CheckDir = input("Enter the name of the directory to check : ")
    print()

    if os.path.exists(CheckDir):  # Checks if the dir exists
        print("目录已存在")
    else:
        print("No directory found for " + CheckDir)  # Output if no directory
        print()
        os.makedirs(CheckDir)  # Creates a new dir for the given name
        print("创建目录 " + CheckDir)


if __name__ == '__main__':
    main()