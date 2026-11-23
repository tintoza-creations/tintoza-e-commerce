const fs = require('fs');
const targetFile = 'node_modules/next/dist/build/swc/index.js';

if (!fs.existsSync(targetFile)) {
  console.log('Target file not found');
  process.exit(0);
}

let code = fs.readFileSync(targetFile, 'utf8');

const helper = `
function loadWasmSyncFallback() {
    if (wasmBindings) return wasmBindings;
    try {
        const bindings = require('@next/swc-wasm-nodejs');
        wasmBindings = {
            isWasm: true,
            transform(src, options) {
                return (bindings && bindings.transform) ? bindings.transform(src.toString(), options) : Promise.resolve(bindings.transformSync(src.toString(), options));
            },
            transformSync(src, options) {
                return bindings.transformSync(src.toString(), options);
            },
            minify(src, options) {
                return (bindings && bindings.minify) ? bindings.minify(src.toString(), options) : Promise.resolve(bindings.minifySync(src.toString(), options));
            },
            minifySync(src, options) {
                return bindings.minifySync(src.toString(), options);
            },
            parse(src, options) {
                return (bindings && bindings.parse) ? bindings.parse(src.toString(), options) : Promise.resolve(bindings.parseSync(src.toString(), options));
            },
            parseSync(src, options) {
                return bindings.parseSync(src.toString(), options);
            },
            getTargetTriple() {
                return undefined;
            },
            turbo: {
                startTrace: () => {},
                entrypoints: { stream: () => {} }
            }
        };
        return wasmBindings;
    } catch (e) {
        return null;
    }
}
`;

if (!code.includes('loadWasmSyncFallback')) {
  code = helper + code;
  code = code.replace('function loadBindingsSync() {', 'function loadBindingsSync() { const wasm = loadWasmSyncFallback(); if (wasm) return wasm;');
  code = code.replace('pendingBindings = new Promise(async (resolve, _reject)=>{', 'pendingBindings = new Promise(async (resolve, _reject)=>{ const wasm = loadWasmSyncFallback(); if (wasm) return resolve(wasm);');
  fs.writeFileSync(targetFile, code, 'utf8');
  console.log('Next.js SWC loader successfully patched to use @next/swc-wasm-nodejs!');
} else {
  console.log('Already patched.');
}
