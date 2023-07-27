import { messageType } from '../../utils/constants';


export default function MessagePopup({ message, type, isOpen }) {

  let style = 'message';

  if(type === messageType.error){
    style = 'message message_type_error';
  }

  const styleClass = `${style} ${isOpen ? 'message_visible' : ''}`

  return (
    <div className={styleClass}>
      {message}
    </div>
  )
}
