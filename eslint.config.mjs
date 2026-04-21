// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],

      // NestJS uchun muhim qo'shimchalar
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-call': 'off', // AuthGuard('jwt') va @IsString() xatolarini o'chiradi
      '@typescript-eslint/no-unsafe-member-access': 'off', // Obyekt ichidagi xususiyatlarga xavfsiz kirish xatosini o'chiradi
      '@typescript-eslint/no-unsafe-assignment': 'off', // Noma'lum turdagi qiymatni o'zlashtirish xatosini o'chiradi
      '@typescript-eslint/no-unsafe-argument': 'off', // @UseGuards() ichidagi xatoni o'chiradi
      '@typescript-eslint/unbound-method': 'off',
    },
  },
);
