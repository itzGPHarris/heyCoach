const findMessageByKeyword = (messages: { id: number; text?: string }[], keyword: string) => {
  const message = messages.find((msg) => msg.text?.toLowerCase().includes(keyword.toLowerCase()));
  return message ? `message-${message.id}` : null;
};

export default { findMessageByKeyword };
