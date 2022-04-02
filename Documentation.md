# Clear-Canvas Documentation/Документация <02.04.2022>
!Current development branch (Online-demo)!
--------------------------------------------
### ENG
1. function drawAll() - the function of rendering all elements looped with requestAnimationFrame(drawAll)
2. clearCanvas() - Canvas Cleaning Function (entire)
3. background('your color') - Canvas painting function
4. render({} or []) - drawing function of an element (array or object). 
The element must contain an arbitrary draw() function
5. lifeCycle({name} or [name]) - checking for the lifetime of an element
6. crash({one},{two}, result) - the function of calculating collisions between objects and launching the collision result function
7. evade({one},{two}, result) - crash() mirror function
8. camera(Object) - test function of object tracking
--------------------------------------------
### RU
1. function drawAll() - функция отрисовки всех элементов зацикленная с помощью requestAnimationFrame(drawAll)
2. clearCanvas() - Функция очистки Canvas (всего)
3. background('ваш цвет') - функция покраски Canvas
4. render({} или []) - функция отрисовки элемента (массива или обьекта). Элемент должен содержать произвольную функцию  draw()
5. lifeCycle({имя} или [имя]) - проверка на время перед удалением
6. crash({один},{два}, результат) - функция просчёта коллизий между обьектами и запуском функции результата столкновения
7. evade({one},{two}, result) - обратная функция crash()
8. camera(Object) - тестовая функция преследования объекта
--------------------------------------------