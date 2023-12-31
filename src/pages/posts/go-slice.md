---
title: "О слайсах и массивах в Go"
tags:
  - go
  - backend
description: >
  В данной статье подробно расскажу чем слайс отличается от массива в Go, а также что делают функции copy и append
date: 04 Jun 2023
origin:
  type: Habr
  url: https://habr.com/ru/articles/739754/
---

# О массивах и списках в Go

Массивы в Go являлись для меня одной из сложных тем, так как я не понимал как они работают. В данной статье рассмотрим как же именно работают массивы в Go.

# Массивы
**Массивы** - коллекция элементов одного типа. Длина массива *не* может изменяться. Вот как мы можем создать массив в Go:

```go
arr := [4]int{3,2,5,4}
```

Если мы создадим два массива в Go с разными длинами, то два массива будут иметь разные типы, так как **длина массива в Go, входит в его тип**:

```go
a := [3]int{}
b := [2]int{}

// (a) [2]int и (b) [3]int - разные типы
```

Более того, если нам лень писать длину массива, то мы можем сказать компилятору, чтобы он сам подсчитал длину:

```go
a := [...]int{1, 2, 3} // [3]int
```

## Передача по значению
Переменная, которую мы инициализировали со значением массива, содержит именно значения массива, а не ссылку на первый элемент массива (как это сделано в C).

Именно поэтому массив в Go является примитивным типом данных, он может копироваться при передаче в другую переменную. По умолчанию в Go все значения копируются, а не передаются с помощью ссылки. Это значит, что если мы передадим наш массив в функцию, то Go скопирует данный массив и в функции будет находиться уже совершенно другой массив (вернее точная копия исходного массива).

Внизу мы рассмотрим пример, где мы скопируем массив, а затем посмотрим на адрес, по которому хранится значение:

```go
package main

import "fmt"

func main() {
	var initArray = [...]int{1, 2, 3}
	var copyArray = initArray

	fmt.Printf("Address of initArray: %p\n", &initArray)
	fmt.Printf("Address of copyArray: %p\n", &copyArray)
}

/*
Output:
  Address of initArray: 0xc00001a018
  Address of copyArray: 0xc00001a030
*/
```

# Слайсы
Слайсы в Go более гибкие, они позволяют изменять свою длину. По сути слайсы являются надмножеством массивов. Слайсы создают нам массив, которым мы можем пользоваться как обычным массивом и при надобности расширяют его.

Слайсы можно создать двумя способами:

```go
// С помощью make
var foo []byte
s = make([]byte, 5, 5)

// С помощью shorthand syntax
bar := []byte{}
```

## Способ с make
Способ с `make` является более интересным, так как дает нам возможность задать тип, длину и _вместимость_.

С типом я думаю никаких проблем быть не должно. Тип слайса формируется в виде `[]тип`.

С длиной тоже ничего интересного. В зависимости от введенного количества - массив заполнится нулевыми значениями, например:

```go
package main

import "fmt"

func main() {
	var foo = make([]byte, 5)
	var bar = make([]int, 10)
	var fee = make([]string, 2)

	fmt.Println(foo, bar, fee)
}

/*
Output:
  [0 0 0 0 0] [0 0 0 0 0 0 0 0 0 0] [ ]
*/
```

Последний параметр - **вместимость** играет важную роль в производительности программы, а также является интересным. По сути он говорит о том сколько памяти нужно выделить заранее под наш массив, чтобы при расширении нам не пришлось искать новый участок памяти.

Например, если мы создадим массив с вместимостью в 10 элементов, наполним его 5-ю элементами, а потом добавим один - адрес массива не изменится:

```go
package main

import "fmt"

func main() {
	var foo = make([]int, 5, 10)
	fmt.Printf("Address of foo array [before append]: %p\n", &foo)

	foo = append(foo, 222)
	fmt.Printf("Address of foo array [after append]: %p\n", &foo)
}

/*
Output:
	Address of foo array [before append]: 0xc0000aa018
	Address of foo array [after append]: 0xc0000aa018
*/
```

> К слову, если мы явно не задали вместимость слайса (то есть использовали конструкцию `make([]int, 5)`), то вместимость будет равна длине массива (в данном случае - 5).

Если же мы укажем вместимость массива меньше, чем его длину, то код и вовсе нескомпилируется:

```go
package main

import "fmt"

func main() {
	var foo = make([]int, 5, 4)
	fmt.Printf("Capacity of the array: ", cap(foo))
}

/*
	./prog.go:6:24: invalid argument: length and capacity swapped
*/
```

### Что будет если мы переполним вместимость?
Если же мы переполним вместимость слайса, то вместимость умножится на 2:

```go
package main

import "fmt"

func main() {
	var foo = make([]int, 10, 10) // Изначальная вместимость - 10
	foo = append(foo, 2) // Добавляем элемент
	fmt.Println("Length of the array:", len(foo))
	fmt.Println("Capacity of the array:", cap(foo))
}

/*
Output:
	Length of the array: 11
	Capacity of the array: 20
*/
```

При этом в памяти произойдет следующее:
1. Go понимает что нам не хватает памяти и посмотрит есть ли после текущего сегмента памяти еще столько же ячеек;
2. Если ячейки есть, он не будет передвигать массив и просто зарезервирует больше памяти;
3. Если ячеек нет, то он скопирует всю информацию из уже использующегося сегмента и найдет вдвое больше свободных ячеек, после нажождения он перенесет туда все данные и отдаст нам адрес сегмента;

## Shorthand-syntax
С короткой версией объявления слайса все проще:

