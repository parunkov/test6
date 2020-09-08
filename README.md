## Тестовое задание

Тестовое задание с использованием React/Redux.

## Демо страница

https://parunkov.github.io/test4/

## Команды

Клонирование репозитория по протоколу https:

    git clone https://github.com/parunkov/test4

Клонирование репозитория по протоколу ssh:

    git clone git://github.com/parunkov/test4

Установка проекта:
    
    npm i

Запуск dev server, адрес localhost:3000:

    npm start

Сборка и развертывание проекта:

    npm run deploy

## Используемые библиотеки

react-copy-to-clipboard - копирование в буфер,  
react-full-screen - полноэранное отображение,  
react-json-pretty - форматирование JSON,  
react-redux - провайдер store, connect,  
react-transition-group - анимация сообщения "Скопировано",  
redux-form - поля ввода,  
redux-thunk - обработка запросов,  
reset-css - сброс стилей,  
sendsay-api - коннектор к серверу. 

Использован scss для сокращения кода.

## Компоненты

#### common - общие компоненты и функции:
Button - компонент кнопки,   
FormsControl - оформление полей ввода,  
GitHubLink - ссылка на репозиторий,  
Logo - логотип,  
commonFunctions - общие функции,  
formatTextareaValue - функция форматирования JSON. 

#### Console
Консоль, кнопка полноэкранного режима.

#### Fields
Форма отправки запроса и поле вывода результата.  
FieldsForm - форма отправки запроса,  
setField - функция изменения поля,  
onFieldChange - коллбэк изменения поля,  
useDrag - функция изменения размера полей перетаскиванием,  
FieldsReduxForm - hoc формы,  
Fields - компонент с формой и полем результата,  
FieldsContainer - контейнерный компонент.

#### Header
Заголовок консоли с конпкой выхода и сведениями о пользователе. Информация о пользователя из формы авторизации, а не из ответа «понга».  
HeaderContainer - контейнерный компонент.

#### History
История запросов.  
HistoryItem - элемент истории,    
History - компонент истории,
useResize - отслеживание размерои для изменения открытия дропдауна,  
useHorizontalScroll - скролл колесом мыши,  
HistoryContainer - контейнерный компонент.

#### Login
Страница авторизации.  
LoginForm - форма авторизации,  
LoginReduxForm - hoc формы,  
Login - страница авторизации,  
LoginContainer - контейнерный компонент.

#### redux - редьюсеры:
fields-reducer - редьюсер формы запроса,  
history-reducer - редьюсер истории,  
login-reducer - редьюсер формы авторизации,  
store - хранилище состояния.

#### utils - утилиты:
validators - валидаторы.  