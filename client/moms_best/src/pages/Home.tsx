import { useUser } from "@/contexts/UserContext";

const Home = () => {
  const user = useUser();
  return (
    <div className="page">
      <h1>Home</h1>

      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Home;
