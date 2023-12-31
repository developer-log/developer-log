---
title: Собираем IDE из Neovim
tags:
  - neovim
  - lua
  - configuration
  - linux
  - macos
description: >
  В данной статье рассмотрим как из Neovim сделать полноценную замену IDE, рассмотрим популярные плагины и поговорим что же не так с другими редакторами IDE. Под катом можно будет найти много ссылок на плагины, изучение Lua параллельно с конфигурацией Neovim и еще множество всякой всячины.
date: 08 May 2023
_draft: true
---

# Проблема других редакторов
**Никакой проблемы нет. Пользуйтесь тем, что вам удобно.**

В моем случае, у редакторов были следующие недостатки:

> Если вам нужно перейти непосредственно к настройке, то вы можете перейти к "Теория настройки"

**Webstorm**:
- Большое потребление памяти (хотя это не так уж и важно);
- Платность (скорее то, что теперь невозможно оплатить из РФ/Беларуси);
- Неудобные горячие клавиши (о том, почему я не советую их менять - позже);

**VSCode**:
- Большое потребление памяти (хотя это не так уж и важно);
- Плохая поддержка Vue (критично для меня);
- Мало возможностей для рефакторинга (оно и ясно, это же редактор, а не IDE);

**Neovim**:

- Долгая настройка

- Думаю это не исчерпывающий список, более того, этот список относится только к моим потребностям и вы можете быть не согласны. Если это так - прошу в комментарии, обсудим =)

# Проблема горячих клавиш
Я всем сердцем люблю WebStorm. Данная IDE позволяет ускорить работу в разы. Проблема состоит в том, что у нее неудобные горячие клавиши. Данные горячие клавиши можно изменить, однако я не советую это делать (как уже говорил выше), давайте отвечу на вопрос "почему?!".

Я никогда особо не доверял облачным сервисам. Еще с самого начала своего пути я старался сделать так, чтобы если "конфиг пропадет", то это не помешало мне работать дальше. Естественно это не должно переходить в паранойю, но я привык работать со стандартными горячими клавишами и считаю это хорошей манерой. Если вам нужно будет помочь коллеге на его компьютере, вам не нужно будет вспоминать стандартные горячие клавиши, вы будете работать с ними как на своей машине.

Данный принцип множество раз спасал меня, когда я еще пользовался Linux. Если что-то упало или я занимался дистрохопперством (перепрыгиванием с одного дистрибутива на другой), то мне не приходилось заново все настраивать/вспоминать горячие клавиши. Я уже все знал.

Важно заметить что данная идеология обращения с горячими клавишами не относится к новым горячим клавишам. Если для определенного функционала нет горячей клавиши, то я настраивал их так, как мне удобно.

Отдельно стоит объяснить, что "проблема горячих клавиш" появляется не только в WebStorm. VSCode, Atom, Sublime, <вставьте свой редактор/IDE> - все они имеют разные горячие клавиши по тем или иным причинам. Конечно можно было пользоваться продуктами от JetBrains, ведь они все имеют очень схожие горячие клавиши (Fleet не берем в счет, он не от мира сего), однако тогда придется держать у себя много IDE и привязаться к экосистеме JetBrains, что не совсем возможно в настоящее время.

Почему Neovim?
Neovim имеет ряд преимуществ и недостатков по сравнению с другими редакторами. Самый главный недостаток - вам придется учить и привыкать к Vim-like редактированию.

После того как вы привыкнете к особенностям работы с текстом с помощью Vim - вы вряд ли сможете отвыкнуть, если вы решите перейти обратно на другой редактор, то потянете эмулятор Vim за собой в виде плагина (кой их огромное количество для разных редакторов).

Ранее Vim (именно о Vim сейчас идет речь) настраивался с помощью VimScript, теперь и вовсе создатель Vim решил выпустить свой язык - VimL, которым особо никто не пользуется. Проблема Vim была в том, что его поддержка являлась трудоемким делом, поэтому энтузиасты переписали Vim с нуля и создали Neovim.

Neovim в свою очередь дал возможность писать конфигурацию для редактора в формате Lua, он предоставил все необходимое API и дал возможность расширения в удобном формате. Также Neovim внедрил технологию LSP, для того чтобы интегрировать языковые серверы было еще легче.

В итоге мы получили хорошо расширяемый программируемый редактор, с поддержкой протокола языковых серверов из коробки. Neovim можно интегрировать с любым языковым сервером, можно даже подключить интеграции, которых нет ни в одной IDE (пример с языком Fennel).

# Теория настройки
Теперь когда мы проговорили все то, что должны были проговорить - можно приступать к настройке. В данной части туториала мы рассмотрим файловую структуру, а также приведем несколько примеров уже готовых сборок.

Подобно настройки на VimScript настройка Neovim на Lua начинается с входного файла. Данный файл называется init.lua.

## Хорошая практика: Разделение файлов
Хорошей практикой является размещение импортов в данном файле. Написание конфигурации прям в init.lua - наоборот является антипаттерном, так как если держать все настройки в одном файле - велика вероятность того, что у вас все перемешается.

> **Важно**: Все остальные файлы Lua (кроме init.lua) нужно размещать в директории lua/ для того чтобы Neovim смог подхватить импорты из init.lua.

