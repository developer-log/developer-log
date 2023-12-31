---
title: "[In one Paper]: Rust"
tags:
  - rust
  - backend
  - system
  - onepaper
description: >
  В данном гайде полностью пройдемся по языку Rust, рассмотрим аспекты внутри языка, которых нет в других языках программирования,
  а также напишем несколько простых алгоритмов/программ.
date: 21 Apr 2023
_draft: true
---

# Переменные

Переменные в Rust являются иммутабельными (неизменяемыми) по умолчанию. То есть один раз назначив значение переменной переинициализировать ее нельзя 🙅🏻‍♂️

```rust[main.rs]
fn main() {
	let x = 5;
	x = 6;
}
```

При компиляции такой программы Rust выдаст нам ошибку:

```bash
$ cargo run
error[E0384]: cannot assign twice to immutable variable `x`
 --> src/main.rs:3:5
  |
2 |     let x = 5;
  |         -
  |         |
  |         first assignment to `x`
  |         help: consider making this binding mutable: `mut x`
3 |     x = 6;
  |     ^^^^^ cannot assign twice to immutable variable

For more information about this error, try `rustc --explain E0384`.
error: could not compile `variables` due to previous error
```

На всякий случай уточню, что комментарии в Rust выглядят следующим образом:

```rust
// Однострочный коментарий

/*
	Многострочный комментарий
*/

/// Комментарий для документации
/// Данный тип комментария отображается в редакторе в preview и поддерживает Markdown
///
/// # Пример
///
/// ```
/// let arg = 5;
/// println!("{arg}");
/// ```
```

Как можно увидеть вверху мы объявляем переменную с помощью ключевого слова `let`, затем даем ей название (x) и через знак равенства инициализируем данную переменную. Хоть переменные в Rust по умолчанию иммутабельны, мы можем сделать их изменяемыми с помощью ключевого слова `mut`:

```rust
fn main() {
	let mut x = 5;
	x = 6;
	println!("Output: {}", x); // Output: 6
}
```

## Переобъявление или Shadowing, или затемнение 👥
**Переобъявление** - возможность заново объявить переменную с другим значением, но с тем же типом данных.

Вот как это выглядит в коде:

```rust
fn main() {
    let x = 5;
    let x = x + 2;
    {
        let x = x * 2;
        println!("Значение переменной внутри скоупа: {x}");
    }
    println!("Значение переменной: {x}");
}
```

Вывод будет следующий:

```bash
Значение переменной внутри скоупа: 14
Значение переменной: 7
```

> **Скоупом/замыканием** называется вложенная область видимости, которая может использовать переменные извне не влияя на них. В примере вверху можно увидеть, что мы переобъявили переменную `x` и использовали ее не влияя на переменную `x` вне скоупа.

Переобъявление нужно для того чтобы выполнить определенные преобразования с иммутабельной переменной, но при этом оставить саму переменную иммутабельной.

