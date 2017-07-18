const marked = require('marked');
const { remote } = require('electron');
const mainProcess = remote.require('./main');
const { getFileFromUserSelection } = remote.require('./main');
debugger;
console.log(mainProcess);
console.log(getFileFromUserSelection);
debugger;

const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');

const renderMarkdownToHtml = markdown => {
  htmlView.innerHTML = marked(markdown, { sanitize: true });
};

markdownView.addEventListener('keyup', event => {
  renderMarkdownToHtml(event.target.value);
});

openFileButton.addEventListener('click', event => {
  // alert('ONe day I will open a file');
  // mainProcess.getFileFromUserSelection();
  getFileFromUserSelection();
});