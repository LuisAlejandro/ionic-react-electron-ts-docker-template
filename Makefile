#!/usr/bin/env make -f
# -*- makefile -*-

# SHELL = bash -e
BASEDIR := ${CURDIR}


image:
	docker-compose -p ionic-app -f docker-compose.yml build --force-rm --pull

start:
	docker-compose -p ionic-app -f docker-compose.yml up --remove-orphans -d

dependencies: start
	docker-compose -p ionic-app -f docker-compose.yml exec \
		--user ionic ionic-app yarn install

serve: start
	docker-compose -p ionic-app -f docker-compose.yml exec \
		--user ionic ionic-app bash -c "yarn serve | cat"

serve-local-api: start
	docker-compose -p ionic-app -f docker-compose.yml exec \
		--user ionic ionic-app bash -c "yarn serve-local-api | cat"

launch-windows-app:
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "yarn install ; yarn run build ; yarn run copy"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "cd electron ; yarn install"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "npx cap sync @capacitor-community/electron"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "npx cap sync @capacitor-community/electron"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "cd electron ; yarn run electron:start"

build-windows-installer:
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "yarn install ; yarn run build ; yarn run copy"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "cd electron ; yarn install"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "npx cap sync @capacitor-community/electron"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "npx cap sync @capacitor-community/electron"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "cd electron ; yarn run electron:build-windows"

prepare-apk:
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "yarn install ; yarn run build ; yarn run copy"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "cd electron ; yarn install"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "npx cap sync"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "npx cap sync"
	C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe \
		-ExecutionPolicy Bypass \
		-Command "cd electron ; yarn run electron:build-windows"

launch-mac-app:
	rm -rf node_modules
	rm -rf electron/node_modules
	yarn install && yarn run build && yarn run copy
	cd electron && yarn install
	npx cap sync @capacitor-community/electron || echo ""
	npx cap sync @capacitor-community/electron || echo ""
	cd electron && yarn run electron:start

build-mac-installer:
	rm -rf node_modules
	rm -rf electron/node_modules
	yarn install && yarn run build && yarn run copy
	cd electron && yarn install
	npx cap sync @capacitor-community/electron || echo ""
	npx cap sync @capacitor-community/electron || echo ""
	cd electron && yarn run electron:build-mac

launch-linux-app:
	rm -rf node_modules
	rm -rf electron/node_modules
	yarn install && yarn run build && yarn run copy
	cd electron && yarn install
	npx cap sync @capacitor-community/electron || echo ""
	npx cap sync @capacitor-community/electron || echo ""
	cd electron && yarn run electron:start

build-linux-installer:
	rm -rf node_modules
	rm -rf electron/node_modules
	yarn install && yarn run build && yarn run copy
	cd electron && yarn install
	npx cap sync @capacitor-community/electron || echo ""
	npx cap sync @capacitor-community/electron || echo ""
	cd electron && yarn run electron:build-linux

console: start
	docker-compose -p ionic-app -f docker-compose.yml exec \
		--user ionic ionic-app bash

stop:
	docker-compose -p ionic-app -f docker-compose.yml stop ionic-app

down:
	docker-compose -p ionic-app -f docker-compose.yml down \
		--remove-orphans

destroy:
	docker-compose -p ionic-app -f docker-compose.yml down \
		--rmi all --remove-orphans -v
