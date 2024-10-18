const path = require('path');
const gTTS = require('gtts');
const fs = require('fs');
const pdf = require('pdf-parse');

// Function to read a PDF file and extract text
const readPDFFile = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
};


const readTextFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};

// Function to convert text to speech and save as MP3
const convertTextToSpeech = (text, outputFilePath) => {
  const gtts = new gTTS(text, 'en');
  gtts.save(outputFilePath, (err, result) => {
    if (err) {
      throw new Error(err);
    }
    console.log(`Audio saved as ${outputFilePath}`);
  });
};


// Main function to handle text and PDF files
const convertFileToAudio = async (filePath) => {
  const ext = path.extname(filePath);

  let text;
  if (ext === '.txt') {
    text = readTextFile(filePath);
  } else if (ext === '.pdf') {
    text = await readPDFFile(filePath);
  } else {
    console.log('Unsupported file type. Only .txt and .pdf files are allowed.');
    return;
  }

  const outputFilePath = filePath.replace(ext, '.mp3');
  convertTextToSpeech(text, outputFilePath);
};

// Example usage
const filePath = 'example2.txt';  // Replace with your file path (e.g., 'example.pdf')
convertFileToAudio(filePath);
