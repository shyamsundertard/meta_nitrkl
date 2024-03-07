import MainNavBar from "components/MainNavBar";
import MainSideBar from "components/MainSideBar";

export default function Home() {

  return (
    <main className="flex flex-col w-full">
        <div className="flex" > 
        <MainNavBar/>
        </div>
        <div className="flex flex-row" >
            <MainSideBar/>
            <h1>Main Page</h1>
        </div>
      </main>
  );
}
