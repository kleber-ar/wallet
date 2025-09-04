import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'; // Importe o plugin React se você o estiver usando para build, e não é estritamente necessário para tests mas é comum ter.

export default defineConfig({
  plugins: [react()], // Inclua o plugin React se estiver usando Vite para build. Se for apenas para testes, pode não ser essencial.
  test: {
    environment: 'jsdom', // Simula um ambiente de navegador
    setupFiles: ['./src/setupTests.ts'], // Arquivo de setup para configurar matchers globais como jest-dom
    globals: true, // Disponibiliza funções globais como describe, it, expect sem precisar importar
    coverage: {
      provider: 'v8', // O provedor de cobertura. 'v8' é o padrão e geralmente o melhor. Outras opções incluem 'istanbul'.
      reporter: ['text', 'json', 'html'], // Formatos de relatório: texto no console, JSON e HTML.
      reportsDirectory: './coverage', // Onde salvar os relatórios
      clean: true, // Limpa os relatórios anteriores antes de gerar novos
      // include: ['src/**/*.{js,ts,jsx,tsx}'], // Opcional: especifica quais arquivos incluir na cobertura. Por padrão, o Vitest tenta cobrir tudo.
      // exclude: ['src/main.tsx', 'src/vite-env.d.ts', 'src/tests/**/*'], // Opcional: exclui arquivos que você não quer que sejam cobertos.
    },
  },
});
