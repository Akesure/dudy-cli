#!/bin/sh
babel ./src --out-dir ./lib --presets es2015,stage-0,react
gulp copy-styles
