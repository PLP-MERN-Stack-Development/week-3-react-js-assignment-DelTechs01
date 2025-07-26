import Card from '../components/Card';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Welcome to Task Manager</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your tasks efficiently with our responsive React application.
          Navigate to the Tasks page to get started!
        </p>
      </Card>
    </div>
  );
};

export default Home;