---
title: "[In one Paper]: HTML"
tags:
  - html
  - web
description: Гайд для HTML, в котором описываются все основные правила для освоения HTML + важные теги.
date: 05 Jan 2023
_draft: true
---


# Основы HTML
В данном гайде можно узнать что такое HTML, с чем его едят, а также получить вводные знания, которые понадобятся вам при разработке веб-сайтов.

**HTML** (_Hyper Text Markup Language_) - язык гипертекстовой разметки. Это язык для разметки, который используется для написания _структуры_ сайтов и веб-приложений.

HTML можно увидеть буквально везде (на каждом сайте), он выступает в роли каркаса для построения сайтов. В том числе HTML можно увидеть и на данном сайте, для этого достаточно включить инструменты разработчика.

# Редактор

Для начала изучения HTML - нам понадобится редактор, в котором мы сможем писать код. Редакторов существует огромное множество, однако среди них стоит отметить следующие:

- **[VSCode](https://code.visualstudio.com)** - Редактор разработанный компанией Microsoft. Очень гибкий в настройке, для него написано огромное количество плагинов, он распространяется бесплатно и имеет открытый исходный код.
- **[Atom](https://github.com/atom/atom)** - Редактор разработанный Github, который поддерживался до недавнего времени. Не смотря на то, что сейчас им пользуется все меньше и меньше людей - он остается красивым и удобным аналогом VSCode.
- **[Sublime Text](https://www.sublimetext.com)** - Проприетарный (платный) редактор, у которого есть неограниченный пробный период. Ранее им пользовалось много разработчиков, так как ему не было аналогов.

# Теория

Для начала начнем с базовой теории, которую нужно будет хорошенько запомнить😉

1. Весь HTML, который вы будете писать будет хранится в файлах с расширением `.html`

   Пример: `index.html`, `about.html`, `page.html`

2. Весь код в HTML состоит из тегов. Их мы обсудим сразу после данного списка.
3. Каждый файл `.html` можно открыть в браузере. Там же вы можете увидеть что вы сверстали.
4. Весь код можно посмотреть прямо в браузере, если включить [инструменты разработчика](https://habr.com/ru/company/simbirsoft/blog/337116/), там же можно его и изменить.

# Теги
Как уже ранее оговаривалось весь код, который мы пишем в файлах `.html` состоит из тегов.

> **Тег** - основная единица структурирования в HTML, которая используется для создания элементов. Элементом может быть ссылка, картинка, параграф текста, таблица, пустышка и еще много разных элементов пользовательского интерфейса. Существуют разные теги для разных задач, однако синтаксис написания у всех - один и тот же.

Синтаксис для написания тега в HTML достаточно простой:


```html
<!-- Одиночный тег -->
<название-тега атрибут1="значение" атрибут2="значение">

<!-- Парный тег -->
<название-тега атрибут1="значение" атрибут2="значение">...</название-тега>
```

Как видно из сниппета кода - теги бывают _одиночные_ и _парные_.

* Парные теги используются тогда, когда в них можно вложить дочерние элементы.

  **Например**: Вложить ссылку внутрь текста (параграфа)

* Одиночные теги используются в том случае, когда в элемент нельзя ничего вложить.

  **Например**: Отобразить картинку. Внутри картинки мы естественно ничего не можем вложить.

## Одиночные теги
Одиночных тегов существует огромное множество. В таблице под данным текстом перечислены некоторые из них:

| Название&nbsp;тега | Для чего нужен                                                                                                                     |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------|
| `<img>`            | Отображает картинку.                                                                                                               |
| `<input>`          | Отображает поле для ввода.                                                                                                         |
| `<meta>`           | Используется для задания мета-информации. Например какое будет описание страницы или как страница будет отображаться на телефонах. |
| `<br>`             | Используется для того чтобы отобразить текст после данного тега на новой строке.                                                   |
| `<hr>`             | Отображает горизонтальную линию. Ее еще часто называют "дивайдер".                                                                 |

Внизу вы можете увидеть сниппет кода, создайте у себя файл `index.html` и скопируйте туда данный код. В первом примере мы покажем обычную картинку.

> Если вас вдруг смутили _атрибуты_ по типу `width="200"`, то можно не беспокоиться, совсем скоро мы их обсудим. Пока что достаточно понимания, что тег одиночный и он работает✨

```html
<img
  width="200"
  src="https://images.pexels.com/photos/14487514/pexels-photo-14487514.jpeg"
  alt="Bird image"
>
```

## Атрибуты

Атрибуты часто используются и с парными тегами, и с одиночными. В основном атрибуты используются для того чтобы указать информацию для тега.

Например, в прошлом примере - мы использовали атрибут `width="200"`, для того чтобы указать ширину для картинки. Также мы использовали атрибут `src` и `alt`, первый указывает ссылку с которой браузер подтянет картинку, а второй - какой текст отобразится, если картинка недоступна.

Давайте попробуем поэксперементировать с атрибутами, хорошо будет поэксперементировать с ними с помощью тега `<input>`, который создает поле для ввода.

1. Попробуйте сравнить два тега `<input>` и понять в чем их отличия
2. Попробуйте стереть атрибут `type="checkbox"` и посмотреть что будет

```html
<input placeholder="Какой-то текст.." type="text">

<br>

<input type="checkbox"> Тут можно поставить галочку!
```

В данном случае `type="тип инпута"` - указывает на тип инпута.

- `text` - говорит нам о том, что инпут представляет из себя обычное поле для ввода текста.
- `checkbox` - говорит нам о том, что инпут представляет из себя поле для галочки (чекбокса).

Атрибут `placeholder` указывает какой текст будет до ввода в поле текста. Как только в поле попадет хотя бы один символ, то данный текст исчезнет.

## Парные теги
Парные теги могут заключать в себя другие теги. Например существует два тега:

| Название&nbsp;тега | Для чего нужен                                                                                                                     |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------|
| `<p>`              | Для создания параграфа.                                                                                                            |
| `<a>`              | Для создания ссылки.                                                                                                               |

Для создания текста со ссылкой нам понадобится написать следующий код:

```html
<p>Какой-то текст со
  <a href="http://rickroll.com">ссылкой</a>.
</p>
```

Как можно увидеть тут мы создаем тег `<p>` в котором находится текст, затем мы _открываем_ еще один тег `<a>` в котором внутри пишем слово `ссылкой`, а также даем тегу атрибут `href="rickroll.com"`, это ссылка на которую перейдет пользователь, после того как кликнет на данную ссылку.

Нужно обратить внимание, что мы последовательно открываем теги и последовательно закрываем их. Важно правильно правильно открывать и закрывать теги. Тут действует принцип вложенности, то есть самый верхний элемент будет закрываться в последнюю очередь:

```html
<p>

  <!-- Тег <a> является дочерним тегом, поэтому мы закрываем его сразу же,
    после того как закончили с ним работать -->
  <a href="какая-то ссылка"></a>

<!-- Тег <p> открывался в первую очередь и закрывается в последнюю очередь -->
</p>
```

Наверное уже понятно, что для закрытия тега нужно также написать скобки `<>`, но добавить перед именем тега слэш: `</название-тега>`.

<div style="font-size: 24px; margin: 2em 0 1em; text-align: center;">Саммари</div>

- Весь HTML-код пишется в файлах с расширением `.html`;
- Теги бывают _одиночные_ и _парные_;
- Атрибуты используются для того чтобы указать специфические для атрибутов свойства

  **Например:** указать ссылку (_`href`_), которая откроется по клику на тег `<a>` или размер картинки (_`width`_);

- Мы выучили некоторые теги:
    - `<img>` - тег для создания элемента картинки;
    - `<input>` - тег для создания элемента поля ввода;
    - `<br>` - тег для создания элемента переноса текста;
    - `<p>` - тег для создания элемента параграфа;
    - `<a>` - тег для создания элемента ссылки;

# Бойлерплейт
Каждая страница содержит в себе один и тот же код, который мы будем изменять:

```html
<!DOCTYPE html>
<html lang="en">

  <!-- Шапка сайта. Тут находится информация, которая нужна браузеру -->
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <!-- Тело сайта. Тут находятся теги, которые будут отрисовываться -->
  <body>
    <p>Какой-то текст..</p>
  </body>
</html>
```

Данный код называется **бойлерплейт**, его можно легко написать в редакторе: для этого достаточно ввести `html:5` и нажать `tab`.

## \<!DOCTYPE\>
`DOCTYPE` используется для того чтобы обозначить какой будет тип документа. Данная информация нужна только браузеру и она влияет на формат верстки.

Дело в том, что существуют другие языки разметки (кроме HTML), среди них:

- HTML
- HTML 4.0
- XHTML 1.0
- XHTML 1.1

## \<html\>
Тег `<html>` определяет начало документа. Он нужен для того чтобы браузер знал откуда нужно парсить (считывать) документ.

Данный тег **всегда** идет после `<!DOCTYPE>`:

```html
<!DOCTYPE html>
<html>

</html>
```

Также с помощью атрибута `lang` можно передать на каком языке будет документ. Вот примеры значений:

- `<html lang="ru">` - документ будет на русском языке
- `<html lang="en">` - документ будет на английском языке

> Стоит помнить, что `<html>` - парный тег. В примере выше (в списке) написан только открывающий тег.

## \<head\>
Шапка сайта `<head>`, может содержать текст и теги, но содержимое этого раздела не показывается напрямую на странице.

Внутри шапки сайта обычно подключаются [стили](/tutorial/css), а также шрифты, [скрипты](https://learn.javascript.ru) и многое другое.

Внутри шапки сайта могут быть следующие теги:
- `<link>` - тег для подключения стилей, скриптов, а также шрифтов;
- `<title>` - тег для названия сайта;
- `<meta>` - тег для задания мета-информации (по типу описания сайта, кодировки и так далее). Данный тег нужен браузеру для правильного подключения HTML-файла;

> Тег `<title>` является обязательным и должен непременно присутствовать в коде документа.

### \<meta\>
Метатеги используются для хранения информации, нужной для браузеров и поисковых систем (по типу Yandex или Google).

Например, механизмы поисковых систем ищут метатеги для получения описания сайта, ключевых слов, кодировки и других данных. Хотя тег `<meta>` всего один, он имеет несколько атрибутов, поэтому к нему и применяется множественное число.

```html
<!--
  Данный метатег говорит браузеру о том,
  что на маленьких экранах не нужно увеличивать содержимое сайта
  И все элементы на странице должны рисоваться в исходных размерах
-->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## \<body\>
Данный тег нужен для того чтобы размещать в нем все содержимое сайта, которое будет отрисовываться. Данный тег еще называют "телом документа".

# Блочные и строчные элементы
В HTML теги, которые показывают пользователю какой-то контент (внутри `<body>`) бывают двух типов:
- Блочные
- Строчные

## Блочные теги
Блочные теги характеризуются тем, что занимают всю ширину экрана.

Особенность блочных тегов еще и в том, что в них можно вкладывать другие блочные теги, а также строчные теги. Для начала приведем небольшую таблицу тегов, которые являются блочными:

| Тег          | Для чего нужен                                                                                                                  |
|--------------|---------------------------------------------------------------------------------------------------------------------------------|
| `<address>`    | Тег который хранит в себе адресную информацию                                                                                   |
| `<article>`    | Тег, в котором хранится контент для статьи                                                                                      |
| `<aside>`      | Данный тег содержит весь контент, который относится к тегу `<main>`, но не содержится непосредственно в нем \(например: реклама\) |
| `<blockquote>` | Данный тег содержит блочную цитату                                                                                              |
| `<dialog>`     | Данный тег нужен для создания диалогового окна \(попап\)                                                                        |
| `<div>`        | Тег пустышка                                                                                                                    |
| `<fieldset>`   | Данный тег хранит в себе группу полей в форме, которая связана одним смыслом                                                    |
| `<figcaption>` | Тег который нужен для описания картинки \(текст\-сноска\)                                                                       |
| `<figure>`     | Тег который нужен для группирования картинки и ее описания                                                                      |

Следующий код абсолютно валиден:

```html
<figure>
  <img src="/123.jpg" alt="Какая-то картинка">
  <figcaption>Описание для какой-то картинки</figcaption>
</figure>
```

Как можно увидеть тут блочный тег `<figcaption>`, который нужен для описания картинки вложен в тег `<figure>`.

## Строчные теги
Внутри строчных тегов можно вставлять только другие строчные теги.

Вот некоторые из строчных тегов:

| Тег          | Для чего нужен                                                                           |
|--------------|------------------------------------------------------------------------------------------|
| `<a>`        | Тег, который нужен для ссылки                                                            |
| `<abbr>`     | Тег который создает аббревиатуру (например: JS). При наведении можно увидеть расшифровку |
| `<audio>`    | Тег который нужен для создания аудио                                                     |
| `<br>`       | Тег для разрыва линии                                                                    |
| `<button>`   | Кнопка 🤷‍♂️                                                                                |
| `<canvas>`   | Специальный тег, который создает интерактивный элемент для отрисовки 2D или 3D контента  |
| `<cite>`     | Тег для ключевого слова на сайте                                                         |
| `<code>`     | Тег для вставки кода внутрь и отображения на странице                                    |
| `<em>`       | Тег для создания курсивного текста                                                       |
| `<embed>`    | Тег для вставки контента из другой страницы                                              |
| `<iframe>`   | Тег для вставки интерактивного контента из другой страницы                               |
| `<img>`      | Тег для вставки картинки                                                                 |
| `<input>`    | Тег для создания поля для ввода                                                          |
| `<kbd>`      | Тег который нужен для отображения кнопки или горячей клавиши                             |
| `<label>`    | Тег который нужен для того чтобы отобразить название поля для ввода в форме              |
| `<mark>`     | Используется для того чтобы подчеркнуть текст                                            |
| `<noscript>` | Тег который будет выводить содержимое, если в браузере отключен JavaScript               |
| `<object>`   | Тег для того чтобы вставить графический элемент (например: svg)                          |
| `<picture>`  | Тег который нужен для вывода картинок различного разрешения                              |
| `<progress>` | Тег, который вставляет прогресс бар                                                      |
| `<q>`        | Строчная цитата                                                                          |
| `<script>`   | Тег для подключения скриптов                                                             |
| `<select>`   | Тег для инпута выбора (дропдаун)                                                         |
| `<small>`    | Тег для вставки маленького текста                                                        |
| `<span>`     | Тег пустышка (строчный)                                                                  |
| `<strong>`   | Тег для вставки жирного текста                                                           |
| `<sub>`      | Тег для вставки текста в половину высоты исходного текста (будет вставлен внизу)         |
| `<sup>`      | Тег для вставки текста в половину высоты исходного текста (будет вставлен вверху)        |
| `<svg>`      | Тег для вставки SVG-изображения                                                          |
| `<textarea>` | Тег для вставки инпута для текста (многострочный инпут)                                  |
| `<time>`     | Тег для вставки времени                                                                  |
| `<video>`    | Тег для вставки видео                                                                    |
| `<wbr>`      | Тег для вставки разрыва слова                                                            |

Следующий код абсолютно валиден:

```html
<p>
  <a href="https://google.com">Google</a> - одна из лучших<br /> поисковых <span>систем</span> в мире.
</p>
```

<div style="font-size: 24px; margin: 2em 0 1em; text-align: center;">Саммари</div>

- Для HTML кода существует общепринятый стартовый код. Его можно быстро написать с помощью сокращения `html:5`;
- В HTML существует два типа тегов: строчные и блочные;
- Блочные теги можно вкладывать в блочные теги;
- Строчные теги можно вкладывать и в блочные теги, и в строчные теги;

# Текст
Текст в HTML-файлах можно выводить с помощью параграфов. Есть несколько важных вещей, которые делают параграфы:

1. Если вы напишете огромное количество пробелов между словами в параграфе, то данные пробелы преобразуются в один
2. Если мы будлем писать текст вне параграфа или любого другого тега, то текст будет без разделения по линиям (в одну строку)

Попробуйте написать следующее в HTML-файле и открыть файл в браузере:

```html
<p>Один       два        три</p>

Один два три
  четыре

<p>
  Один два
  три
<p>
```

Данный код выведет следующее:

```html
Один два три

Один два три четыре

Один два три
```

## Форматирование
Форматирование текста выполняется с помощью следующих тегов:
- `<em>` - Курсивный текст
- `<strong>` - Жирный текст
- `<s>` - Перечеркнутый текст

```html
<p>
  <s>Этот текст перечеркнут</s>
<p>

<p>
  <strong>Этот текст жирный</strong>
<p>

<p>
  <em>Этот текст написан курсивом</em>
<p>
```

Важно отметить, что текст может быть не только внутри тега `<p>`. В теге `<p>` находится текст который является параграфом (текст объединенный одним смыслом). В настоящей верстке вы часто будете видеть текст внутри тега пустышки (`<div>` или `<span>`). По сути они отличаются только семантикой (то как поисковые системы будут обрабатывать данный текст) и отступами (у `<p>` есть отступы, когда у `<div>` или `<span>` - их нет).

## Заголовки
Заголовки в документе ставятся с помощью тега `<h(цифра)>`. Цифра может быть в диапазоне от 1 до 6 включительно. Первый заголовок является самым крупным, шестой же еле отличим от обычного текста:

```html
<h1>Самый крупный заголовок</h1>

<h2>Менее крупный заголовок</h2>

<h3>Заголовок</h3>

<h4>Маленький заголовок</h4>

<h5>Еще более маленький заголовок</h5>

<h6>Очень мелкий заголовок</h6>
```

## Ссылки
**Ссылки** - это блочные элементы, которые при клике переводят пользователя на другой ресурс или на другую страницу.

Синтаксис у ссылок следующий:

```html
<a href="https://google.com">Ссылка!</a>
```

Внутри тега `<a>` находится текст, который называется "название ссылки". При клике на него пользователь перейдет на другой ресурс (страницу).

С помощью атрибута `href="ссылка"` - мы можем указать ссылку, на которую пользователь перейдет при клике.

Также у ссылки может быть атрибут `target`, который указывает нужно ли открывать ссылку в новой вкладке. Вот как это выглядит в коде:

```html
<a href="https://ya.ru" target="_blank">Яндекс откроется в новой вкладке</a>
```

# Списки
Списки задаются с помощью тегов `<ul>`, `<ol>` и элементов списка `<li>`:

```html
<h1>Список покупок</h1>

<!-- Ненумерованный список -->
<ul>
  <li>Молоко</li>
  <li>Еще молоко</li>
  <li>Молоко в пакете для молока</li>
  <li>Молоко в пакете для молока в пакете</li>
</ul>

<h1>Список того, что не нужно покупать</ul>

<!-- Нумерованный список -->
<ol>
  <li>Оливки</li>
  <li>Кошачий корм</li>
</ol>
```

Ненумерованный список характеризуется тем, что рядом с элементами списка отображаются кружочки (которые в последствии можно будет изменить с помощью [CSS](/tutorial/css)).

Нумерованный список характеризуется тем, что рядом с элементами списка отображаются (кто бы мог догадаться) числа.

Элементами списка является содержимое внутри тега `<li>`.
