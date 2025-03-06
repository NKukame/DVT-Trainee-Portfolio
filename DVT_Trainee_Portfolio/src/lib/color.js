export const generatePastelColor = (name) => {
    if(name !== undefined){
        const hash = name.split('').reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc * 100) - acc);
        }, 0);
        
        // Use the hash to generate a consistent hue (0-360)
        const hue = Math.abs(hash % 360);
        
        // Use fixed saturation and lightness for pastel effect
        return `hsl(${hue}, 100%, 50%)`;

    }
    return "gray"
};