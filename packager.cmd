@echo off
@IF EXIST "%~dp0\node.exe" (
	"%~dp0\node.exe" "%~dp0\packager.js" %*
) ELSE (
	node.exe "%~dp0\packager.js" %*
)