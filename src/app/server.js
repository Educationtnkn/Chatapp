// $(document).ready(function() {
//   $('#btnsend').click(function() {
//     const textToWrite = $('#allmessage').val();

//     // Make a POST request to the server to write text to the file
//     $.ajax({
//       type: 'POST',
//       url: 'http://localhost:4200/assets/chat.json', // Replace with the actual server-side script
//       data: { text: textToWrite },
//       success: function(response) {
//         console.log('Message saved successfully:', response);
//       },
//       error: function(error) {
//         console.error('Error saving message:', error);
//       }
//     });
//   });
// });
console.log('The "data to append"'); 

const fs = require('fs'); 
 
fs.appendFile('file.txt', 'Data to append', function (err) { 
  if (err) throw err; 
  console.log('The "data to append" was appended to file!'); 
}); 