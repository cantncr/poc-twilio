export class SendMessageDTO {
  conversationId: string;
  author: string;
  message: string;
}

export class DeleteMessageDTO {
  conversationId: string;
  messageId: string;
}
