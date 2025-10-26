#add typescript to existing react project
npm install --save-dev typescript @types/react @types/react-dom

#add this to tsconfig.json; allowJs, well alows for a transition between JS to TS
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}

#extra: rename files on src/ from jsx to tsx
find src -name "*.jsx" -exec bash -c 'mv "$0" "${0%.jsx}.tsx"' {} \;
