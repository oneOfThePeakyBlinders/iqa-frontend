module.exports = {
  extends: ['react-app', 'airbnb', 'prettier'],
  rules: {
    // делаем error, чтобы зачищать консоли, если где-то консоль важна,
    // то правило нужно отключить на строке
    'no-console': 'error',

    // правило не нужно т.к. CRA настроен на автоимпорт реакта
    'react/react-in-jsx-scope': 'off',

    // todo нужно узнать что лучше off или error (по умолчанию error)
    'import/prefer-default-export': 'off',

    // иначе компонента выглядят уродски
    'arrow-body-style': 'off',

    // styled-components часто требует пробрасывания всех пропсов
    'react/jsx-props-no-spreading': 'off',
  },
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};