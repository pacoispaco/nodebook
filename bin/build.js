'use strict'

const {join} = require('path');
const processor = require('asciidoctor.js')();
const runnerExtension = require('asciidoctor-extension-interactive-runner');
const BUILD_DIR = 'dist';

var DEFAULT_ATTRIBUTES = [
  'toc=macro',
  'toclevels=4',
  'icons=font',
  'lang=fr',
  'env=ci',
  'hide-uri-scheme',
  'experimental'
];

const FILES = process.argv.slice(2);

processor.Extensions.register(runnerExtension);

FILES.forEach(SOURCE_FILE => {
  const destinationFile = SOURCE_FILE.replace('.adoc', '.html');
  console.log(`${SOURCE_FILE} -> ${destinationFile}`);

  processor.convertFile(join(__dirname, '..', SOURCE_FILE), {
    'to_file': `${BUILD_DIR}/${destinationFile}`,
    'mkdirs': true,
    'safe': 'unsafe',
    'backend': 'html5',
    'doctype': 'book',
    'attributes': DEFAULT_ATTRIBUTES
  });
});