Сейчас наше древо файлов выглядит следующим образом:

```
.
├── init.lua
└── lua
```

## Хорошая практика: Нейминг
В нашей конфигурации будет файл, который непосредственно настраивает сам Neovim. Такой файл принято называть base.lua или settings.lua.

Также у нас будет файл для назначения горячих клавиш, такие файлы обычно называются hotkey.lua, keybinding.lua или keys.lua.

Чуть позже мы столкнемся с конфигурацией множества плагинов, для того чтобы не разбрасывать конфигурации плагинов по всей директории lua, мы создадим для конфигураций отдельную директорию. В разных сборках для данной директории разное название: plugin_config, plugins, extensions. Естественно вы можете выбрать любое понравившееся вам имя, однако если вы планируете делиться своей конфигурацией, то я советую вам 2-й (plugins) или 3-й (extensions) вариант.

Возможно, нам понадобятся функции, которые будут упрощать нашу конфигурацию. Директории в которых хранятся такие функции обычно называют: utils, helpers, functions.

Теперь наше древо файлов выглядит примерно так:

```
.
├── init.lua
└── lua/
├── extensions/
├── keys.lua
├── settings.lua
└── utils/
```

## Хорошая практика: Готовые сборки
Если вы хотите посмотреть на то как выглядят уже готовые сборки (конфигурации Neovim) или хотите просто попробовать использовать уже готовое решение, то Neovim изобилует уже готовыми сборками. Внизу представлены те, которыми когда-то пользовался я:

- https://github.com/tokiory/hikko
- https://spacevim.org/
- https://github.com/AstroNvim/AstroNvim
- https://github.com/CosmicNvim/CosmicNvim
- https://github.com/LazyVim/LazyVim
- https://github.com/doom-neovim/doom-nvim
- https://github.com/LunarVim/LunarVim
- https://github.com/NvChad/NvChad

## Хорошая практика: Темплейты
Если вам лень начинать все сначала или вы экспериментируете с разными плагинами - то вам не мешало бы иметь под рукой темплейт. Ранее я не видел темплейтов для Neovim, поэтому сам продвинул эту идею в Awesome Neovim. Плюс такого подхода в том, что вам не придется переписывать стартовый темплейт из разу в раз, следовательно вы сразу сможете подключать необходимые плагины.

[Темплейты можно найти здесь.](#)

Если вы хотите удобно работать с темплейтом прямо внутри Github, при этом вам из коробки хочется использовать LSP,
то вы можете [посмотреть на темплейт](#), который сделал я. Он также первый в списке в разделе Starter Templates в Awesome Neovim.

# Базовая настройка
Теперь, когда у нас есть хоть какая-то теория (ибо ни в одном туториале ее не видел) - мы можем начать делать наш конфиг. Начнем с простого - конфигурирования самого Neovim.

Для начала нам нужно перейти в уже созданный нами файл settings.lua. Теперь мы будем по частям писать конфиг.

Как сделать сегменты конфигурации в файле удобнее?
Для начала давайте поборем самое сложное и противное в Neovim - табы. Внизу предоставлена конфигурация:

```lua
-- Tabs {{{
-- Используем пробелы по умолчанию
vim.opt.expandtab = true

-- Устанавливаем количество пробелов по нажатию "<<" и ">>"
vim.opt.shiftwidth = 2

-- Один символ табуляции теперь будет отображаться как два пробела
vim.opt.tabstop = 2

-- Включаем умный перенос (подробнее: :h smartindent)
vim.opt.smartindent = true
-- }}}
```

Как мы можем увидеть мы используем глобальный объект vim для того чтобы обратиться к API Neovim.
Нам не нужно его импортировать, он есть во всех файлах, которые Neovim будет подключать.

Кажется немного неудобным то, что мы везде должны приписывать `vim`. Мы можем создать алиасы! Подобно JS,
в Lua при присвоении поля объекта другой переменной - в новой переменной просто будет храниться адрес значения вложенного поля.
Звучит жутковато, не правда ли?

Возможно вам будет легче понять, если вы посмотрите на JS-код (те, кто не знаком с JS, тоже поймут, так как тут все достаточно тривиально):

```js
const person = {
nickname: ["crackidocky", "tokiory"]
  info: {
    age: 20
  }
};

const information = person.info;
information.age = information.age + 1;

console.log(person.info.age, information.age); // 21 21
console.log(person.info === information) // true -> один и тот же адрес
```

То же самое можно сделать и в Lua с API Neovim:

```lua
-- File: helpers/globals.lua
cmd = vim.cmd; -- Command function
api = vim.api; -- Neovim API
lsp = vim.lsp; -- LSP API
fn = vim.fn;   -- Vim function
g = vim.g;     -- Vim globals
opt = vim.opt; -- Vim optionals
```

Теперь нам нужно импортировать наш файл с глобальными переменными в `init.lua` и они сразу станут доступны во вложенных файлах:

```lua
-- File: init.lua
require "helpers/globals"
```

#### Инициализация глобальных и локальных переменных в Lua

# Плагины
Заранее оговорюсь, что тут буду настраивать только те плагины, которые использую ежедневно. Список всех популярных плагинов можно найти тут.

# Горячие клавиши
