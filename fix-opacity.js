const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
};

const files = walk(path.join(__dirname, 'src'));

let changedFiles = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Increase visibility of text and remove extreme dimness
    content = content.replace(/text-white\/20/g, 'text-white/60');
    content = content.replace(/text-white\/30/g, 'text-white/70');
    content = content.replace(/text-white\/40/g, 'text-white/80');
    content = content.replace(/text-white\/50/g, 'text-white/90');
    content = content.replace(/text-white\/60/g, 'text-white/90');
    content = content.replace(/text-white\/70/g, 'text-white');
    content = content.replace(/text-white\/80/g, 'text-white');
    
    // Also fix any text-muted-foreground opacity-50 that was found
    content = content.replace(/text-muted-foreground opacity-50/g, 'text-muted-foreground opacity-90');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed', file);
        changedFiles++;
    }
});
console.log('Done fixing opacities. Changed files:', changedFiles);
