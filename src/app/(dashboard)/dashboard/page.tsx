import Header from "@/app/_components/Header";
import DashboardHeader from "./_components/DashboardHeader";
import UserStoryList from "./_components/UserStoryList";

const Dashboard = () => {
    return (
        <div className="p-10 md:px-10 lg:px-40">
            <Header logado={true} />
            <DashboardHeader />

            <UserStoryList />
        </div>
    );
};

export default Dashboard;