import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfig from './tsconfig.json'

const SRC_PATH = path.resolve(__dirname, 'src')

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const viteAliases: Record<string, string> = {}

  Object.entries(paths).forEach(([alias, [aliasPath]]) => {
    // Удаляем /* из конца алиаса
    const cleanAlias = alias.replace(/\/\*$/, '')
    // Удаляем /* из конца пути и добавляем baseUrl (src)
    const cleanPath = aliasPath.replace(/\/\*$/, '')
    
    // Создаем полный путь
    viteAliases[cleanAlias] = path.join(SRC_PATH, cleanPath)
  })

  return viteAliases
}

export default defineConfig({
  base: '/hw-3/',
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
  define: {
    'import.meta.env.VITE_GITHUB_TOKEN': JSON.stringify(process.env.VITE_GITHUB_TOKEN),
  },
})