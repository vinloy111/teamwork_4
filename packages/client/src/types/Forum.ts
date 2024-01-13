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
  text: string
  date: string
}

export type Emoji = {
  id: string
  img: string
  description: string
}

export type Reaction = {
  id: string
  userId: string
  topicId: string
  emojiId: string
}

export type ReactionSave = {
  userId: string
  topicId: string
  emojiId: string
}
