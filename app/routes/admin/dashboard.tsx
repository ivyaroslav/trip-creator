import { Header } from "components"

const Dashboard = () => {
    const user = {name: "Yarik"};
    return(
        <main className="dashboard wrapper">
            <Header 
                title = {`Welcome ${user?.name ?? 'Guest'}`}
                description="Track activity, trends and popular destinations in real time"
            />
            Dasboard Page contents
        </main>
    )
}
export default Dashboard