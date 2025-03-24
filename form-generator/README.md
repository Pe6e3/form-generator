# Form Generator

Генератор форм на Vue.js с возможностью кастомизации полей через слоты.

## Требования

- Node.js (версия 16 или выше)
- npm (версия 7 или выше)

## Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/Pe6e3/form-generator/
cd form-generator
```

2. Установите зависимости:

```bash
npm install
```

## Запуск

### Режим разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173

### Сборка для продакшена

```bash
npm run build
```

### Предпросмотр собранного приложения

```bash
npm run preview
```

## Структура проекта

```
form-generator/
├── src/
│   ├── components/
│   │   ├── FormGenerator.vue    # Основной компонент генератора форм
│   │   └── MyForms/            # Примеры форм
│   ├── stores/
│   │   └── formStore.js        # Хранилище Pinia для управления состоянием
│   ├── styles/
│   │   ├── main.scss          # Основные стили
│   │   └── bootstrap-icons.scss # Стили для иконок
│   ├── App.vue
│   └── main.js
├── public/
├── package.json
└── vite.config.js
```

## Использование

1. Импортируйте компонент `FormGenerator`:

```javascript
import FormGenerator from "./components/FormGenerator.vue";
```

2. Создайте объект формы:

```javascript
const form = {
  title: "Название формы",
  elements: [
    // элементы формы
  ],
  buttonOk: {
    text: "Отправить",
    color: "green",
    textColor: "white",
    action: () => {
      // действие при отправке
    },
  },
  buttonCancel: {
    text: "Отменить",
    color: "red",
    textColor: "white",
    action: () => {
      // действие при отмене
    },
  },
};
```

3. Используйте компонент:

```html
<form-generator :form="form" />
```

## Кастомизация полей

Вы можете кастомизировать любое поле формы через слоты:

```html
<form-generator :form="form">
  <template #имя="{ element }">
    <!-- Ваша кастомизация поля -->
  </template>
</form-generator>
```

## Лицензия

MIT
