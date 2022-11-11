export class CreateParticipantDTO {
  conversationId: string;
  identity: string;
}
export class DeleteParticipantDTO {
  conversationId: string;
  id: string;
}

export class GenerateTokenDTO {
  token: string;
}