```go
package main

import "fmt"

func main() {
	foo := []int{1, 2, 3}
	fmt.Println("Length of the array:", len(foo))
	fmt.Println("Capacity of the array:", cap(foo))
}

/*
Output:
	Length of the array: 3
	Capacity of the array: 3
*/
```

В примере вверху Go создаст массив (под капотом) с длиной в три ячейки и такой же вместимостью.

## Срезы на слайсах
Срезом на слайсе является дочерний слайс, который **ссылется только на часть слайса**:

```go
package main

import "fmt"

func main() {
	name := []string{"D", "a", "n", "i", "i", "l"}
	firstThreeLetters := name[:3]
	fmt.Println(firstThreeLetters)
}

/*
Output:
	[D a n]
*/
```

> Не смотря на то, что **слайс** и **срез** - понятия взаимозаменяемые (а если быть точнее, то срез - перевод от англ. slice), мы будем называть слайсами все новосозданные слайсы с помощью make() или shorthand-синтаксиса, а срезами будем называть слайсы проделанные над уже существующим массивом.

Мы также можем делать срезы на массивах, таким образом мы можем делать массивы динамически расширяемыми:

```go
package main

import "fmt"

func main() {
	nameArray := [6]string{"D", "a", "n", "i", "i", "l"}
	nameSlice := nameArray[:]
	nameSlice = append(nameSlice, "!")
	fmt.Println(nameSlice)
}

/*
Output:
	[D a n i i l !]
*/
```

# Слайс под капотом
Слайс под капотом является структурой, которая содержит ссылку на исходный массив, длину и вместимость:

```go
struct {
	array *[]T
	length int
	capacity int
}
```

Когда мы создаем новый слайс или срезаем массив, то ссылка массива присвивается полю `array`, с помощью данного указателя слайс сможет обращаться к массиву под капотом. `length` и `capacity` хранят длину и вместимость, соответственно.

[image:C385D672-BD74-4257-A1BC-11F0FB8E7148-23677-000000DED638C699/unknown.png]

Поскольку слайс ссылается на часть массива, мы можем срезать часть массива. Срез не копирует элементы массива, он просто ссылается на них. Таким образом при изменении среза, изменится и массив, с которого мы брали срез:

```go
package main

import "fmt"

func main() {
	nameArray := [6]string{"D", "a", "n", "i", "i", "l"}
	nameSlice := nameArray[:3]
	nameSlice[len(nameSlice) - 1] = "m"
	fmt.Println(nameSlice) // [D a m]
	fmt.Println(nameArray) // [D a m i i l]
}
```

Мы также можем сделать так, чтобы срез занял всю длину исходного массива. Так как слайс хранит вместимость исходного массива - мы можем сделать срез снова и указать параметр `cap(nameArray)`:

```go
package main

import "fmt"

func main() {
	nameArray := [6]string{"D", "a", "n", "i", "i", "l"}
	nameSlice := nameArray[:3]
	nameSlice[len(nameSlice)-1] = "m"
	fmt.Println(nameSlice) // [D a m]

	// Делаем новый срез
	nameSlice = nameSlice[0:cap(nameSlice)]
	fmt.Println(nameSlice) // [D a m i i l]
}
```

> У вас может возникнуть вопрос: почему мы не срезали `cap(nameSlice) - 1`, ибо мы указали в конце несуществующий индекс (на один больше, нежели существует в массиве). Все дело в том, что последний элемент при срезе не включается в срез.
>
> То есть, первый индекс идет включительно в срез, а последний - не включительно.

## Копирование
Как уже можно понять, при срезе с массива или слайса мы не создаем новый слайс. Также, если мы присвоим одной переменной значение слайса другой переменной - они обе будут указывать на один массив:

```go
package main

import (
	"fmt"
)

func main() {
	nameSlice := []string{"D", "a", "n", "i", "i", "l"}
	secondNameSlice := nameSlice
	secondNameSlice[0] = "T"
	fmt.Println(nameSlice, secondNameSlice) // [T a n i i l] [T a n i i l]
}
```

Мы можем избежать такого поведения с помощью копирования. Для того чтобы скопировать слайс (создать независимую копию) - нам достаточно использовать функцию `copy`:

```go
package main

import (
	"fmt"
)

func main() {
	nameSlice := []string{"D", "a", "n", "i", "i", "l"}
	secondNameSlice := make([]string, len(nameSlice), cap(nameSlice))
	copy(secondNameSlice, nameSlice)
	secondNameSlice[0] = "T"

	fmt.Println(nameSlice, secondNameSlice) // [D a n i i l] [T a n i i l]
}
```

# сopy и append под капотом
Мы можем заметить два различия: при использовании функции `append` - мы переприсваивали значение переменной:

```go
foo := []int {}
foo = append(foo, 1)
```

В случае с `copy` мы просто передаем саму переменную (не ссылку, а именно переменную!):

```go
foo := []int {1, 2}
bar := []int {}
copy(bar, foo)
```

Вот как работает копирование под капотом:

```go
func copy(to []T, from []T) {
	for i := range from {
		to[i] = from[i]
	}
}
```

Разработчики Go решили не добавлять часть  с инициализацией нового слайса внутрь `copy`.

В случае с дополнением все немного иначе. Тут разработчики Go посчитали, что функция сама должна решать нужно ли инициализировать новый слайс, или можно дополнить данные в уже существующий слайс:

```go
func append(slice []T, data ...T) []T {
    initialLength := len(slice)
    finalLength := m + len(data)
    if finalLength > cap(slice) { // if necessary, reallocate
        // allocate double what's needed, for future growth.
        newSlice := make([]byte, (n+1)*2)
        copy(newSlice, slice)
        slice = newSlice
    }
    slice = slice[0:finalLength]
    copy(slice[initialLength:finalLength], data)
    return slice
}
```
