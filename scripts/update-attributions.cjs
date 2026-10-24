const fs = require('fs');
const path = require('path');

const solutionsDir = path.join(process.cwd(), 'public', 'solutions');
const dirs = fs.readdirSync(solutionsDir, { withFileTypes: true }).filter(d => d.isDirectory());

for (const d of dirs) {
  const file = path.join(solutionsDir, d.name, 'index.html');
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  const attrRegex = /(<(?:footer|div|p)[^>]*class="[^"]*attribution[^"]*"[^>]*>)([\s\S]*?)(<\/(?:footer|div|p)>)/i;
  const match = content.match(attrRegex);

  if (match) {
    let inner = match[2];
    inner = inner.replace(/[\s|·\uFFFD]*<a\s+href="\.\.\/\.\.\/"[^>]*>Back to Gallery<\/a>\.?/gi, '');
    inner = inner.replace(/(?:>\s*)?Tumelo\s+Lutaka[\s\r\n]*<\/a[\s\r\n]*>[\s\r\n]*\.?/gi, '>Tumelo Lutaka</a> | <a href="../../">Back to Gallery</a>.');
    
    content = content.replace(attrRegex, `${match[1]}\n      ${inner.trim()}\n    ${match[3]}`);
  } else {
    const footer = `\n    <footer class="attribution" style="font-size: 11px; text-align: center; padding: 1.5rem 0.5rem; opacity: 0.8;">\n      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" style="color: inherit; text-decoration: underline;">Frontend Mentor</a>. Coded by <a href="https://github.com/TumeloLutaka" style="color: inherit; text-decoration: underline;">Tumelo Lutaka</a> | <a href="../../" style="color: inherit; text-decoration: underline;">Back to Gallery</a>.\n    </footer>\n  </body>`;
    content = content.replace(/\s*<\/body>/i, footer);
  }

  fs.writeFileSync(file, content, 'utf8');
}
console.log('Finished updating attributions.');
