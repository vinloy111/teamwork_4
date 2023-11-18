import { Forum, Message, Topic } from 'types/Forum'

export const mockListMessagesTheme1: Message[] = [
  {
    id: '1',
    idAuthor: '1',
    message: 'Всем привет! Давайте обсудим темку',
    date: '01.11.2023',
  },
  {
    id: '2',
    idAuthor: '4',
    message: 'Всем привет! ок',
    date: '01.11.2023',
  },
  {
    id: '3',
    idAuthor: '2',
    message: 'Всем привет! ок',
    date: '01.11.2023',
  },
]

export const mockListMessagesTheme2: Message[] = [
  {
    id: '1',
    idAuthor: '5',
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: '01.11.2023',
  },
  {
    id: '2',
    idAuthor: '1',
    message:
      "packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    date: '01.11.2023',
  },
  {
    id: '3',
    idAuthor: '5',
    message:
      'comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular',
    date: '01.11.2023',
  },
  {
    id: '443',
    idAuthor: '1',
    message:
      'comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular',
    date: '01.11.2023',
  },
]

export const mockTopic1: Topic = {
  id: '31',
  idAuthor: '5',
  caption: 'Механика Игры',
  listOfMessages: mockListMessagesTheme1,
  countOfMessage: mockListMessagesTheme1.length,
}

export const mockTopic2: Topic = {
  id: '32',
  idAuthor: '2',
  caption: 'Оффтоп',
  listOfMessages: mockListMessagesTheme1,
  countOfMessage: mockListMessagesTheme1.length,
}

export const mockTopic3: Topic = {
  id: '321',
  idAuthor: '1',
  caption: 'Дизайн Игры',
  listOfMessages: mockListMessagesTheme2,
  countOfMessage: mockListMessagesTheme2.length,
}

export const mockForum: Forum = {
  id: '321',
  idAuthor: '1',
  caption: 'Форум Игры',
  listOfTopics: [mockTopic1, mockTopic2, mockTopic3],
}
