export function logMessage(message) {
    // Get the current date and time
    const currentDate = new Date();
    
    // Format the date and time
    const formattedDate = currentDate.toISOString(); // You can customize the date/time format as needed
    
    // Construct the log message
    const logMessage = `${formattedDate} - ${message}`;
    
    // Log the message to the console
    console.log(logMessage);
  }