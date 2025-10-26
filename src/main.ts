import { Node, parseSync, Program } from 'oxc-parser';
import { visit } from './visit';
import massiveStr from '../massive.tsx?raw';

const smallStr = '<div className="bar" />';
const str = massiveStr;

function run() {
  return parseSync('test.js', str, {
    lang: 'tsx',
  });
}

// warmup
for (let i = 0; i < 3; i++) {
  const ast = run();
  countJSXElements(ast.program);
}

function time<T>(fn: () => T): [dt: number, T] {
  const st = performance.now();
  const result = fn();
  const dt = performance.now() - st;
  return [dt, result];
}

const [tParse, ast] = time(run);

// Count JSX elements
interface JSXStats {
  normalElements: number;
  selfClosingElements: number;
  textNodes: number;
  totalNodes: number;
}

function countJSXElements(program: Program): JSXStats {
  const stats: JSXStats = {
    normalElements: 0,
    selfClosingElements: 0,
    textNodes: 0,
    totalNodes: 0,
  };

  visit(program, (node) => {
    stats.totalNodes++;
    
    if (node.type === 'JSXElement') {
      // Check if it's self-closing by looking at the opening element
      if (node.openingElement.selfClosing) {
        stats.selfClosingElements++;
      } else {
        stats.normalElements++;
      }
    } else if (node.type === 'JSXText') {
      stats.textNodes++;
    }
  });

  return stats;
}

const [tWalk, jsxStats] = time(() => countJSXElements(ast.program));

function escapeTags(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


const json = JSON.stringify(ast.program, null, 2);
const output = `
Parsed in ${tParse.toFixed(2)}ms
Visited in ${tWalk.toFixed(2)}ms
Has ${jsxStats.normalElements} normal + ${jsxStats.selfClosingElements} self-closing + ${jsxStats.textNodes} text = ${jsxStats.totalNodes} total nodes
<details>
<summary>Text</summary>
${escapeTags(str)}
</details>
<details>
<summary>AST</summary>
${json}
</details>
`;

if (globalThis.window) {
  document.querySelector('#code')!.innerHTML = output;
}
