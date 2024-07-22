import AppLayout from "./Layouts/AppLayout.jsx";
import ChatBox from "./ChatBox.jsx";
import { useParams } from 'react-router-dom';

const Chat = () => {
    const params = useParams()

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Chat {params.chatId}
                </h2>
            }>
            <br/>
            <ChatBox rootUrl={import.meta.env.VITE_APP_BACKEND_URL_API} chatId={params.chatId}/>
        </AppLayout>
        )
}

export default Chat
