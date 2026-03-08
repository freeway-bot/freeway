# Инструкция по публикации на GitHub Pages

## Шаг 1: Создайте репозиторий на GitHub

1. Перейдите на https://github.com
2. Нажмите "+" → "New repository"
3. Заполните:
   - **Repository name:** `freeway-china` (или другое название)
   - **Description:** "Лендинг компании FreeWay China"
   - **Public** (отметьте галочку)
   - **Initialize with README** (не отмечайте)
4. Нажмите "Create repository"

## Шаг 2: Подготовьте локальный репозиторий

```bash
# Перейдите в папку с сайтом
cd company-landing

# Инициализируйте Git
git init

# Добавьте все файлы
git add .

# Сделайте коммит
git commit -m "Initial commit: FreeWay China landing page"

# Добавьте удаленный репозиторий
git remote add origin https://github.com/YOUR_USERNAME/freeway-china.git

# Отправьте на GitHub
git push -u origin main
```

## Шаг 3: Настройте GitHub Pages

1. Перейдите в репозиторий на GitHub
2. Нажмите "Settings" → "Pages"
3. В разделе "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** `main` (или `gh-pages`)
   - **Folder:** `/` (root)
4. Нажмите "Save"

## Шаг 4: Ожидайте публикации

GitHub Pages обычно публикует сайт в течение 1-2 минут. После этого:

- **Ваш сайт будет доступен по адресу:**
  `https://YOUR_USERNAME.github.io/freeway-china/`

## Альтернативный способ: через GitHub CLI

Если установлен GitHub CLI:

```bash
# Авторизация
gh auth login

# Создание репозитория
gh repo create freeway-china --public --source=. --remote=origin --push
```

## Проверка сайта

После публикации откройте:
- `https://YOUR_USERNAME.github.io/freeway-china/`
- Или `https://YOUR_USERNAME.github.io/freeway-china/index.html`

## Обновление сайта

Для обновления сайта:

```bash
# Внесите изменения в файлы
# Затем:
git add .
git commit -m "Update: описание изменений"
git push
```

GitHub Pages автоматически обновит сайт в течение 1-2 минут.

## Проблемы и решения

### Сайт не отображается
- Подождите 2-3 минуты
- Проверьте настройки GitHub Pages
- Убедитесь, что ветка `main` выбрана как источник

### Ошибки в консоли
- Проверьте, что все пути к файлам правильные
- Убедитесь, что CDN Font Awesome доступен

### Нужен собственный домен
1. Купите домен (например, freewaychina.com)
2. В настройках GitHub Pages укажите домен
3. Настройте DNS записи у регистратора

---

**Готовый сайт находится в этой папке.** Просто следуйте инструкциям выше для публикации.

Удачи! 🚀