export declare type Forum = {
  id: string
  caption: string
  idAuthor: string
  listOfTopics?: Topic[]
}

export declare type Topic = {
  id: string
  caption: string
  idAuthor: string
  listOfMessages: Message[]
  countOfMessage?: number
}

export declare type Message = {
  id: string
  idAuthor: string
  message: string
  date: string
}
