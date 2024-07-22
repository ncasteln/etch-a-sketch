#!/bin/bash

RESET="\033[0m"
F_RED="\033[31m"
F_GREEN="\033[32m"
F_YELLOW="\033[33m"
F_BLUE="\033[34m"

NAME=$1

echo -e "${F_BLUE}************** [ Creating .env file for '$NAME' ] **************${RESET}";
echo -e "Define the variables in a key=value form (no spaces allowed).";

# chec .env existing file
if [[ -e ".env" ]]; then
	echo -e "${F_RED}Error:${RESET} file .env already exists";
	exit 1;
fi

echo "NAME=$NAME" > .env;

# read user prompt to store variables
while true; do
	VARIABLE=""
	read -rp "* New variable (type 'exit' if you're done): " VARIABLE;
	if [[ -z "$VARIABLE" ]]; then
		continue
	fi
	if [[ $VARIABLE == "exit" ]]; then
		break
	fi
	if [[ $VARIABLE =~ " " ]]; then
		echo -e "${F_RED}Error:${RESET} no spaces allowed"
	else
		if [[ $VARIABLE != *=* ]]; then
			echo -e "${F_RED}Error:${RESET} respect format key=value pair"
		else
			echo -e "${F_GREEN}Success:${RESET} variable stored"
			echo "$VARIABLE" >> .env;
		fi
	fi
done
