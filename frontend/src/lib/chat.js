export const getResponse = async (message) => {
        console.log(message);
        const response = await fetch('https://func-chat.onrender.com/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: message,
            model:  "mistral-large-latest",
            api_key: "M8WSWXdvBx41jtTIgHCOe0Fbpj5ygjgi" }),
    });
    
    const data = await response.json();
    
    if (!response.ok || data.response?.includes('Error processing query') || data.response?.includes('Status 429')) {
        throw new Error('Service temporarily unavailable');
    }
    
    return data;
};
