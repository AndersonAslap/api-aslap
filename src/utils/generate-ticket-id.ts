import { v4 as uuidv4 } from 'uuid';

export default function generateTicketId() {
  return { ticket: uuidv4() };
}
