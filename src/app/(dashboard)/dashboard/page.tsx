import DashboardHeader from "./_components/DashboardHeader";
import UserStoryList from "./_components/UserStoryList";

const Dashboard = () => {
    return (
        <div className="p-10 md:px-10 lg:px-40">
            <DashboardHeader />

            <UserStoryList />
        </div>
    );
};

export default Dashboard;