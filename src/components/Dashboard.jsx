import AppLayout from "./Layouts/AppLayout.jsx";
import ChatBox from "./ChatBox.jsx";

const Dashboard = () => (
  <AppLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Dashboard
      </h2>
    }>
        <br/>
      <ChatBox rootUrl={import.meta.env.VITE_APP_BACKEND_URL_API}/>
  </AppLayout>
)

export default Dashboard
